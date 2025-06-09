"use client";

import { CardDancing } from "@/components/cards/card-dancing";
import { PockerHandTooltip } from "@/components/pocker-hands/pocker-hand-tooltip";
import { PockerHandTrigger } from "@/components/pocker-hands/pocker-hand-trigger";
import { useApp } from "@/hooks/app";
import Image from "next/image";
import { useState } from "react";

export function StraightFlush() {
  const { pockerHands } = useApp();
  const [open, setOpen] = useState(false);

  const straightFlush = pockerHands.find((hand) => hand.id === 1)!;

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  return (
    <div className="relative flex w-full flex-col items-center">
      <PockerHandTrigger
        chips={straightFlush.chips}
        level={straightFlush.level}
        mult={straightFlush.mult}
        name={straightFlush.name}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      {open && (
        <PockerHandTooltip description="5 cartas em sequência {classes consecutivas} com todas as cartas tendo o mesmo naipe">
          <CardDancing>
            <Image
              src="/images/spades/Queen_of_Spades.webp"
              alt="QueenSpades"
              width={100}
              height={100}
            />
          </CardDancing>
          <CardDancing>
            <Image
              src="/images/spades/Jack_of_Spades.webp"
              alt="JackSpades"
              width={100}
              height={100}
            />
          </CardDancing>
          <CardDancing>
            <Image
              src="/images/spades/10_of_Spades.webp"
              alt="10Spades"
              width={100}
              height={100}
            />
          </CardDancing>
          <CardDancing>
            <Image
              src="/images/spades/9_of_Spades.webp"
              alt="9nSpades"
              width={100}
              height={100}
            />
          </CardDancing>
          <CardDancing>
            <Image
              src="/images/spades/8_of_Spades.webp"
              alt="8Spades"
              width={100}
              height={100}
            />
          </CardDancing>
        </PockerHandTooltip>
      )}
    </div>
  );
}
