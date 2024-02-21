"use client";

import { useEffect, useState, useRef, PropsWithChildren } from "react";
import futureCarOne from "@/public/cars/flyingCar.svg";
import futureCarTwo from "@/public/cars/flyingCar-1.svg";
import futureCarThree from "@/public/cars/flyingCar-2.svg";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

function WidthSize() {
  const [currentWidth, setWidth] = useState({ width: window.innerWidth });
  const prevWidthRef = useRef(currentWidth.width);

  useEffect(() => {
    function handleResize() {
      const newWidth = window.innerWidth;
      setWidth((prev) => {
        prevWidthRef.current = prev.width;
        return { width: newWidth };
      });
    }

    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  return { ...currentWidth, oldWidth: prevWidthRef.current };
}

type Props = {
  speed: number;
  src: string;
  hover: number[][];
  scaleX?: number;
  endpoint?: number;
  left?: number;
  right?: number;
};

function FlyCar(props: PropsWithChildren<Props>) {
  const { width, oldWidth } = WidthSize();
  const container = useRef(null);
  const carRef = useRef(null);
  const hoverRef = useRef(null);

  useGSAP(
    () => {
      gsap.to(carRef.current, {
        x: props.endpoint || width + 210,
        duration: props.speed,
        ease: "none",
        repeat: -1,
        yoyo: true,
        onRepeat: function () {
          const currentScaleX = gsap.getProperty(carRef.current, "scaleX") as number;
          const newScaleX = currentScaleX === 1 ? -1 : 1;
          gsap.set(carRef.current, { scaleX: newScaleX });
        },
      });

      if (width !== oldWidth) {
        gsap.set(carRef.current, { x: props.endpoint || width + 225 });
      }

      gsap.to(hoverRef.current, {
        y: 4,
        duration: 2,
        opacity: 1,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });
    },
    { scope: container },
  );

  return (
    <div
      ref={carRef}
      className="relative mt-[3.5rem] h-[auto] w-[13rem] md:mt-[5rem]"
      style={{
        transform: `scaleX(${props.scaleX || 1})`,
        right: props.right,
        left: props.left,
      }}
    >
      <Image src={props.src} alt="" className="h-[auto] w-[13rem]" />
      <div className="flex flex-row opacity-0" ref={hoverRef}>
        {props.hover.map((margin: number[]) => (
          <svg
            className="mt-1 h-[auto] w-[2rem] fill-[#5ccbe5]"
            viewBox="0 0 40 12"
            style={{
              marginLeft: margin[0],
              transform: `rotate(${margin[1]}deg)`,
            }}
          >
            <rect y="0" width="40" height="4" rx="1.98" ry="1.98" />
            <rect x="10" y="8" width="20" height="4" rx="1.98" ry="1.98" />
          </svg>
        ))}
      </div>
    </div>
  );
}

export default function flyingCars() {
  const { width } = WidthSize();

  return (
    <div className="absolute h-[32rem] w-[98vw] overflow-hidden">
      <FlyCar src={futureCarOne} speed={16} right={210} hover={[[50], [50]]} />
      <FlyCar
        src={futureCarTwo}
        speed={18}
        left={width}
        hover={[[25, 5], [100]]}
        scaleX={-1}
        endpoint={-(width + 210)}
      />
      <FlyCar
        src={futureCarThree}
        speed={14}
        right={210}
        hover={[
          [9, 3],
          [45, 3],
          [45, 3],
        ]}
      />
    </div>
  );
}
