import { redirect } from "next/navigation";
import NavBar from "../components/nav/NavBar";
import Panel from "../components/Panel";
import { authOptions } from "@/lib/server";
import { getServerSession } from "next-auth";

export default async function Register() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <>
      <NavBar />
      <Panel />
    </>
  );
}
