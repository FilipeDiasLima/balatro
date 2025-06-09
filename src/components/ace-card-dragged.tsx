"use client";

import { useSound } from "@/hooks/use-sound";
import { cn } from "@/lib/utils";
import { distance } from "@/utils/distance";
import { round } from "@/utils/round";
import { useAnimationControls, useDragControls } from "motion/react";
import * as motion from "motion/react-client";
import { forwardRef } from "react";

export interface AceCardDraggedProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  constraintsRef?: React.RefObject<HTMLDivElement | null>;
  hasPressed: boolean;
  setHasPressed: (pressed: boolean) => void;
}

const AceCardDragged = forwardRef<HTMLDivElement, AceCardDraggedProps>(
  ({ children, constraintsRef, hasPressed, setHasPressed, ...props }, ref) => {
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

    function onReset() {
      setHasPressed(false);
      console.log("onReset");
      animationControls.start({
        x: 0,
        y: 0,
        rotate: 0,
        transition: { type: "spring", bounce: 0.25, duration: 0.5 },
      });
    }

    function stopAnimating() {
      animationControls.start({
        rotate: 0,
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
      <motion.div
        drag
        dragControls={dragControls}
        dragConstraints={constraintsRef ?? undefined}
        dragElastic={0.2}
        onDrag={handleDrag}
        onDragStart={() => setHasPressed(true)}
        onDragEnd={onReset}
        onMouseMove={handleMouseMove}
        onMouseLeave={stopAnimating}
        onMouseEnter={playClickSound}
        onClick={handleClick}
        onMouseDown={() => setHasPressed(true)}
        onMouseUp={() => setHasPressed(false)}
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
        transition={{
          duration: 0.1,
          ease: "easeOut",
        }}
      >
        <div className="h-full w-full">
          <div className={cn("absolute z-10 h-full w-full")} />
          {children}
        </div>
      </motion.div>
    );
  },
);

export { AceCardDragged };
