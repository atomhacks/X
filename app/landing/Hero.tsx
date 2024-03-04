"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import FlyingCars from "./FlyingCars";

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
  return (
    <div className="min-h-[80vh]">
      <FlyingCars />
      <div className="flex flex-col items-center justify-center p-8 pt-0">
        <Logo />
        <h1
          className="relative bottom-10 text-center underline underline-offset-8"
          style={{ textDecorationColor: colorString }}
        >
          AtomHacks <span style={{ color: colorString }}>X</span>
        </h1>
        <h2 className="relative bottom-4 text-center">
          Bronx Science&apos;s{" "}
          <span style={{ color: colorString }}>
            10<sup>th</sup>
          </span>{" "}
          Annual Hackathon
        </h2>
        <h2 className="relative bottom-4 text-center">
          <span style={{ color: colorString }}>See You Next Year!</span>
        </h2>
      </div>
    </div>
  );
}
