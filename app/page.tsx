/*
  You might be confused about all of the classNames that don't really appear in regular
  HTML and CSS. This is because we are using a library called Tailwind, that allows us
  to apply CSS styles on the fly.

  See the doc for more info:
  https://docs.google.com/document/d/1VWi2Z0pJ63n1Pp7hGuKqC-58oF90Q4U19RG83bdZqw8/edit?usp=sharing

  You'll also notice that once you run the app, the two heading elements here are arranged in a row.
  How is that? The answer is flexbox.
*/

export default function Home() {
  return (
      /* See how the two elements are centered vertically? We declared the outside container
      as flex and made the space between the two elements equal using items-center and
      justify-evenly */
      <div className="flex min-h-screen justify-evenly items-center p-24">
        <h1><span className="text-sky-400">AtomHacks</span> <span className="text-pink-500">X</span></h1>
        {/* By setting the width of the following div to a fixed number, we make the text wrap around
        instead of being really long and looking worse. */}
        <div className="w-96">
        <h2>Bronx Science&apos;s <span className="text-green-400">10th</span> Annual Hackathon</h2>
        </div>
      </div>
  )
}
