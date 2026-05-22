// BFF proxy — all client-side fetches land here via /api/* catch-all.
// Purpose: client JS cannot call auth(), so this route runs auth() on the server,
// attaches the Bearer token, and forwards the request to the real backend.
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

type Context = { params: Promise<{ proxy: string[] }> };

// Only these methods carry a request body per HTTP spec.
const BODY_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

async function handler(req: NextRequest, { params }: Context): Promise<NextResponse> {
  const apiUrl = process.env.API_URL;
  if (!apiUrl) {
    return NextResponse.json({ message: "Server misconfigured" }, { status: 500 });
  }

  const { getToken } = await auth();
  const token = await getToken();
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { proxy: segments } = await params;
  const upstream = `${apiUrl}/${segments.join("/")}${req.nextUrl.search}`;

  const headers = new Headers({ Authorization: `Bearer ${token}` });
  const contentType = req.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);

  // .catch(() => null) distinguishes a network failure from an HTTP error response.
  const res = await fetch(upstream, {
    method: req.method,
    headers,
    body: BODY_METHODS.has(req.method) ? await req.arrayBuffer() : undefined,
  }).catch(() => null);

  if (!res) return NextResponse.json({ message: "Backend unreachable" }, { status: 502 });
  if (res.status === 204) return new NextResponse(null, { status: 204 });

  const responseHeaders = new Headers();
  const resContentType = res.headers.get("content-type");
  if (resContentType) responseHeaders.set("content-type", resContentType);

  // Stream the response body — avoids buffering the entire payload in memory.
  return new NextResponse(res.body, { status: res.status, headers: responseHeaders });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
