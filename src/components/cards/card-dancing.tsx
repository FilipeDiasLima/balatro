"use client";

import { animate } from "motion";
import * as motion from "motion/react-client";
import { useEffect, useRef } from "react";

export function CardDancing({
  slow = false,
  children,
}: {
  slow?: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // const delay = Math.floor(Math.random() * 2001);
  const duration = Math.floor(Math.random() * 2001) + 1000; // 100 a 200

  const randomInitalRotate = Math.floor(Math.random() * (slow ? 3 : 6));

  useEffect(() => {
    if (ref.current) {
      animate(
        ref.current,
        { y: [0, -2, 0], rotate: [-randomInitalRotate, randomInitalRotate] },
        {
          repeat: Infinity,
          repeatType: "mirror",
          repeatDelay: 0,
          ease: "easeIn",
          duration: duration / (slow ? 500 : 1000),
          delay: 0.1,
        },
      );
    }
  }, []);

  return (
    <div
      className="card-shadow-sm flex w-fit flex-col items-center justify-center rounded-lg"
      ref={ref}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{
          opacity: 1,
          scale: [0.8, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 0.2,
          ease: [0, 0.71, 0.2, 1.2],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
