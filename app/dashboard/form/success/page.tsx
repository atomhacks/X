import { CheckIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Success() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white">
          <CheckIcon className="h-12 w-12 text-dark" />
        </div>
        <h1 className="text-3xl font-bold">Success!</h1>
        <p className="text-center text-xl">You are now registered for AtomHacks X.</p>
        <p className="text-center text-xl">Look out for any emails and see you on March 2nd!</p>
        <Link href="/dashboard" className="text-green-500 underline decoration-2 underline-offset-4">
          Dashboard
        </Link>
      </div>
    </div>
  );
}
