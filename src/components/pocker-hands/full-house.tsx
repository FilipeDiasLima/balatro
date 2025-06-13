"use client";

import { CardContainer } from "@/components/cards/card-container";
import { CardDancing } from "@/components/cards/card-dancing";
import { PockerHandTooltip } from "@/components/pocker-hands/pocker-hand-tooltip";
import { PockerHandTrigger } from "@/components/pocker-hands/pocker-hand-trigger";
import { useApp } from "@/hooks/app";
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
            <CardContainer
              naipe="hearts"
              value="King"
              width={100}
              height={100}
            />
          </CardDancing>
          <CardDancing>
            <CardContainer
              naipe="clubs"
              value="King"
              width={100}
              height={100}
            />
          </CardDancing>
          <CardDancing>
            <CardContainer
              naipe="diamonds"
              value="King"
              width={100}
              height={100}
            />
          </CardDancing>
          <CardDancing>
            <CardContainer naipe="spades" value="2" width={100} height={100} />
          </CardDancing>
          <CardDancing>
            <CardContainer
              naipe="diamonds"
              value="2"
              width={100}
              height={100}
            />
          </CardDancing>
        </PockerHandTooltip>
      )}
    </div>
  );
}
