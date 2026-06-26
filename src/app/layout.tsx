import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LumeoKids — AI-Powered Learning for Children",
  description:
    "An AI-powered learning and development platform that helps parents track growth, personalize learning paths, and support child development.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
