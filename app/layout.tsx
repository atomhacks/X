import type { Metadata } from "next";
import React, { PropsWithChildren } from "react";
import { Lexend } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Session } from "next-auth";
import { Providers } from "./components/Providers";

const lexend = Lexend({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "AtomHacks X",
  description: "Bronx Science's 10th Annual Hackathon",
};

type Props = {
  session: Session;
};

const RootLayout: React.FC<PropsWithChildren<Props>> = ({ children, session }) => {
  return (
    <html lang="en">
      {/* Puting the Navbar here allows it to be replicated across all pages, including
      the main page and the gallery page. Think of this as a template for all pages.*/}
      <body className={lexend.className}>
        <Navbar />
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
