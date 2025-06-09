"use client";

import { useSound } from "@/hooks/use-sound";
import { cn } from "@/lib/utils";
import { useAnimationControls, useDragControls } from "motion/react";
import * as motion from "motion/react-client";
import { forwardRef, useState } from "react";

export interface FaceDownCardDraggedProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  constraintsRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

const FaceDownCardDragged = forwardRef<
  HTMLDivElement,
  FaceDownCardDraggedProps
>(({ children, constraintsRef, className, ...props }, ref) => {
  const [hasPressed, setHasPressed] = useState(false);

  const dragControls = useDragControls();
  const animationControls = useAnimationControls();
  const playClickSound = useSound("/sounds/card-slide-1.ogg", 0.2);

  function handleDrag(
    event: any,
    info: {
      offset: { x: number; y: number };
      delta: { x: number; y: number };
    },
  ) {
    const clamp = (value: number, min: number, max: number) =>
      Math.max(min, Math.min(max, value));

    if (info.delta.x === 0) {
      animationControls.start({
        rotate: 0,
        transition: { type: "spring", bounce: 0.5, duration: 0.5 },
      });
    } else {
      animationControls.start({
        rotate: clamp(((10 * info.delta.x) / 10) * 2, -30, 30),
        transition: { type: "spring", bounce: 0.5, duration: 0.5 },
      });
    }
  }
  function onReset() {
    setHasPressed(false);
    animationControls.start({
      x: 0,
      y: 0,
      rotate: 0,
      transition: { type: "spring", bounce: 0.25, duration: 0.5 },
    });
  }

  function handleClick() {
    playClickSound();
    animationControls.start({
      scale: [null, 1.12, 1.08],
      transition: {
        duration: 0.1,
        times: [0, 0.9, 1],
        ease: ["easeInOut", "easeOut"],
      },
    });
  }

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragConstraints={constraintsRef ?? undefined}
      dragElastic={0.2}
      onDragStart={handleClick}
      onDragEnd={onReset}
      onDrag={handleDrag}
      onMouseEnter={playClickSound}
      onMouseDown={() => setHasPressed(true)}
      onMouseUp={() => setHasPressed(false)}
      onClick={handleClick}
      className={cn("z-[2] h-fit w-fit", className)}
      animate={animationControls}
      style={{
        transformStyle: "preserve-3d",
        transformOrigin: "center",
        perspective: "320px",
      }}
      whileHover={{
        scale: [null, 1.08, 1.03],
        transition: {
          duration: 0.1,
          times: [0, 0.9, 1],
          ease: ["easeInOut", "easeOut"],
        },
      }}
      transition={{
        duration: 0.1,
        ease: "easeOut",
      }}
    >
      <div className="h-full w-full">
        <div
          className={cn(
            "absolute z-10 h-full w-full rounded-md",
            hasPressed && "card-shadow",
          )}
        />
        {children}
      </div>
    </motion.div>
  );
});

export { FaceDownCardDragged };
