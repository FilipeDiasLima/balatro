"use client";

import { CardContainer } from "@/components/cards/card-container";
import { CardDancing } from "@/components/cards/card-dancing";
import { PockerHandTooltip } from "@/components/pocker-hands/pocker-hand-tooltip";
import { PockerHandTrigger } from "@/components/pocker-hands/pocker-hand-trigger";
import { useApp } from "@/hooks/app";
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
            <CardContainer
              naipe="spades"
              value="Jack"
              width={100}
              height={100}
            />
          </CardDancing>
          <CardDancing>
            <CardContainer
              naipe="hearts"
              value="Jack"
              width={100}
              height={100}
            />
          </CardDancing>
          <CardDancing>
            <CardContainer
              naipe="clubs"
              value="Jack"
              width={100}
              height={100}
            />
          </CardDancing>
          <CardDancing>
            <CardContainer
              naipe="diamonds"
              value="Jack"
              width={100}
              height={100}
            />
          </CardDancing>
          <CardDancing>
            <CardContainer naipe="clubs" value="3" width={60} height={100} />
          </CardDancing>
        </PockerHandTooltip>
      )}
    </div>
  );
}
