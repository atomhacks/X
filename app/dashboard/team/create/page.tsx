import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/server";
import CreateTeamForm from "./Form";

export default async function CreateTeamPage() {
  const user = await getUserFromRequest();
  if (!user) {
    redirect("/api/auth/signin");
  }

  if (user.team) {
    redirect("/dashboard")
  }

  const users = await prisma.user.findMany({
    where: {
      NOT: [
        {
          id: {
            equals: user.id,
          },
        },
        {
          formInfo: null,
        }
      ],
      team: null,
    },
  });

  return (
    <div className="max-w-screen-lg mx-auto mt-2 flex p-4 pt-4">
      <div className="w-full space-y-6">
        <h1 className="text-6xl font-bold text-white">Create a Team</h1>
        <div className="w-11/12">
          <CreateTeamForm users={users} />
        </div>
      </div>
    </div>
  );
}