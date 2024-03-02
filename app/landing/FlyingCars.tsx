/* eslint-disable react/jsx-key */
"use client";

import { useEffect, useState, useRef, PropsWithChildren } from "react";
import flyingCarOne from "@/public/cars/flyingCar1.svg";
import flyingCarTwo from "@/public/cars/flyingCar2.svg";
import flyingCarThree from "@/public/cars/flyingCar3.svg";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

function WidthSize() {
  const hasWindow = typeof window !== 'undefined';
  const windowWidth = hasWindow ? window.innerWidth : 0;
  const [currentWidth, setWidth] = useState({ width: windowWidth });
  const prevWidthRef = useRef(currentWidth.width);

  useEffect(() => {
    function handleResize() {
      if (typeof window !== 'undefined') {
        const newWidth = window.innerWidth;
        setWidth((prev) => {
          prevWidthRef.current = prev.width;
          return { width: newWidth };
        });
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  return { ...currentWidth, oldWidth: prevWidthRef.current };
}

type Props = {
  src: string;
  speed: number;
  opposite?: boolean;
  hover: number[][];
  left?: number;
  right?: number;

};

function FlyCar(props: PropsWithChildren<Props>) {
  const { width, oldWidth } = WidthSize();
  const container = useRef(null);
  const carRef = useRef(null);
  const hoverRef = useRef(null);
  let margin = "0";
  let scaleX = 1;
  let endpoint = width + 210;

  if (props.opposite) {
    margin = `75px -210px`;
  } else {
    margin = `75px ${width}px`;
    scaleX = -1;
    endpoint = -(width + 210);
  }

  useGSAP(
    () => {
      if (carRef.current) {
        gsap.to(carRef.current, {
          x: endpoint,
          duration: props.speed,
          ease: "none",
          repeat: -1,
          yoyo: true,
          onRepeat: function () {
            const currentScaleX = gsap.getProperty(carRef.current, "scaleX") as number;
            const newScaleX = currentScaleX === 1 ? -1 : 1;
            gsap.set(carRef.current, { scaleX: newScaleX });
          },
        })

        if (width !== oldWidth) {
          gsap.set(carRef.current, { x: endpoint });
        }
      }

      if (hoverRef.current) {
        gsap.to(hoverRef.current, {
          y: 4,
          duration: 2,
          opacity: 1,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });
      }
    },
    { scope: container.current || undefined },
  );

  return (
    <div ref={container}>
      <div
        ref={carRef}
        style={{
          transform: `scaleX(${scaleX})`,
          margin: margin
        }}
        className="relative h-[auto] w-[13rem]"
      >
        <Image src={props.src} alt="" className="h-[auto] w-[13rem]" />
        <div className="flex flex-row opacity-0" ref={hoverRef}>
          {props.hover.map((hoverMargin: number[], index) => (
            <svg
            key={index}
            className="mt-1 h-[auto] w-[2rem] fill-[#5ccbe5]"
            viewBox="0 0 40 12"
            style={{
              marginLeft: hoverMargin[0],
              transform: `rotate(${hoverMargin[1]}deg)`,
            }}
            >
              <rect y="0" width="40" height="4" rx="1.98" ry="1.98" />
              <rect x="10" y="8" width="20" height="4" rx="1.98" ry="1.98" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function flyingCars() {
  return (
    <div className="absolute h-[32rem] viewport-width overflow-hidden">
      <FlyCar src={flyingCarOne}
        speed={16}
        opposite={true}
        hover={[[50], [50]]}
      />
      <FlyCar
        src={flyingCarTwo}
        speed={18}
        hover={[[25, 5], [100]]}
      />
      <FlyCar
        src={flyingCarThree}
        speed={14}
        opposite={true}
        hover={[
          [9, 3],
          [45, 3],
          [45, 3],
        ]}
      />
    </div>
  );
}
