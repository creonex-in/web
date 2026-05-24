import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@/providers/clerk-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { QueryProvider } from "@/providers/QueryProvider";

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
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased">
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            // defaultTheme="light"
            // enableSystem
            disableTransitionOnChange
          >
            <QueryProvider>{children}</QueryProvider>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
