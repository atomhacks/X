import "server-only";
import { getServerSession } from "next-auth";
import { authOptions, getUser } from "@/lib/server";
import { CheckCircleIcon, ExclamationCircleIcon, LinkIcon } from "@heroicons/react/24/outline";
import { redirect } from "next/navigation";
import OAuthButton from "../components/buttons/OAuthButton";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/register");
  }
  const user = await getUser(session.user.id);
  if (!user) {
    redirect("/register");
  }

  if (!user.formInfo) {
    console.log("User has not completed form, redirecting.");
    redirect("/dashboard/form");
  }

  console.log(session.user);
  console.log(user.formInfo);
  return (
    <>
      <div className="mb-8 flex items-center justify-center">
        <span className="font-morro border-b-4 border-green-500 py-6 text-7xl md:text-5xl">DASHBOARD</span>
      </div>
      <h1 className="p-4 text-center text-xl md:text-base">
        {user.role === "ADMIN"
          ? "Welcome, admin! You can access all projects (even private) and edit them."
          : "Please use the top bar to create a team and submission."}
      </h1>
      <div className="flex flex-col items-center justify-around gap-4">
        <div
          className={`flex w-2/5 flex-row items-center rounded-lg border-2 bg-transparent p-4 md:w-4/5 ${
            user.teamId == null ? "border-red-500" : "border-green-500"
          }`}
        >
          {" "}
          <div className="h-10 w-10 object-contain md:h-5 md:w-5">
            {" "}
            <LinkIcon />
          </div>
          <h1 className="mx-4 grow text-left text-2xl md:text-sm">Create a Team</h1>
          <div className="h-10 w-10 object-contain md:h-5 md:w-5">
            {" "}
            {user.teamId == null ? <ExclamationCircleIcon /> : <CheckCircleIcon />}
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-col items-center justify-around gap-4">
        <div
          className={`flex w-2/5 flex-row items-center rounded-lg border-2 bg-transparent p-4 md:w-4/5 ${
            !user.team?.submission ? "border-red-500" : "border-green-500"
          }`}
        >
          {" "}
          <div className="h-10 w-10 object-contain md:h-5 md:w-5">
            {" "}
            <LinkIcon />
          </div>
          <h1 className="mx-4 grow text-left text-2xl md:text-sm">Create a Submission</h1>
          <div className="h-10 w-10 object-contain md:h-5 md:w-5">
            {" "}
            {!user.team?.submission ? <ExclamationCircleIcon /> : <CheckCircleIcon />}
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-col items-center justify-around gap-4">
        <div
          className={`flex w-2/5 flex-row items-center rounded-lg border-2 bg-transparent p-4 md:w-4/5 ${
            !user.team?.submission?.public ? "border-red-500" : "border-green-500"
          }`}
        >
          {" "}
          <div className="h-10 w-10 object-contain md:h-5 md:w-5">
            {" "}
            <LinkIcon />
          </div>
          <h1 className="mx-4 grow text-left text-2xl md:text-sm">Mark your Project as Ready for Submission</h1>
          <div className="h-10 w-10 object-contain md:h-5 md:w-5">
            {" "}
            {!user.team?.submission?.public ? <ExclamationCircleIcon /> : <CheckCircleIcon />}
          </div>
        </div>
      </div>
    </>
  );
}
