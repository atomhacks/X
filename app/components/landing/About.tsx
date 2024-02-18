"use client";

import Image from "next/image";

import empowerImg from "@/public/gallery/2023/DSC_1144.jpg";
import dreamImg from "@/public/gallery/2023/DSC_1129.jpg";
import demoImg from "@/public/gallery/2023/DSC_1061.jpg";
import foodImg from "@/public/gallery/2023/DSC_1031.jpg";
import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const content = [
  {
    img: empowerImg,
    text: "AtomHacks is committed to creating and organizing innovative and interactive coding competitions for the Bronx High School of Science. We are driven to give back to our community and provide transformative computer science opportunities for students of all levels.",
  },
  {
    img: dreamImg,
    text: "For 12 hours straight, you'll be able to let your dreams run wild, and build anything you want utilizing the superpower of computer science. You'll attend workshops, meet new people, and create something you never knew you could create!",
  },
  {
    img: demoImg,
    text: "At the end of the hackathon, you'll get the chance to show off the new skills you've learned and the things you've made for a chance to win a prize!",
  },
  {
    img: foodImg,
    text: "Don't worry about food. We cater lunch, dinner, and all-day snacks so that you have the energy to innovate and explore during the event!",
  },
];

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function Section({ img, text }: { img: any; text: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <div ref={ref} className="relative my-24 grid snap-center grid-cols-1 md:my-12 md:grid-cols-5 md:px-0">
      <div className="relative px-4 md:col-span-3">
        <Image priority={true} className="relative rounded-2xl shadow-2xl" src={img} alt="" />
      </div>
      <div className="my-auto text-center md:col-span-2 md:my-4 md:text-right lg:ml-24">
        <motion.p style={{ y }} className="border-r-8 border-green-500 px-8 py-3 text-xl md:text-base">
          {" "}
          {text}
        </motion.p>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <div id="about" className="relative my-8 flex flex-col border-yellow-500 text-white">
      <div className="container relative mx-auto gap-20">
        <h2 className="px-4 py-6 text-6xl underline decoration-green-500 decoration-4 underline-offset-8">About</h2>
        {content.map((obj, i) => (
          <Section key={i} img={obj.img} text={obj.text} />
        ))}
      </div>
    </div>
  );
}
