"use client";

import { CardContainer } from "@/components/cards/card-container";
import { CardDancing } from "@/components/cards/card-dancing";
import { PockerHandTooltip } from "@/components/pocker-hands/pocker-hand-tooltip";
import { PockerHandTrigger } from "@/components/pocker-hands/pocker-hand-trigger";
import { useApp } from "@/hooks/app";
import { useState } from "react";

export function StraightFlush() {
  const { pockerHands } = useApp();
  const [open, setOpen] = useState(false);

  const straightFlush = pockerHands.find((hand) => hand.id === 1)!;

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  return (
    <div className="relative flex w-full flex-col items-center">
      <PockerHandTrigger
        chips={straightFlush.chips}
        level={straightFlush.level}
        mult={straightFlush.mult}
        name={straightFlush.name}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      {open && (
        <PockerHandTooltip description="5 cartas em sequência {classes consecutivas} com todas as cartas tendo o mesmo naipe">
          <CardDancing>
            <CardContainer
              naipe="spades"
              value="Queen"
              width={100}
              height={100}
            />
          </CardDancing>
          <CardDancing>
            <CardContainer
              naipe="spades"
              value="Jack"
              width={100}
              height={100}
            />
          </CardDancing>
          <CardDancing>
            <CardContainer naipe="spades" value="10" width={100} height={100} />
          </CardDancing>
          <CardDancing>
            <CardContainer naipe="spades" value="9" width={100} height={100} />
          </CardDancing>
          <CardDancing>
            <CardContainer naipe="spades" value="8" width={100} height={100} />
          </CardDancing>
        </PockerHandTooltip>
      )}
    </div>
  );
}
