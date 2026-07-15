import type { Metadata } from "next";
import { Baloo_2, Comic_Neue } from "next/font/google";
import "./globals.css";

const baloo2 = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-baloo2",
});

const comicNeue = Comic_Neue({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
  variable: "--font-comic-neue",
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
      <body className={`${baloo2.className} ${comicNeue.variable} min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
