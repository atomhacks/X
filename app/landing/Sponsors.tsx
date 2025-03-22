import Image from "next/image";

// const sponsors = [
//   {
//     name: "Bronx Science Alumni Foundation",
//     path: "alumni.png",
//     link: "https://alumni.bxscience.edu/",
//     featured: true,
//   },
// ];

export default function Sponsors() {
  return (
    <div id="sponsors" className="container mx-auto my-8 flex flex-col items-center justify-center gap-4">
      {/* Notice the id property? This is what lets us route to the sponsors section from the navbar */}
      <h2 className="mr-auto px-4 py-6 text-5xl underline decoration-green-500 decoration-4 underline-offset-8">
        Sponsors
      </h2>
      <h3 className="text-center text-xl">Thank you to our sponsors who made AtomHacks possible!</h3>
      <div className="grid w-5/6 items-center justify-center gap-4 md:grid-cols-1">
        <div className="relative col-span-full block flex flex h-auto items-center justify-center rounded-lg bg-transparent">
          <Image
            className="p-8"
            src="/sponsors/Untitled design.png"
            alt="Alumni Association"
            // fill={true}
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
}
