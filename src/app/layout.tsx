import type { Metadata } from "next";
import { Chela_One, Geist, Geist_Mono, Inter } from "next/font/google";
import "./tokens.css";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { UnderConstruction } from "@/components/UnderConstruction";
import { themeInitScript } from "@/lib/theme";

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

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "900"],
  style: ["normal", "italic"],
});

const chelaOne = Chela_One({
  variable: "--font-chela",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Eric Howe — Senior Digital Product Designer",
    template: "%s · Eric Howe",
  },
  description:
    "Lead product designer specializing in enterprise internal tools, design leadership, complex workflows, and design systems. 8 years at Nike.",
  openGraph: {
    title: "Eric Howe — Senior Digital Product Designer",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${chelaOne.variable} min-h-screen bg-bg-weak-50 font-sans text-text-strong-950 antialiased`}
      >
        {underConstruction ? (
          <main>
            <UnderConstruction />
          </main>
        ) : (
          <>
            <PageTransition />
            <Header />
            <main>{children}</main>
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}
