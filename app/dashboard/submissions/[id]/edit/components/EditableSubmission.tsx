"use client";

import { ArrowLongLeftIcon, ArrowLongRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, FormEventHandler, useRef, useState } from "react";
import SubmitButton from "../../../../../components/buttons/SubmitButton";
import { upload } from "@vercel/blob/client";
import { Switch } from "@headlessui/react";
import FeedbackBanner from "@/app/components/FeedbackBanner";

export const revalidate = 0;

type Props = {
  submission: Prisma.SubmissionGetPayload<{
    include: {
      team: {
        include: {
          users: true;
        };
      };
      media: true;
    };
  }>;
};

function getYouTubeId(url: string) {
  var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  var match = url.match(regExp);

  if (match && match[2].length == 11) {
    return match[2];
  } else {
    return "error";
  }
}

export default function EditableSubmission({ submission }: Props) {
  const router = useRouter();
  const [name, setName] = useState(submission.name);
  const [description, setDescription] = useState(submission.description);
  const [srcLink, setSrcLink] = useState<string>(submission.srcLink as string);
  const [librariesUsed, setLibrariesUsed] = useState<string>(submission.librariesUsed);
  const [videoLink, setVideoLink] = useState<string>(submission.videoLink as string);
  const [submitting, setSubmitting] = useState(false);
  const [currentImage, _setCurrentImage] = useState(0);
  const [newIcon, setNewIcon] = useState<File>();
  const [selectedIcon, setSelectedIcon] = useState<string>(submission.icon);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>(submission.media.map((sub) => sub.url));
  // public is reserved keyword
  const [submitted, setSubmitted] = useState(submission.submitted);
  const [error, setError] = useState(false);
  const inputFileElement = useRef<null | HTMLInputElement>(null);

  const isValid = () => name != "" && description != "";

  const setCurrentImage = (i: number) => {
    if (selectedImages.length <= 0) return;
    if (i < 0) {
      i = selectedImages.length + i;
    }
    _setCurrentImage(i % selectedImages.length);
  };

  const onSelectImages: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(e.target.files!);
    setNewImages(Array.from(e.target.files!));
    setSelectedImages(Array.from(e.target.files!).map((file) => URL.createObjectURL(file)));
  };

  const onSelectIcon: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    console.log(e.target.files![0]);
    setNewIcon(e.target.files![0]);
    console.log(URL.createObjectURL(e.target.files![0]));
    setSelectedIcon(URL.createObjectURL(e.target.files![0]));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!isValid()) return;
    setSubmitting(true);
    setError(false);
    console.log(selectedImages);
    console.log(selectedIcon);
    console.log(submitted);

    let body: any = {
      name,
      description,
      srcLink,
      librariesUsed,
      videoLink,
      submitted,
      public: submitted,
    };

    try {
      if (newImages.length > 0) {
        const blobs = await Promise.all(
          newImages.map(
            async (file) =>
              (
                await upload(`Submissions/${submission.id}/${file.name}`, file, {
                  access: "public",
                  handleUploadUrl: "/api/submission/image/upload",
                })
              ).url,
          ),
        );
        console.log(blobs);
        body = {
          ...body,
          media: blobs,
        };
      }

      if (newIcon) {
        const blob = await upload(`Submissions/${submission.id}/${newIcon.name}`, newIcon, {
          access: "public",
          handleUploadUrl: "/api/submission/image/upload",
        });
        console.log(blob.url);
        body = {
          ...body,
          icon: blob.url,
        };
      }
    } catch (e) {
      console.log("error when uploading images,", e);
    }

    console.log(body);

    const res = await fetch("/api/submission/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (res.status == 201) {
      setSubmitting(false);
      setCurrentImage(0);
      setNewImages([]);
      setNewIcon(undefined);
      router.push(`/dashboard/submissions/${submission.id}`);
      return router.refresh();
    } else {
      setSubmitting(false);
      setError(true);
    }
  };

  return (
    <>
      <div className="flex w-full items-center justify-center bg-ocean-100 p-8">
        <button>
          <ArrowLongLeftIcon className="mr-8 h-8 w-8 text-white" onClick={() => setCurrentImage(currentImage - 1)} />
        </button>
        <div className="relative flex aspect-video w-2/6 items-center justify-center rounded-xl bg-neutral-900">
          <>
            <div className="absolute z-10 flex flex-col items-center justify-center space-y-2">
              <button
                className="rounded-2xl bg-ocean-500 px-4 py-2 transition duration-200 hover:bg-neutral-600"
                onClick={() => inputFileElement.current!.click()}
              >
                Add Images
              </button>
            </div>
            <>
              {selectedImages && selectedImages[currentImage] && (
                <Image className="rounded-xl object-cover" src={selectedImages[currentImage]} fill alt="image"></Image>
              )}
            </>
          </>
        </div>
        <button>
          <ArrowLongRightIcon className="ml-8 h-8 w-8 text-white" onClick={() => setCurrentImage(currentImage + 1)} />
        </button>
      </div>
      <div className="mx-auto max-w-screen-md p-4">
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
            ref={inputFileElement}
            multiple
            autoComplete="off"
            onChange={onSelectImages}
          ></input>
          <label className="block text-base text-neutral-400" htmlFor="name">
            Name* (A unique and innovative name can make the difference.)
          </label>
          <input
            className="mb-4 block w-full rounded-md bg-ocean-500 p-2 text-5xl font-bold shadow-lg focus:border-teal-600 focus:outline-none focus:ring focus:ring-green-500"
            type="text"
            id="name"
            name="name"
            autoComplete="off"
            value={name}
            onInput={(e) => setName((e.target as HTMLInputElement).value)}
          />
          <label className="block text-base text-neutral-400" htmlFor="description">
            Description* (Describe your project to everyone.)
          </label>
          <textarea
            className="text-m mb-4 mt-1 block w-full rounded-lg bg-ocean-500 p-2 shadow-lg focus:border-teal-600 focus:outline-none focus:ring focus:ring-green-500"
            id="description"
            name="description"
            rows={10}
            cols={55}
            value={description}
            autoComplete="off"
            onInput={(e) => setDescription((e.target as HTMLInputElement).value)}
          />
          <label className="block text-base text-neutral-400" htmlFor="image">
            Icon (The preview image shown in the Submission Gallery. For best results, the image should be a square.)
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/png, image/jpeg, image/webp"
            onChange={onSelectIcon}
          ></input>
          <label className="mt-4 block text-base text-neutral-400" htmlFor="name">
            Project Link (A link to your project: Replit deployment, Scratch game, etc.)
          </label>
          <input
            className="mb-4 block w-full rounded-md bg-ocean-500 p-2 text-lg shadow-lg focus:border-teal-600 focus:outline-none focus:ring focus:ring-green-500"
            type="text"
            id="src"
            name="src"
            autoComplete="off"
            value={srcLink}
            onInput={(e) => setSrcLink((e.target as HTMLInputElement).value)}
          />
          <label className="mt-4 block text-base text-neutral-400" htmlFor="name">
            Libraries/APIs/Resources Used (Ex: W3Schools, Discord.py, React, OpenAI API, ChatGPT)
          </label>
          <input
            className="mb-4 block w-full rounded-md bg-ocean-500 p-2 text-lg shadow-lg focus:border-teal-600 focus:outline-none focus:ring focus:ring-green-500"
            type="text"
            id="src"
            name="src"
            autoComplete="off"
            value={librariesUsed}
            onInput={(e) => setLibrariesUsed((e.target as HTMLInputElement).value)}
          />
          <label className="block text-base text-neutral-400" htmlFor="name">
            Video Link (Must be a YouTube video.)
          </label>
          <input
            className="mb-6 block w-full rounded-md bg-ocean-500 p-2 text-lg shadow-lg focus:border-teal-600 focus:outline-none focus:ring focus:ring-green-500"
            type="text"
            id="vid"
            name="vid"
            autoComplete="off"
            value={videoLink}
            onInput={(e) => setVideoLink((e.target as HTMLInputElement).value)}
          />
          {videoLink != "" && videoLink != null ? (
            <iframe
              className="aspect-video w-full rounded-md"
              src={"https://www.youtube.com/embed/" + getYouTubeId(videoLink)}
              width="100%"
            />
          ) : null}
          <Switch.Group>
            <Switch.Label className="mb-1 mt-8 block text-base text-cyan-500">Ready for Submission </Switch.Label>
            <Switch.Description className="mb-2 mt-2 text-base text-neutral-400">
              <span className="mb-2 text-base text-neutral-300 underline decoration-cyan-600 decoration-2 underline-offset-2">
                (THIS OPTION MUST BE CHECKED IN ORDER FOR YOUR PROJECT TO BE JUDGED AND QUALIFY FOR A PRIZE)
              </span>{" "}
              By checking this, you understand that you will showcase your project with a live demo in order to qualify
              for a prize.
            </Switch.Description>
            <Switch
              checked={submitted}
              onChange={setSubmitted}
              className={`${submitted ? "bg-green-500" : "bg-ocean-500"}
          relative inline-flex h-[28.5px] w-[55.5px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={`${submitted ? "translate-x-7" : "translate-x-0"}
            pointer-events-none inline-block h-[26px] w-[26px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
          </Switch.Group>
          <div className="block">{error && <FeedbackBanner bgColor="bg-rose-900" icon={<XMarkIcon />} />}</div>
          <div className="mt-4 py-2">
            <SubmitButton loading={submitting} disabled={submitting || (isValid() ? false : true)}>
              Update
            </SubmitButton>
          </div>
        </form>
      </div>
    </>
  );
}
