"use client";

import { CardContainer } from "@/components/cards/card-container";
import { CardDancing } from "@/components/cards/card-dancing";
import { PockerHandTooltip } from "@/components/pocker-hands/pocker-hand-tooltip";
import { PockerHandTrigger } from "@/components/pocker-hands/pocker-hand-trigger";
import { useApp } from "@/hooks/app";
import { useState } from "react";

export function Flush() {
  const { pockerHands } = useApp();
  const [open, setOpen] = useState(false);

  const pockerHand = pockerHands.find((hand) => hand.id === 4)!;

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
        <PockerHandTooltip description="5 cartas com o mesmo naipe">
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
              naipe="hearts"
              value="King"
              width={100}
              height={100}
            />
          </CardDancing>
          <CardDancing>
            <CardContainer naipe="hearts" value="10" width={100} height={100} />
          </CardDancing>
          <CardDancing>
            <CardContainer naipe="hearts" value="5" width={100} height={100} />
          </CardDancing>
          <CardDancing>
            <CardContainer naipe="hearts" value="4" width={100} height={100} />
          </CardDancing>
        </PockerHandTooltip>
      )}
    </div>
  );
}
