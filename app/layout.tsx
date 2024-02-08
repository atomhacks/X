import type { Metadata } from "next";
import React from "react";
import { Lexend_Deca } from "next/font/google";
import "./globals.css";
import { Providers } from "./components/Providers";

const font = Lexend_Deca({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "AtomHacks X",
  description: "Bronx Science's 10th Annual Hackathon",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* Puting the Navbar here allows it to be replicated across all pages, including
      the main page and the gallery page. Think of this as a template for all pages.*/}
      <body className={font.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
