"use client"

import { useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

import Logo from "./Logo";


export default function Hero() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (value >= 360) {
        setValue(0);
      } else {
        setValue(value + 1);
      }
    }, 36);

    return () => clearInterval(interval);
  }, [value]);

  const colorString = `hsl(${value}, 96%, 66%)`;
  const dimColorString = `hsl(${value}, 96%, 40%)`;

  return (
    <div className='min-h-screen'>
      <div className="flex flex-col items-center justify-center pt-0 p-8">
        <Logo />
        <h1 className='underline underline-offset-8 relative bottom-10' style={{ textDecorationColor: colorString }}>
          AtomHacks <span style={{ color: colorString }}>X</span>
        </h1>
        <h2 className="relative bottom-4">
          Bronx Science's <span style={{ color: colorString }}>10<sup>th</sup></span> Annual Hackathon
        </h2>
        <button className="m-8 py-3 px-8 rounded-full text-xl" style={{ backgroundColor: dimColorString }}>
          Register <FaLongArrowAltRight className="align-middle inline" />
        </button>
      </div>
    </div>
  )
}