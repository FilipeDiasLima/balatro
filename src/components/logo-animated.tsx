"use client";

import { AceSpadesAnimated } from "@/components/main-menu/ace-spades-animated";
import { useSound } from "@/hooks/use-sound";
import { distance } from "@/utils/distance";
import { round } from "@/utils/round";
import { useAnimationControls, useDragControls } from "motion/react";
import * as motion from "motion/react-client";
import Image from "next/image";
import { useRef, useState } from "react";

export function LogoAnimated() {
  const [hasPressed, setHasPressed] = useState(false);

  const dragControls = useDragControls();
  const animationControls = useAnimationControls();
  const playClickSound = useSound("/sounds/card-slide-1.ogg", 0.2);

  const constraintsRef = useRef<HTMLDivElement>(null);

  function onReset() {
    setHasPressed(false);
    animationControls.start({
      x: 0,
      y: 0,
      transition: { type: "spring", bounce: 0.25, duration: 0.5 },
    });
  }

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!hasPressed) {
      const rect = event.currentTarget.getBoundingClientRect();

      const absolute = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };

      const percent = {
        x: round((100 / rect.width) * absolute.x),
        y: round((100 / rect.height) * absolute.y),
      };

      const center = {
        x: (percent.x - 50) * -1,
        y: (percent.y - 50) * -1,
      };

      animationControls.start({
        rotateY: round(((center.x > 50 ? 1 : -1) * center.x) / 4),
        rotateX: round(center.y / 6),
        transformPerspective:
          round(distance(percent.x, percent.y, 50, 50) / 20) * 100,
      });
    } else {
      animationControls.start({
        rotateY: 0,
        rotateX: 0,
        transformPerspective: 2 * 100,
      });
    }
  }

  function stopAnimating() {
    animationControls.start({
      rotateY: 0,
      rotateX: 0,
      transformPerspective: 2,
    });
  }

  function handleClick() {
    playClickSound();
    animationControls.start({
      scale: [null, 1.3, 1.2],
      transition: {
        duration: 0.1,
        times: [0, 0.9, 1],
        ease: ["easeInOut", "easeOut"],
      },
    });
  }

  return (
    <div
      ref={constraintsRef}
      className="relative flex h-full w-full items-center justify-center"
    >
      <motion.div
        drag
        dragControls={dragControls}
        dragConstraints={constraintsRef}
        dragElastic={0.2}
        onDragStart={() => setHasPressed(true)}
        onDragEnd={onReset}
        onMouseMove={handleMouseMove}
        onMouseLeave={stopAnimating}
        onMouseEnter={playClickSound}
        className="z-[2] h-fit w-fit"
        animate={animationControls}
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "center",
          perspective: "320px",
        }}
        whileHover={{
          scale: [null, 1.3, 1.2],
          transition: {
            duration: 0.1,
            times: [0, 0.9, 1],
            ease: ["easeInOut", "easeOut"],
          },
        }}
        onClick={handleClick}
        transition={{
          duration: 0.1,
          ease: "easeOut",
        }}
      >
        <div className="h-full w-full">
          <div className="absolute z-10 h-full w-full" />
          <AceSpadesAnimated hasPressed={hasPressed} />
        </div>
      </motion.div>

      <Image
        src="/images/balatro-image.png"
        width={970}
        height={600}
        alt="balatro-logo"
        className="absolute"
      />
    </div>
  );
}
