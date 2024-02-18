// Assembles every individual component in ./landing to stitch together one cohesive page

import About from './landing/About'
import Sponsors from './landing/Sponsors'
import Hero from './landing/Hero';
import FAQ from './landing/FAQ';
import NavBar from './components/NavBar';



export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <About />
        <FAQ />
        <Sponsors />
      </main>
    </>
  )
}
