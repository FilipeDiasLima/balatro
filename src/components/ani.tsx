"use client";

import * as motion from "motion/react-client";
import { useRef, useState } from "react";

export function Ani() {
  const [rotations, setRotations] = useState({ x: 0, y: 0, z: 2 });
  const [isAnimating, setAnimating] = useState(false);
  const isAnimatingReference = useRef(isAnimating);

  function round(num, fix = 2) {
    return parseFloat(num.toFixed(fix));
  }

  function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  const handleMouseMove = (event) => {
    setAnimating(true);
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
      x: percent.x - 50,
      y: percent.y - 50,
    };

    setRotations({
      x: round(((center.x > 50 ? 1 : -1) * center.x) / 12),
      y: round(center.y / 16),
      z: round(distance(percent.x, percent.y, 50, 50) / 20),
    });
  };

  const stopAnimating = () => {
    setAnimating(false);

    setTimeout(() => {
      if (!isAnimatingReference.current) return;

      setRotations({ x: 0, y: 0, z: 2 });
    }, 100);
  };

  return (
    <motion.div
      // Mouse interactions events handlers.
      onMouseMove={handleMouseMove}
      onMouseLeave={stopAnimating}
      animate={{
        // Rotation values used to tilt the card.
        rotateY: rotations.x,
        rotateX: rotations.y,
        transformPerspective: rotations.z * 100,
      }}
      style={{
        width: "240px",
        height: "320px",
        backgroundColor: "#C2B8F0",
        borderRadius: "0.5rem",
        boxShadow:
          "0 0 0 1px rgba(0, 0, 0, 0.105), 0 9px 20px 0 rgba(0, 0, 0, 0.02), 0 1px 2px 0 rgba(0, 0, 0, 0.106)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transformStyle: "preserve-3d",
        transformOrigin: "center",
        perspective: "320px",
      }}
    >
      <p>LIGMA</p>
    </motion.div>
  );
}
