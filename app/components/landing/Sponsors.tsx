import Image from 'next/image'

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
    <div id="sponsors" className="flex flex-col items-center justify-center my-8 container mx-auto gap-4">
      {/* Notice the id property? This is what lets us route to the sponsors section from the navbar */}
      <h2 className="mr-auto py-6 text-5xl underline decoration-green-500 decoration-4 underline-offset-8">Sponsors</h2>
      <h3 className="text-xl text-center">Thank you to our sponsors who made AtomHacks possible!</h3>
      <div className="grid w-5/6 grid-cols-3 items-center justify-center gap-4 md:grid-cols-1">
        <div className="relative block h-48 items-center justify-center rounded-lg col-span-full bg-white">
          <Image className="p-8" src='/sponsors/alumni.svg' alt='Alumni Association' fill={true}/>
        </div>
      </div>
    </div>
  )
}