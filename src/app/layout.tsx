import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { UnderConstruction } from "@/components/UnderConstruction";

// Set to "true" for Vercel Production only; previews and local dev show the full site.
const underConstruction = process.env.UNDER_CONSTRUCTION === "true";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Eric Howe — Lead Product Designer",
    template: "%s · Eric Howe",
  },
  description:
    "Lead product designer specializing in enterprise internal tools, design leadership, complex workflows, and design systems. 8 years at Nike.",
  openGraph: {
    title: "Eric Howe — Lead Product Designer",
    description:
      "Design leadership · enterprise & internal tools · workflow design · design systems",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-surface font-sans text-ink antialiased`}
      >
        {underConstruction ? (
          <main>
            <UnderConstruction />
          </main>
        ) : (
          <>
            <Header />
            <main>{children}</main>
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}
