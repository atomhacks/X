"use client";

import Image from "next/image";
import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useState } from "react";
import NavBar from "../components/nav/NavBar";
const photos_2024 = [
  "_DSC0860.JPG",
  "_DSC0883.JPG",
  "_DSC0927.JPG",
  "_DSC0935.JPG",
  "_DSC0945.JPG",
  "_DSC0960.JPG",
  "_DSC0987.JPG",
  "_DSC1008.JPG",
  "_DSC1042.JPG",
  "_DSC1051.JPG",
  "_DSC1111.JPG",
];

const photos_2023 = [
  "DSC_1045.JPG",
  "DSC_1110.JPG",
  "DSC_1127.JPG",
  "DSC_1129.JPG",
  "DSC_1130.JPG",
  "DSC_1134.JPG",
  "DSC_1141.JPG",
  "DSC_1142.JPG",
  "DSC_1146.JPG",
  "DSC_1151.JPG",
  "DSC_1153.JPG",
  "DSC_1051.JPG",
];

const photos_2022 = [
  "DSC_8260.JPG",
  "DSC_8278.JPG",
  "DSC_8311.JPG",
  "DSC_8320.JPG",
  "DSC_8340.JPG",
  "DSC_8350.JPG",
  "DSC_8357.JPG",
  "DSC_8378.JPG",
  "DSC_8451.JPG",
  "DSC_8512.JPG",
  "DSC_8516.JPG",
  "DSC_8562.JPG",
  "DSC_8563.JPG",
  "DSC_8571.JPG",
  "DSC_8915.JPG",
  "DSC_9020.JPG",
  "DSC_9041.JPG",
  "DSC_9073.JPG",
  "IMG_8720.JPG",
  "IMG_8721.JPG",
  "IMG_8726.JPG",
  "IMG_8729.JPG",
  "IMG_8737.JPG",
  "IMG_8768.JPG",
  "IMG_8771.JPG",
  "IMG_8775.JPG",
  "IMG_8824.JPG",
];

const photos_2019 = [
  "_DSC2652.JPG",
  "_DSC2710.JPG",
  "_DSC2725.JPG",
  "_DSC2767.JPG",
  "_DSC2779.JPG",
  "_DSC2803.JPG",
  "_DSC2837.JPG",
  "_DSC2866.JPG",
  "_DSC2871.JPG",
  "_DSC2886.JPG",
  "_DSC2977.JPG",
  "_DSC3787.JPG",
  "_DSC3836.JPG",
  "_DSC4026.JPG",
  "_DSC4055.JPG",
  "_DSC4152.JPG",
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <NavBar />
      <main>
        <Transition appear show={selectedImage != null} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={() => setSelectedImage(null)}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="mt-[56px] flex min-h-screen items-center justify-center p-8 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="flex transform items-center justify-center overflow-hidden rounded-2xl shadow-xl transition-all">
                    {selectedImage && (
                      <Image className="rounded-2xl" src={selectedImage} width={1000} height={400} alt={""} />
                    )}
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
        <div className="p-8 text-white">
          <div className="mb-8 flex items-center justify-center">
            <span className="font-morro py-6 text-7xl underline decoration-green-500 decoration-4 underline-offset-8 md:text-5xl">
              GALLERY
            </span>
          </div>
          <h1 className="mb-3 inline-block border-b-4 border-yellow-500 text-4xl">2024</h1>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {photos_2024.map((photo: string, i: number) => (
                <Image
                  className="hover:border-box hover:outline-3 outline-solid box-border cursor-pointer rounded-xl outline-green-500 transition duration-200 hover:outline"
                  src={`/gallery/2024/${photo}`}
                  width={620}
                  height={200}
                  key={i}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  alt={""}
                  onClick={() => setSelectedImage(`/gallery/2024/${photo}`)}
                />
              ))}
            </div>
          </div>
          <h1 className="mb-3 inline-block border-b-4 border-yellow-500 text-4xl">2023</h1>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {photos_2023.map((photo: string, i: number) => (
                <Image
                  className="hover:border-box hover:outline-3 outline-solid box-border cursor-pointer rounded-xl outline-green-500 transition duration-200 hover:outline"
                  src={`/gallery/2023/${photo}`}
                  width={620}
                  height={200}
                  key={i}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  alt={""}
                  onClick={() => setSelectedImage(`/gallery/2022/${photo}`)}
                />
              ))}
            </div>
          </div>
          <h1 className="mb-3 inline-block border-b-4 border-yellow-500 text-4xl">2022</h1>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {photos_2022.map((photo: string, i: number) => (
                <Image
                  className="hover:border-box hover:outline-3 outline-solid box-border cursor-pointer rounded-xl outline-green-500 transition duration-200 hover:outline"
                  src={`/gallery/2022/${photo}`}
                  width={620}
                  height={200}
                  key={i}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  alt={""}
                  onClick={() => setSelectedImage(`/gallery/2022/${photo}`)}
                />
              ))}
            </div>
          </div>
          <h1 className="mb-3 mt-4 inline-block border-b-4 border-yellow-500 text-4xl">2019</h1>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {photos_2019.map((photo: string, i: number) => (
                <Image
                  className="hover:border-box hover:outline-3 outline-solid box-border cursor-pointer rounded-xl outline-green-500 transition duration-200 hover:outline"
                  src={`/gallery/2019/${photo}`}
                  width={620}
                  height={200}
                  key={i}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  alt={""}
                  onClick={() => setSelectedImage(`/gallery/2019/${photo}`)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
