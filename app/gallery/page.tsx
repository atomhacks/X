import Image from 'next/image'

const photos_2022 = [
  "DSC_1181.JPG",
  "DSC_1206.JPG",
];
const photos_2021 = [
  "DSC_1209.JPG",
];

export default function Gallery() {
  return (
    <div className="p-8 text-white">
      <div className="mb-8 flex items-center justify-center">
        <span className="font-morro border-b-4 border-green-500 py-6 text-7xl md:text-5xl">GALLERY</span>
      </div>
      <h1 className="mb-3 inline-block border-b-4 border-yellow-500 text-4xl">2022</h1>
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-8 sm:grid-cols-1 md:grid-cols-1">
          {photos_2022.map((photo: string, i: number) => (
            <Image
              className="hover:border-box hover:outline-3 outline-solid box-border cursor-pointer rounded-xl outline-green-500 transition duration-200 hover:outline"
              src={`/gallery/2022/${photo}`}
              width={620}
              height={200}
              key={i}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              alt={''}
            />
          ))}
        </div>
      </div>
      <h1 className="mb-3 mt-4 inline-block border-b-4 border-yellow-500 text-4xl">2021</h1>
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-8 sm:grid-cols-1 md:grid-cols-1">
          {photos_2021.map((photo: string, i: number) => (
            <Image
              className="hover:border-box hover:outline-3 outline-solid box-border cursor-pointer rounded-xl outline-green-500 transition duration-200 hover:outline"
              src={`/gallery/2022/${photo}`}
              width={620}
              height={200}
              key={i}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              alt={''}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
