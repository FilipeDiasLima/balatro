"use client";

import { CardContainer } from "@/components/cards/card-container";
import { CardDancing } from "@/components/cards/card-dancing";
import { PockerHandTooltip } from "@/components/pocker-hands/pocker-hand-tooltip";
import { PockerHandTrigger } from "@/components/pocker-hands/pocker-hand-trigger";
import { useApp } from "@/hooks/app";
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
            <CardContainer
              naipe="hearts"
              value="Ace"
              width={100}
              height={100}
            />
          </CardDancing>
          <CardDancing>
            <CardContainer
              naipe="diamonds"
              value="Ace"
              width={100}
              height={100}
            />
          </CardDancing>
          <CardDancing>
            <CardContainer
              naipe="clubs"
              value="Queen"
              width={60}
              height={100}
            />
          </CardDancing>
          <CardDancing>
            <CardContainer naipe="hearts" value="4" width={100} height={100} />
          </CardDancing>
          <CardDancing>
            <CardContainer naipe="clubs" value="4" width={100} height={100} />
          </CardDancing>
        </PockerHandTooltip>
      )}
    </div>
  );
}
