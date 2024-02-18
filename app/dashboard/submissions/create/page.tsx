import { redirect } from "next/navigation";
import { getUserFromRequest } from "../../../../lib/server";
import CreateSubmissionForm from "./Form";

export default async function CreateSubmissionPage() {
  const user = await getUserFromRequest();
  if (!user) {
    redirect("/api/auth/signin");
  }

  if (!user.team) {
    redirect("/dashboard/team/create");
  }

  if (user.team.submission) {
    redirect(`/dashboard/submissions/${user.team.submission.id}`);
  }

  const tracks = [
    {
      name: "GENERAL",
      description:
        "Everyone is automatically registered for the regular track. Do your best to stick to the theme of CENSORED.",
      prizes: ["Sample prize 1", "sample prize 2", "sample prize 3"],
      value: "GENERAL",
    },
    {
      name: "Beginner",
      description: "Your project will be up against other beginners. All groupmates must be beginners.",
      prizes: ["Sample prize"],
      value: "BEGINNER",
    },
  ];

  return (
    <div className="max-w-screen-xl mx-8 flex grow items-center justify-center rounded-lg px-4 py-2">
      <div className="mr-12 flex basis-1/2 flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-center">Create a submission</h1>
        <h2 className="text-neutral-400 text-center">You can edit these details at anytime before and after publishing your submission.</h2>
      </div>
      <div className="mt-2 ml-6 flex basis-1/2 items-start justify-start text-neutral-300">
        <CreateSubmissionForm tracks={tracks} />
      </div>
    </div>
  );
}