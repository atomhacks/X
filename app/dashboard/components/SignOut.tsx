"use client";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button onClick={() => signOut({ callbackUrl: "/" })}>
      <p
        className={`mx-2 text-xl underline decoration-white decoration-[3px] underline-offset-[6px] transition-colors hover:decoration-red-400`}
      >
        Sign Out
      </p>
    </button>
  );
}
