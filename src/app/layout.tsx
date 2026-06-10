import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ClientEffects } from "@/components/client-effects";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NOVA ESTATES — The Future of Luxury Living",
  description:
    "Discover extraordinary properties crafted for exceptional lifestyles. Dubai's premier luxury real estate experience, curating the world's most remarkable homes for the world's most discerning clients.",
  keywords: [
    "luxury real estate",
    "Dubai properties",
    "luxury homes",
    "penthouses",
    "villas",
    "NOVA ESTATES",
    "Dubai real estate",
    "investment",
  ],
  openGraph: {
    title: "NOVA ESTATES — The Future of Luxury Living",
    description:
      "Discover extraordinary properties crafted for exceptional lifestyles.",
    type: "website",
    locale: "en_US",
    siteName: "NOVA ESTATES",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(playfair.variable, inter.variable)}
    >
      <body className="min-h-screen bg-bg text-text font-body antialiased">
        <ClientEffects />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
