"use client";

import { cn } from "@/lib/utils";
import { animate, stagger } from "motion";
import { splitText } from "motion-plus";
import { useEffect, useRef } from "react";

interface WavyTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  text: string;
  className?: string;
  staggerDelay?: number;
  duration?: number;
  startDelay?: number;
  repeatDelay?: number;
  y?: number[];
}

export default function WavyText({
  text,
  className,
  staggerDelay = 0.25,
  duration = 1,
  startDelay,
  repeatDelay,
  y = [-5, 5],
}: WavyTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.fonts.ready.then(() => {
      if (!containerRef.current) return;

      const { chars } = splitText(containerRef.current.querySelector(".wavy")!);
      containerRef.current.style.visibility = "visible";

      animate(
        chars,
        { y },
        {
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          repeatDelay,
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
      <p className={cn("wavy", className)}>{text}</p>
    </div>
  );
}
