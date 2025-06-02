"use client";

import { useAnimationFrame } from "motion/react";
import * as motion from "motion/react-client";
import Image from "next/image";
import { useRef } from "react";

interface AceSpadesAnimatedProps {
  hasPressed: boolean;
}

export function AceSpadesAnimated({ hasPressed }: AceSpadesAnimatedProps) {
  const ref = useRef<HTMLDivElement>(null);

  useAnimationFrame((t) => {
    if (!hasPressed) {
      if (!ref.current) return;

      const rotate = Math.sin(t / 1000) * 3;
      ref.current.style.transform = `rotate(${rotate}deg)`;
    } else {
      if (!ref.current) return;
      ref.current.style.transform = `rotate(0deg)`;
    }
  });

  return (
    <motion.div ref={ref}>
      <Image
        src="/images/ace-spades.webp"
        width={180}
        height={300}
        alt="AsEspadas"
      />
    </motion.div>
  );
}
