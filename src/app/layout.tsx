/**
 * @file: layout.tsx
 * @description: Main layout component for the application
 * 
 * @dependencies:
 * - next/font: For font optimization
 * 
 * @inputs: Children components
 * @outputs: Layout UI with header and footer
 * 
 * @side_effects: None
 */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LocalStores - Find Stores Near You",
  description: "Discover local stores and products in your neighborhood",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
} 