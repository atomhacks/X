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
      <div className="relative z-10 flex flex-col items-center justify-center p-8 pt-0">
        <Logo />
        <h1
          className="relative bottom-10 text-center underline underline-offset-8"
          style={{ textDecorationColor: colorString }}
        >
          AtomHacks <span style={{ color: colorString }}>XII</span>
        </h1>
        <h2 className="relative bottom-4 text-center">
          Bronx Science&apos;s{" "}
          <span style={{ color: colorString }}>
            12<sup>th</sup>
          </span>{" "}
          Annual Hackathon
        </h2>
        <h2 className="relative bottom-4 flex flex-col text-center">
          <span style={{ color: colorString }}>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLScXECYZFQf_Yh8hGwsCY3VnCN-rpgzmCXTTo8f2N4vSfFO3SQ/viewform?usp=dialog">
              Registration Link
            </a>
          </span>
          <span style={{ color: colorString }}>03/28/26</span>
          <div className="flex flex-row gap-4 mt-4">
            <span style={{ color: 'white' }} className="bg-black text-white px-3 py-1 rounded-md">
              <a href="https://docs.google.com/spreadsheets/d/1RRXsGI64wuv7NO4v_sJYgHS1Euy9JyyNRTgVkQc8-v4/edit?usp=sharing">
                Schedule
              </a>
            </span>
            <span style={{ color: colorString }} className="bg-black text-white px-3 py-1 rounded-md">
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSfI3WLcuTIEq5HvV_PkEzB7i_SjLcthlDZXE-Hz9K_jLxjc-Q/viewform?usp=dialog">
                Submission
              </a>
            </span>
          </div>
        </h2>
      </div>
    </div>
  );
}
