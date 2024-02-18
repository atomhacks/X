"use client";

import Rive from "@rive-app/react-canvas";

export default function Logo() {
  return (
    <div className="relative bottom-8">
      <div className="h-[22rem] w-[22rem] md:h-[40rem] md:w-[40rem]">
        <Rive src="/rive/new_logo.riv" />
      </div>
    </div>
  );
}
