"use client";

import { cn } from "@/lib/utils";
import { animate, stagger } from "motion";
import { splitText } from "motion-plus";
import { useEffect, useRef } from "react";

interface JumpingTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  text: string;
  className?: string;
  staggerDelay?: number;
  duration?: number;
  startDelay?: number;
  repeatDelay?: number;
  y?: number[];
}

export default function JumpingText({
  text,
  className,
  staggerDelay = 0.25,
  duration = 0.4,
  startDelay,
  repeatDelay,
  y = [0, -5, 0],
}: JumpingTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.fonts.ready.then(() => {
      if (!containerRef.current) return;

      const { chars } = splitText(
        containerRef.current.querySelector(".jumping")!,
      );

      containerRef.current.style.visibility = "visible";

      animate(
        chars,
        { y },
        {
          repeat: Infinity,
          repeatType: "mirror",
          repeatDelay: repeatDelay ?? chars.length * staggerDelay,
          ease: "easeInOut",
          duration,
          delay: stagger(staggerDelay, {
            startDelay: startDelay ?? -staggerDelay * chars.length,
          }),
        },
      );
    });
  }, []);

  return (
    <div ref={containerRef}>
      <p className={cn("jumping", className)}>{text}</p>
    </div>
  );
}
