"use client"

import { useEffect, useState, useRef, PropsWithChildren } from 'react';
import car from "@/public/car.svg" // Temporary image, a better one will be added soon
import { gsap } from "gsap";
import Image from 'next/image'

const widthSize = () => {
  const [currentWidth, setWidth] = useState({ width: 0 });

  useEffect(() => {
    function handleResize() {
      setWidth({
        width: window.innerWidth,
      });
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return window.removeEventListener('resize', handleResize);
  }, []);

  return currentWidth;
};

type Props = {
  speed: number,
  rotation?: number,
  movement?: number,
  margin?: number
}

function FlyCar(props: PropsWithChildren<Props>) {
  const carRef = useRef(null);
  const { width } = widthSize();

  
  useEffect(() => {
    const carAnimation = gsap.to(carRef.current, {
      x: props.movement || width + 200,
      duration: props.speed,
      ease: "none",
      repeat: -1,
      yoyo: true,
      onRepeat: function() {
        const currentScaleX = gsap.getProperty(carRef.current, "scaleX");
        const newScaleX = currentScaleX === 1 ? -1 : 1;
        gsap.set(carRef.current, { scaleX: newScaleX });
      }
    }
    );
  }, [width]);
  
  return (
    <Image src={car} alt="" ref={carRef} width={200} className="mt-8"
      style={{ transform: `scaleX(${props.rotation || 1})`, marginLeft: props.margin || -195 }}>
    </Image>
  );
}

export default function flyingCars() {
  const { width } = widthSize();

  return (
    <div className="absolute overflow-hidden">
      <FlyCar speed={12}/>
      <FlyCar speed={14} rotation={-1} movement={-(width + 185)} margin={width - 20} />
      <FlyCar speed={10}/>
    </div>
  )
}

// Plan: Add a hover animation under the car and add a better car image as it isn't very dynamic

