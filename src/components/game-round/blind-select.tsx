"use client";

import { DefaultBlind } from "@/components/blinds/default-blind";
import { useState } from "react";

export function BlindSelect() {
  const [blindSelected, setBlindSelected] = useState<"small" | "big" | "boss">(
    "small",
  );

  function handleIgnoreBlind(blind: "small" | "big") {
    setBlindSelected(blind === "small" ? "big" : "boss");
  }

  return (
    <div className="grid h-full w-full grid-cols-3 items-end gap-8">
      <DefaultBlind
        blindSelected={blindSelected}
        blind="small"
        onSkip={handleIgnoreBlind}
        rewardAmout={3}
        tag="juggle"
        score={300}
      />
      <DefaultBlind
        blindSelected={blindSelected}
        blind="big"
        onSkip={handleIgnoreBlind}
        rewardAmout={4}
        tag="investment"
        score={450}
      />
      <DefaultBlind
        blindSelected={blindSelected}
        blind="boss"
        bossName="O Safado"
        rewardAmout={5}
        score={600}
      />
    </div>
  );
}
