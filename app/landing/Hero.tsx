"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import FlyingCars from "../components/flyingCars"
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

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
          Bronx Science's{" "}
          <span style={{ color: colorString }}>
            10<sup>th</sup>
          </span>{" "}
          Annual Hackathon
        </h2>
        <h2 className="relative bottom-4 text-center">
          <span style={{ color: colorString }}>
            March 2nd, 2024
          </span>
        </h2>
        <Link
          href="/register"
          className="m-8 rounded-full px-8 py-3 text-xl"
          style={{ backgroundColor: dimColorString }}
        >
          Register <ChevronRightIcon className="inline align-middle h-4"></ChevronRightIcon>
        </Link>
      </div>
    </div>
  );
}
