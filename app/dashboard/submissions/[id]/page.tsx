import { notFound } from "next/navigation";
import { getSubmission, getUserFromRequest } from "../../../../lib/server";
import EditMenu from "./components/EditMenu";
import PhotoCarousel from "./components/MediaCarousel";

function getYouTubeId(url: string) {
  var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  var match = url.match(regExp);

  if (match && match[2].length == 11) {
    return match[2];
  } else {
    return "error";
  }
}

export default async function SubmissionPage({ params }: { params: { id: string } }) {
  const user = await getUserFromRequest();

  const submission = await getSubmission(params.id);
  if (!submission) {
    notFound();
  }

  let url = submission.srcLink;

  if (!(submission.srcLink.startsWith("https") && submission.srcLink.startsWith("http"))) {
    url = "https://" + url;
  }

  const isMine =
    (submission.team.users.map((user) => user.id).some((id) => id == user?.id) ?? false) || user?.role === "ADMIN";

  const media: Array<{ src: string; type: string }> = [];

  if (submission.srcLink !== "") {
    media.push({
      src: ("https://www.youtube.com/embed/" + getYouTubeId(submission.videoLink)) as string,
      type: "video",
    });
  }

  submission.media.forEach((image) => {
    media.push({ src: image.url, type: "image" });
  });

  return (
    <div className="flex h-full flex-col overflow-auto">
      <div className="mx-auto flex flex-col justify-center">
        <div className="flex flex-row justify-center">
          <PhotoCarousel media={media} />
          <div className="flex justify-center">
            <div className="ml-4 mr-3 flex w-80 max-w-screen-md flex-col px-6 py-4">
              <div className="mb-auto">
                <h1 className="my-2 text-5xl font-extrabold text-white">{submission.name}</h1>
                <h1 className="text-base">By {submission.team.name}</h1>
              </div>
              <div className="mt-auto">
                <div
                  className={`flex h-16 w-full items-center justify-center rounded-lg align-bottom ${submission.srcLink ? `bg-green-600` : `bg-red-500`}`}
                >
                  <a href={url}>
                    <p className="whitespace-pre-line text-base font-normal">Launch</p>
                  </a>
                </div>
              </div>
            </div>
            {isMine && <EditMenu />}
          </div>
        </div>
        <div className="my-4 max-w-[1052px] flex-col overflow-auto">
          <h1 className="my-2 text-xl font-bold">Description</h1>
          <p className="whitespace-pre-line text-base font-normal">{submission.description}</p>
          <h1 className="my-2 text-lg font-bold">Libraries Used:</h1>
          <p className="whitespace-pre-line text-base font-normal">{submission.librariesUsed}</p>
        </div>
      </div>
    </div>
  );
}
