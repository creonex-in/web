import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In — Creonex",
};

export default function SignInPage() {
  return <SignIn signUpUrl="/sign-up" />;
}
