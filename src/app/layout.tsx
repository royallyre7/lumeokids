import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

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
      <body className={`${nunito.className} min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
