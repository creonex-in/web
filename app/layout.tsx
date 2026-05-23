import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Creonex — Learn from India's Best Creators",
  description: "Discover courses and book 1-on-1 mentorship sessions with verified experts across design, tech, marketing, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <ClerkProvider>
          <QueryProvider>
            {children}
          </QueryProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
