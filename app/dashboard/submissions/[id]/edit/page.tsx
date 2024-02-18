import { notFound, redirect } from "next/navigation";
import { getSubmission, getUserFromRequest } from "@/lib/server";
import EditableSubmission from "./components/EditableSubmission";

export default async function SubmissionPage({ params }: { params: { id: string } }) {
  const user = await getUserFromRequest();
  if (!user) {
    redirect("/api/auth/signin");
  }

  const submission = await getSubmission(params.id);
  if (!submission) {
    notFound();
  }

  const isMine = submission.team.users.map((member) => member.id).some((id) => id == user.id) ?? false;

  return (
    <>
      {!isMine ? (
        <>
          <h1>Access Denied Buddy</h1>
        </>
      ) : (
        <EditableSubmission submission={submission} />
      )}
    </>
  );
}