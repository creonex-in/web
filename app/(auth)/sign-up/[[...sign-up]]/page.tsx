import { SignUp } from "@clerk/nextjs";
import type { Metadata } from "next";
import { authAppearance } from "@/lib/clerk-appearance";

export const metadata: Metadata = {
  title: "Sign Up — Creonex",
};

export default function SignUpPage() {
  return <SignUp signInUrl="/sign-in" appearance={authAppearance} />;
}
