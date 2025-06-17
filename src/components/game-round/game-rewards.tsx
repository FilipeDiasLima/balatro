"use client";

import { Button } from "@/components/buttons/button";
import { useApp } from "@/hooks/app";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function GameRewards() {
  const { blinds, gameRound, nextRound } = useApp();

  const [totalReward, setTotalReward] = useState(0);

  const selectedBlind = blinds.find(
    (blind) => blind.type === gameRound.blindSelected,
  );

  useEffect(() => {
    if (selectedBlind) {
      setTotalReward((selectedBlind.rewardAmount || 0) + gameRound.hands);
    }
  }, [gameRound.blindSelected, blinds]);

  return (
    <motion.div
      initial={{ y: 800 }}
      animate={{
        y: 0,
        transition: {
          type: "spring",
          duration: 0.2,
          bounce: 0.25,
        },
      }}
      className="bg-background border-deepgreen-darkest grid h-full w-full grid-cols-1 gap-10 justify-self-center rounded-t-2xl border-2 border-b-0 p-4 xl:gap-4"
    >
      <div className="bg-deepgreen-darkest flex flex-col items-center space-y-10 rounded-xl p-4">
        <Button variant="secondary" className="w-fit px-10" onClick={nextRound}>
          <p className="text-6xl text-shadow-none xl:text-5xl">
            Pegar a Grana: ${totalReward}
          </p>
        </Button>

        <div className="flex w-full flex-row items-center justify-between text-5xl xl:text-4xl">
          <p>Pontue pelo menos:</p>
          <p>{selectedBlind?.score}</p>
        </div>

        <div className="h-[1px] w-full bg-white" />

        <div className="flex w-full flex-row items-center justify-between text-3xl xl:text-2xl">
          <p>
            <span className="text-blue-main text-4xl xl:text-3xl">
              {gameRound.hands}
            </span>{" "}
            Mãos restantes ($1 cada)
          </p>
          <p className="text-yellow-main text-4xl xl:text-3xl">
            {"$".repeat(gameRound.hands)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
