"use client";

import { CardDancing } from "@/components/cards/card-dancing";
import { PockerHandTooltip } from "@/components/pocker-hands/pocker-hand-tooltip";
import { PockerHandTrigger } from "@/components/pocker-hands/pocker-hand-trigger";
import { useApp } from "@/hooks/app";
import Image from "next/image";
import { useState } from "react";

export function Trinca() {
  const { pockerHands } = useApp();
  const [open, setOpen] = useState(false);

  const pockerHand = pockerHands.find((hand) => hand.id === 6)!;

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
          description="3 cartas com a mesma classe. Elas podem ser jogadas com até 2 outras cartas não pontuadas"
        >
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
              src="/images/clubs/10_of_Clubs.webp"
              alt="JackSpades"
              width={100}
              height={100}
            />
          </CardDancing>
          <CardDancing>
            <Image
              src="/images/diamonds/10_of_Diamonds.webp"
              alt="QueenSpades"
              width={100}
              height={100}
            />
          </CardDancing>
          <CardDancing>
            <Image
              src="/images/hearts/6_of_Hearts.webp"
              alt="9nSpades"
              width={60}
              height={100}
            />
          </CardDancing>
          <CardDancing>
            <Image
              src="/images/diamonds/5_of_Diamonds.webp"
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
