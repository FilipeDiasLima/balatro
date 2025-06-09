"use client";

import { CardDancing } from "@/components/cards/card-dancing";
import { PockerHandTooltip } from "@/components/pocker-hands/pocker-hand-tooltip";
import { PockerHandTrigger } from "@/components/pocker-hands/pocker-hand-trigger";
import { useApp } from "@/hooks/app";
import Image from "next/image";
import { useState } from "react";

export function FullHouse() {
  const { pockerHands } = useApp();
  const [open, setOpen] = useState(false);

  const pockerHand = pockerHands.find((hand) => hand.id === 3)!;

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
        <PockerHandTooltip description="Uma Trinca e um Par">
          <CardDancing>
            <Image
              src="/images/hearts/King_of_Hearts.webp"
              alt="QueenSpades"
              width={100}
              height={100}
            />
          </CardDancing>
          <CardDancing>
            <Image
              src="/images/clubs/King_of_Clubs.webp"
              alt="JackSpades"
              width={100}
              height={100}
            />
          </CardDancing>
          <CardDancing>
            <Image
              src="/images/diamonds/King_of_Diamonds.webp"
              alt="10Spades"
              width={100}
              height={100}
            />
          </CardDancing>
          <CardDancing>
            <Image
              src="/images/spades/2_of_Spades.webp"
              alt="9nSpades"
              width={100}
              height={100}
            />
          </CardDancing>
          <CardDancing>
            <Image
              src="/images/diamonds/2_of_Diamonds.webp"
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
