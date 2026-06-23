import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";
import JsonLd from "./json-ld";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Samay Raina | India's Got Latent — Season 2",
  description:
    "Register to attend the live taping of India's Got Latent Season 2, or apply as a participant. Early access to the pre-sale list.",
  openGraph: {
    title: "Samay Raina | India's Got Latent — Season 2",
    description:
      "Apply to perform, or register for the live audience. India's Got Latent Season 2.",
    siteName: "India's Got Latent",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samay Raina | India's Got Latent — Season 2",
    description:
      "Apply to perform, or register for the live audience. India's Got Latent Season 2.",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#050505] text-[#f5f5f7] grain-overlay">
        <JsonLd />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
