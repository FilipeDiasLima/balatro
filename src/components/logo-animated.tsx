"use client";

import { AceCardDragged } from "@/components/ace-card-dragged";
import { AceSpadesAnimated } from "@/components/main-menu/ace-spades-animated";
import Image from "next/image";
import { useRef, useState } from "react";

export function LogoAnimated() {
  const [hasPressed, setHasPressed] = useState(false);

  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={constraintsRef}
      className="relative flex h-full w-full items-center justify-center"
    >
      <AceCardDragged
        constraintsRef={constraintsRef}
        hasPressed={hasPressed}
        setHasPressed={setHasPressed}
      >
        <AceSpadesAnimated hasPressed={hasPressed} />
      </AceCardDragged>
      <Image
        src="/images/balatro-image.png"
        width={970}
        height={600}
        alt="balatro-logo"
        className="absolute h-[600px] w-[970px] xl:h-[450px] xl:w-[700px]"
      />
    </div>
  );
}
