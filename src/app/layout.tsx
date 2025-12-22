import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {ReactNode} from "react";
import {Header} from "@/components/layout/Header";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Volt Shop — Online Electronics Store",
  description: "Volt Shop is an online electronics store offering smartphones, gadgets, and accessories. Fast shipping, great prices, and trusted reviews.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-background text-foreground flex flex-col" suppressHydrationWarning>
        <Header/>
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
