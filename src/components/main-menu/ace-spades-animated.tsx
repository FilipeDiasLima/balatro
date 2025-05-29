"use client";

import { useAnimationFrame } from "motion/react";
import * as motion from "motion/react-client";
import Image from "next/image";
import { useRef } from "react";

export function AceSpadesAnimated() {
  const ref = useRef<HTMLDivElement>(null);

  useAnimationFrame((t) => {
    if (!ref.current) return;

    const rotate = Math.sin(t / 1000) * 5;
    ref.current.style.transform = `rotate(${rotate}deg)`;
  });

  return (
    <motion.div ref={ref} className="z-[2]">
      <Image
        src="/images/ace-spades.webp"
        width={160}
        height={300}
        alt="AsEspadas"
      />
    </motion.div>
  );
}
