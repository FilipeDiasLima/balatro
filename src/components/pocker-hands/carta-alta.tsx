"use client";

import { CardDancing } from "@/components/cards/card-dancing";
import { PockerHandTooltip } from "@/components/pocker-hands/pocker-hand-tooltip";
import { PockerHandTrigger } from "@/components/pocker-hands/pocker-hand-trigger";
import { useApp } from "@/hooks/app";
import Image from "next/image";
import { useState } from "react";

export function CartaAlta() {
  const { pockerHands } = useApp();
  const [open, setOpen] = useState(false);

  const pockerHand = pockerHands.find((hand) => hand.id === 9)!;

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
          description="Se a mão jogada não for uma das mãos acima, somente as cartas de classe mais alta pontuarão"
        >
          <CardDancing>
            <Image
              src="/images/spades/Ace_of_Spades.webp"
              alt="JackSpades"
              width={100}
              height={100}
            />
          </CardDancing>
          <CardDancing>
            <Image
              src="/images/diamonds/Queen_of_Diamonds.webp"
              alt="10Spades"
              width={60}
              height={100}
            />
          </CardDancing>
          <CardDancing>
            <Image
              src="/images/diamonds/9_of_Diamonds.webp"
              alt="QueenSpades"
              width={60}
              height={100}
            />
          </CardDancing>
          <CardDancing>
            <Image
              src="/images/clubs/4_of_Clubs.webp"
              alt="9nSpades"
              width={60}
              height={100}
            />
          </CardDancing>
          <CardDancing>
            <Image
              src="/images/diamonds/3_of_Diamonds.webp"
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
