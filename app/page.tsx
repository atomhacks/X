/*
  You might be confused about all of the classNames that don't really appear in regular
  HTML and CSS. This is because we are using a library called Tailwind, that allows us
  to apply CSS styles on the fly.

  See the doc for more info:
  https://docs.google.com/document/d/1VWi2Z0pJ63n1Pp7hGuKqC-58oF90Q4U19RG83bdZqw8/edit?usp=sharing

  You'll also notice that once you run the app, the two heading elements here are arranged in a row.
  How is that? The answer is flexbox.
*/

/* The landing folder contains components that we will use later on */
import About from './components/landing/About'
import Sponsors from './components/landing/Sponsors'

export default function Home() {
  return (
    <>
      {/* See how the two elements are centered vertically? We declared the outside container
      as flex and made the space between the two elements equal using items-center and
  justify-evenly */}
      <main>
        <div className="flex min-h-screen items-center justify-evenly p-24">
          <h1>
            <span className="text-sky-400">AtomHacks</span> <span className="text-pink-500">X</span>
          </h1>
          {/* By setting the width of the following div to a fixed number, we make the text wrap around
        instead of being really long and looking worse. */}
          <div className="w-96">
            <h2>
              Bronx Science&apos;s <span className="text-green-400">10th</span> Annual Hackathon
            </h2>
          </div>
        </div>
        {/*
        Try right clicking on About and Sponsors and clicking Go To Definition
        You'll see that React/Next Components can be chained together to create a more organized
        and cohesive layout. This is a good way to split roles as well, as its better for different
        people to work on different files rather than everyone trying to work on the same file at once.
      */}
        <About />

        <Sponsors />
      </main>
    </>
  )
}
