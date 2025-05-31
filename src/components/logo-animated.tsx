"use client";

import { AceSpadesAnimated } from "@/components/main-menu/ace-spades-animated";
import {
  useAnimationControls,
  useDragControls,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import * as motion from "motion/react-client";
import Image from "next/image";
import { useRef } from "react";

export function LogoAnimated() {
  const constraintsRef = useRef<HTMLDivElement>(null);

  const dragControls = useDragControls();
  const animationControls = useAnimationControls();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["30.5deg", "-30.5deg"],
  );

  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-30.5deg", "30.5deg"],
  );

  function onReset() {
    animationControls.start({
      x: 0,
      y: 0,
      transition: { type: "spring", bounce: 0.25, duration: 0.5 },
    });
  }

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = (event.target as HTMLDivElement).getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct * 2);
    y.set(yPct * 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div
      ref={constraintsRef}
      className="relative flex h-full w-full items-center justify-center"
    >
      <motion.div
        drag
        animate={animationControls}
        dragControls={dragControls}
        dragConstraints={constraintsRef}
        dragElastic={0.2}
        onDragEnd={onReset}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="z-[2] h-fit w-fit"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="h-full w-full"
          style={{
            transform: "translateZ(0)",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="absolute z-10 h-full w-full" />
          <AceSpadesAnimated />
        </div>
      </motion.div>

      <Image
        src="/images/balatro-image.png"
        width={800}
        height={500}
        alt="balatro-logo"
        className="absolute"
      />
    </div>
  );
}
