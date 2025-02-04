import React from "react";
import Spinner from "../Spinner";

export default function SubmitButton({
  loading,
  className,
  children,
  // onClick, - ...props should handle this
  ...props
}: { loading?: boolean; children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="submit"
      className={
        className
          ? className
          : "inline-flex justify-center rounded-md border border-transparent bg-green-600/80 px-4 py-2 text-sm font-medium text-white transition duration-200 hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-green-600 disabled:opacity-50"
      }
      {...props}
    >
      {loading === true && (
        <span>
          <Spinner />
        </span>
      )}
      {children}
    </button>
  );
}
