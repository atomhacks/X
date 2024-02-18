"use client";

import { signOut } from "next-auth/react";
import React from "react";

export default function SignOutButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button onClick={() => signOut({ callbackUrl: "/" })} {...props}>
      <p
        className={`mx-2 text-xl underline decoration-white decoration-[3px] underline-offset-[6px] transition-colors hover:decoration-red-400`}
      >
        Sign Out
      </p>
    </button>
  );
}
