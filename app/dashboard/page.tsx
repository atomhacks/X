import { getServerSession } from "next-auth";
import { authOptions, getUser } from "@/lib/server";
import { CheckCircleIcon, ExclamationCircleIcon, LinkIcon } from "@heroicons/react/24/outline";
import { redirect } from "next/navigation";

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
    console.log("yeas");
    redirect("/dashboard/form");
  }
  return (
    <>
      <div className="mb-8 flex items-center justify-center">
        <span className="py-6 text-7xl underline decoration-green-500 underline-offset-8 md:text-5xl">DASHBOARD</span>
      </div>
      <h1 className="p-4 text-center text-xl">To-Do</h1>
      <div className="flex flex-col items-center justify-around gap-4">
        <div className="flex w-2/5 flex-row items-center rounded-lg border-2 border-green-500 bg-transparent p-4 md:w-4/5">
          <div className="h-10 w-10 object-contain md:h-5 md:w-5">
            {" "}
            <LinkIcon />
          </div>
          <h1 className="mx-4 grow text-left text-2xl md:text-sm">Complete Registration</h1>
          <div className="h-10 w-10 object-contain md:h-5 md:w-5">
            <CheckCircleIcon />
          </div>
        </div>
        <div
          className="flex w-2/5 flex-row items-center rounded-lg border-2 bg-transparent p-4 md:w-4/5 border-red-500"
        >
          {" "}
          <div className="h-10 w-10 object-contain md:h-5 md:w-5">
            {" "}
            <LinkIcon />
          </div>
          <h1 className="mx-4 grow text-left text-2xl md:text-sm">Link Discord account</h1>
          <div className="h-10 w-10 object-contain md:h-5 md:w-5">
              <ExclamationCircleIcon />
          </div>
        </div>
      </div>
    </>
  );
}
