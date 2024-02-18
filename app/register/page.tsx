"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/Card";
import NavBar from "../components/NavBar";
import { FormEventHandler, useState } from "react";
import { signIn } from "next-auth/react";
import Spinner from "../components/Spinner";

export default function Register() {
  const [email, setEmail] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!isValid()) {
      return;
    }
    signIn("email", { email: email, callbackUrl: '/dashboard' })
  }

  const isValid = () => email.endsWith("@nycstudents.net");

  return (
    <>
      <NavBar />
      <div className="flex h-[80vh] items-center justify-center border-0">
        <Card className="bg-ocean-400 rounded-2xl rounded-xl border-none">
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>
              After submitting, you will be emailed a login link to continue registration. Please only input your DOE email.
            </CardDescription>
            <CardDescription>
              Why the sign-up process? AtomHacks has an involved sign-up process as part of its custom submission
              system. (and the DOE won't allow for "Sign in with Google")
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <label className="block text-base text-neutral-400" htmlFor="osis">
                DOE Email
              </label>
              <input
                className="mb-8 mt-1 block rounded-md bg-ocean-200 p-2 text-base shadow-lg focus:border-green-600 focus:outline-none focus:ring focus:ring-green-600"
                type="email"
                value={email}
                size={30}
                id="email"
                name="email"
                placeholder="example@nycstudents.net"
                onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
                autoComplete="email"
              />
            <button
              type="submit"
              className={ "inline-flex justify-center rounded-md border border-transparent bg-green-600/80 px-4 py-2 text-sm font-medium text-white transition duration-200 hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-green-600 disabled:opacity-50"
              }
            >Submit
            </button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
