import { notFound } from "next/navigation";
import { getSubmission, getUserFromRequest } from "../../../../lib/server";
import EditMenu from "./components/EditMenu";
import PhotoCarousel from "./components/MediaCarousel";

export default async function SubmissionPage({ params }: { params: { id: string } }) {
  const user = await getUserFromRequest();

  const submission = await getSubmission(params.id);
  if (!submission) {
    notFound();
  }

  const isMine = submission.team.users.map((user) => user.id).some((id) => id == user?.id) ?? false;

  const media: Array<{ src: string; type: string }> = [];

  media.push({ src: submission.videoLink as string, type: "video" });

  submission.media.forEach((image) => {
    media.push({ src: image.url, type: "image" });
  });

  return (
    <>
      <div className="flex items-center justify-center bg-ocean-200">
        <PhotoCarousel media={media} />
      </div>
      <div className="mx-auto max-w-screen-md">
        <div className="flex justify-between items-center">
          <h1 className="my-4 text-6xl font-bold text-cyan-300">{submission.name}</h1>
          {isMine && <EditMenu />}
        </div>
        <p className="my-4 whitespace-pre-line text-xl">{submission.description}</p>
      </div>
    </>
  );
}