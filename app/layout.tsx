// Contains metadata and a wrapper for Auth.js providers

import type { Metadata } from "next";
import React from "react";
import { Lexend_Deca } from "next/font/google";
import "./globals.css";

const font = Lexend_Deca({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "AtomHacks X",
  description: "Bronx Science's 10th Annual Hackathon",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <body className={font.className}>
        {children}
      </body>
    </html>
  );
}
