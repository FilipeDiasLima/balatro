"use client";

import { CardDancing } from "@/components/cards/card-dancing";
import { PockerHandTooltip } from "@/components/pocker-hands/pocker-hand-tooltip";
import { PockerHandTrigger } from "@/components/pocker-hands/pocker-hand-trigger";
import { useApp } from "@/hooks/app";
import Image from "next/image";
import { useState } from "react";

export function Quadra() {
  const { pockerHands } = useApp();
  const [open, setOpen] = useState(false);

  const pockerHand = pockerHands.find((hand) => hand.id === 2)!;

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
        <PockerHandTooltip description="4 cartas com a mesma claase. Elas podem ser jogadas com 1 outras carta não pontuada">
          <CardDancing>
            <Image
              src="/images/spades/Jack_of_Spades.webp"
              alt="QueenSpades"
              width={100}
              height={100}
            />
          </CardDancing>
          <CardDancing>
            <Image
              src="/images/hearts/Jack_of_Hearts.webp"
              alt="JackSpades"
              width={100}
              height={100}
            />
          </CardDancing>
          <CardDancing>
            <Image
              src="/images/clubs/Jack_of_Clubs.webp"
              alt="10Spades"
              width={100}
              height={100}
            />
          </CardDancing>
          <CardDancing>
            <Image
              src="/images/diamonds/Jack_of_Diamonds.webp"
              alt="9nSpades"
              width={100}
              height={100}
            />
          </CardDancing>
          <CardDancing>
            <Image
              src="/images/clubs/3_of_Clubs.webp"
              alt="3Clubs"
              width={60}
              height={100}
            />
          </CardDancing>
        </PockerHandTooltip>
      )}
    </div>
  );
}
