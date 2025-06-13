"use client";

import { CardContainer } from "@/components/cards/card-container";
import { CardDancing } from "@/components/cards/card-dancing";
import { PockerHandTooltip } from "@/components/pocker-hands/pocker-hand-tooltip";
import { PockerHandTrigger } from "@/components/pocker-hands/pocker-hand-trigger";
import { useApp } from "@/hooks/app";
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
            <CardContainer naipe="spades" value="10" width={100} height={100} />
          </CardDancing>
          <CardDancing>
            <CardContainer naipe="clubs" value="10" width={100} height={100} />
          </CardDancing>
          <CardDancing>
            <CardContainer
              naipe="diamonds"
              value="10"
              width={100}
              height={100}
            />
          </CardDancing>
          <CardDancing>
            <CardContainer naipe="hearts" value="6" width={60} height={100} />
          </CardDancing>
          <CardDancing>
            <CardContainer naipe="diamonds" value="5" width={60} height={100} />
          </CardDancing>
        </PockerHandTooltip>
      )}
    </div>
  );
}
