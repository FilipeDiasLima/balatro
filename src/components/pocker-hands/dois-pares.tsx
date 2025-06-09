"use client";

import { CardDancing } from "@/components/cards/card-dancing";
import { PockerHandTooltip } from "@/components/pocker-hands/pocker-hand-tooltip";
import { PockerHandTrigger } from "@/components/pocker-hands/pocker-hand-trigger";
import { useApp } from "@/hooks/app";
import Image from "next/image";
import { useState } from "react";

export function DoisPares() {
  const { pockerHands } = useApp();
  const [open, setOpen] = useState(false);

  const pockerHand = pockerHands.find((hand) => hand.id === 7)!;

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  return (
    <div className="relative flex w-full flex-col items-center">
      <PockerHandTrigger
        chips={pockerHand.chips}
        level={pockerHand.level}
        mult={pockerHand.mult}
        name={pockerHand.name}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      {open && (
        <PockerHandTooltip
          side="top"
          description="2 pares de cartas com classes diferentes, podem ser jogadas com 1 outra carta não pontuada"
        >
          <CardDancing>
            <Image
              src="/images/hearts/Ace_of_Hearts.webp"
              alt="JackSpades"
              width={100}
              height={100}
            />
          </CardDancing>
          <CardDancing>
            <Image
              src="/images/diamonds/Ace_of_Diamonds.webp"
              alt="10Spades"
              width={100}
              height={100}
            />
          </CardDancing>
          <CardDancing>
            <Image
              src="/images/clubs/Queen_of_Clubs.webp"
              alt="QueenSpades"
              width={60}
              height={100}
            />
          </CardDancing>
          <CardDancing>
            <Image
              src="/images/hearts/4_of_Hearts.webp"
              alt="9nSpades"
              width={100}
              height={100}
            />
          </CardDancing>
          <CardDancing>
            <Image
              src="/images/clubs/4_of_Clubs.webp"
              alt="3Clubs"
              width={100}
              height={100}
            />
          </CardDancing>
        </PockerHandTooltip>
      )}
    </div>
  );
}
