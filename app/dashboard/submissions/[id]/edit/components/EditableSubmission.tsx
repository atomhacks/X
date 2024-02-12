"use client";

import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, FormEventHandler, useRef, useState } from "react";
import SubmitButton from "../../../../components/SubmitButton";
import { upload } from "@vercel/blob/client";

export const revalidate = 0;

type Props = {
  submission: Prisma.SubmissionGetPayload<{
    include: {
      team: {
        include: {
          users: true;
        };
      };
      media: true,
    };
  }>;
};

export default function EditableSubmission({ submission }: Props) {
  const router = useRouter();
  const [name, setName] = useState(submission.name);
  const [description, setDescription] = useState(submission.description);
  const [srcLink, setSrcLink] = useState<string>(submission.srcLink as string);
  const [videoLink, setVideoLink] = useState<string>(submission.videoLink as string);
  const [submitting, setSubmitting] = useState(false);
  const [currentImage, _setCurrentImage] = useState(0);
  const [newIcon, setNewIcon] = useState<File>();
  const [selectedIcon, setSelectedIcon] = useState<string>(submission.icon);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>(submission.media.map((sub) => sub.url));
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
    console.log(selectedImages);
    console.log(selectedIcon);

    let body: any = {
      name,
      description,
      srcLink,
      videoLink,
    };

    try {
      if (newImages.length > 0) {
        const blobs = await Promise.all(newImages.map(async (file) => (await upload(`Submissions/${submission.id}/${file.name}`, file, {
          access: "public",
          handleUploadUrl: "/api/submission/image/upload"
        })).url));
        console.log(blobs);
        body = {
          ...body,
          media: blobs,
        }
      }

      if (newIcon) {
        const blob = await upload(`Submissions/${submission.id}/${newIcon.name}`, newIcon, {
          access: "public",
          handleUploadUrl: "/api/submission/image/upload"
        })
        console.log(blob.url);
        body = {
          ...body,
          icon: blob.url,
        }
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
    }
  };

  return (
    <>
      <div className="flex h-96 w-full items-center justify-center bg-ocean-200 py-8 sm:h-80">
        <button>
          <ArrowLongLeftIcon className="mr-8 h-8 w-8 text-white" onClick={() => setCurrentImage(currentImage - 1)} />
        </button>
        <div className="relative flex h-full w-2/6 min-w-[600px] flex-col items-center justify-center rounded-xl bg-neutral-900">
          <>
            <div className="absolute z-10 flex flex-col items-center justify-center space-y-2">
              <button
                className="rounded-2xl bg-ocean-500 px-4 py-2 transition duration-200 hover:bg-neutral-600"
                onClick={() => inputFileElement.current!.click()}
              >
                Replace Images
              </button>
            </div>
            <>
              {selectedImages && selectedImages[currentImage] && (
                <Image
                  className="absolute rounded-xl object-cover"
                  src={selectedImages[currentImage]}
                  fill
                  alt="image"
                ></Image>
              )}
            </>
          </>
        </div>
        <button>
          <ArrowLongRightIcon className="ml-8 h-8 w-8 text-white" onClick={() => setCurrentImage(currentImage + 1)} />
        </button>
      </div>
      <div className="max-w-screen-md mx-auto p-4">
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
            Name *
          </label>
          <input
            className="mb-4 block w-full rounded-md bg-ocean-500 p-2 text-5xl font-bold shadow-lg focus:border-teal-600 focus:outline-none focus:ring focus:ring-teal-500"
            type="text"
            id="name"
            name="name"
            autoComplete="off"
            value={name}
            onInput={(e) => setName((e.target as HTMLInputElement).value)}
          />
          <label className="block text-base text-neutral-400" htmlFor="description">
            Description *
          </label>
          <textarea
            className="text-m mt-1 mb-4 block w-full rounded-lg bg-ocean-500 p-2 shadow-lg focus:border-teal-600 focus:outline-none focus:ring focus:ring-teal-500"
            id="description"
            name="description"
            rows={10}
            cols={55}
            value={description}
            autoComplete="off"
            onInput={(e) => setDescription((e.target as HTMLInputElement).value)}
          />
          <label htmlFor="image">Icon (For best results, image should be a square)</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/png, image/jpeg, image/webp"
            onChange={onSelectIcon}
          ></input>
          <label className="block text-base text-neutral-400" htmlFor="name">
            Source Code (Google Drive Link, GitHub repository, etc)
          </label>
          <input
            className="mb-4 block w-full rounded-md bg-ocean-500 p-2 text-lg shadow-lg focus:border-teal-600 focus:outline-none focus:ring focus:ring-teal-500"
            type="text"
            id="src"
            name="src"
            autoComplete="off"
            value={srcLink}
            onInput={(e) => setSrcLink((e.target as HTMLInputElement).value)}
          />
          <label className="bl ock text-base text-neutral-400" htmlFor="name">
            Video Link (YouTube)
          </label>
          <input
            className="mb-6 block w-full rounded-md bg-ocean-500 p-2 text-lg shadow-lg focus:border-teal-600 focus:outline-none focus:ring focus:ring-teal-500"
            type="text"
            id="vid"
            name="vid"
            autoComplete="off"
            value={videoLink}
            onInput={(e) => setVideoLink((e.target as HTMLInputElement).value)}
          />
          {videoLink !== null ? (
            <iframe className="rounded-3xl" src={videoLink.replace("watch?v=", "embed/")} width={1000} height={500} />
          ) : null}
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