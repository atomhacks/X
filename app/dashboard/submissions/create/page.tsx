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
      name: "Regular",
      description: "Everyone is automatically registered for the regular track. Do your best to stick to the theme.",
      prizes: ["Meta Quest", "Polaroid Instant Camera", "Anker Power Bank"],
      value: "GENERAL",
    },
    {
      name: "Beginner",
      description: "Your project will be up against other beginners. All members must be beginners to qualify.",
      prizes: ["LED Sunset Lamp"],
      value: "BEGINNER",
    },
  ];

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-screen mx-8 my-8 flex items-center justify-around">
        <div className="mr-12 flex basis-1/2 flex-col items-center justify-center">
          <h1 className="text-center text-4xl font-bold">Create a submission</h1>
          <h2 className="text-center text-neutral-400">
            You can edit these details at anytime before and after publishing your submission.
          </h2>
        </div>
        <div className="flex items-start justify-start text-neutral-300">
          <CreateSubmissionForm tracks={tracks} />
        </div>
      </div>
    </div>
  );
}
