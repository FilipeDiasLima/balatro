"use client";

import { DefaultBlind } from "@/components/blinds/default-blind";
import { useApp } from "@/hooks/app";

export function BlindSelect() {
  const { blinds, blindSelected, skipBlind, setBlindSelected, chooseBlind } =
    useApp();

  function handleSkipBlind(blind: "small" | "big") {
    setBlindSelected(blind === "small" ? "big" : "boss");
    skipBlind(blind);
  }

  return (
    <div className="grid h-full w-full grid-cols-3 items-end gap-8 xl:gap-4">
      {blinds &&
        blinds.length > 0 &&
        blinds.map((blind) => (
          <DefaultBlind
            key={blind.type}
            blindSelected={blindSelected}
            blind={blind.type}
            onSkip={handleSkipBlind}
            rewardAmout={blind.rewardAmount}
            tag={blind.tag}
            score={blind.score}
            skipped={blind.skipped}
            finished={blind.finished}
            onChoose={() => chooseBlind(blind.type)}
          />
        ))}
    </div>
  );
}
