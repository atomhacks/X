"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "../components/Navbar";
import { FormEventHandler, useState } from "react";
import SubmitButton from "../dashboard/components/SubmitButton";
import { signIn } from "next-auth/react";

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
      <Navbar />
      <div className="flex h-[80vh] items-center justify-center border-0">
        <Card className="bg-ocean-400 rounded-2xl rounded-xl border-none">
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>
              After submitting, you will be emailed a login link to continue registration. Please only input your DOE email.
            </CardDescription>
            <CardDescription>
              Why the sign-up process? AtomHacks has an involved sign-up process as part of its custom submission
              system.
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
              <SubmitButton type="submit" disabled={!isValid()}>
                <p>Submit</p>
              </SubmitButton>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
