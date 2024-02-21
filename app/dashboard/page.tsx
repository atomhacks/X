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
    console.log("User has not completed form, redirecting.")
    redirect("/dashboard/form");
  }

  console.log(session.user)
  console.log(user.formInfo);
  return (
    <>
      <div className="flex items-center justify-center mb-8">
        <span className="py-6 border-b-4 border-green-500 font-morro text-7xl md:text-5xl">DASHBOARD</span>
      </div>
      <h1 className="p-4 text-xl text-center md:text-base">
        Please use the top bar to create a team and submission.
      </h1>
      <div className="flex flex-col items-center justify-around gap-4">
        <OAuthButton
          provider="discord"
          callbackUrl="/dashboard"
          className={`flex w-2/5 flex-row items-center rounded-lg border-2 bg-transparent p-4 md:w-4/5 ${!user.accounts.find((account) => account.provider === "discord") ? "border-red-500" : "border-green-500"
            }`}
        >
          {" "}
          <div className="object-contain w-10 h-10 md:h-5 md:w-5">
            {" "}
            <LinkIcon />
          </div>
          <h1 className="mx-4 text-2xl text-left grow md:text-sm">Link Discord account</h1>
          <div className="object-contain w-10 h-10 md:h-5 md:w-5">
            {" "}
            {!user.accounts.find((account) => account.provider === "discord") ? (
              <ExclamationCircleIcon />
            ) : (
              <CheckCircleIcon />
            )}
          </div>
        </OAuthButton>
      </div>
    </>
  );
}
