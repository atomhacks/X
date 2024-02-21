"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/Card";
import { FormEventHandler, useState } from "react";
import { signIn } from "next-auth/react";
import SubmitButton from "./buttons/SubmitButton";

export default function Panel() {
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
      <div className="flex h-[80vh] items-center justify-center border-0">
        <Card className="bg-ocean-400 rounded-2xl border-none">
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>
              Input your NYCDOE email to register for AtomHacks.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <label className="block text-base text-neutral-400" htmlFor="osis">
                NYCDOE Email
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
