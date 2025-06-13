"use client";

import { CardUI, CardUIContent } from "@/components/cards/card-ui";
import { useApp } from "@/hooks/app";
import Image from "next/image";
import { useEffect, useState } from "react";

export function CurrentStake() {
  const { gameRound } = useApp();

  const [currentScore, setCurrentScore] = useState(gameRound.currentScore ?? 0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScore(gameRound.currentScore);
    }, 1000);

    return () => clearTimeout(timer);
  }, [gameRound.currentScore]);

  return (
    <CardUI className="flex-row p-2">
      <p className="text-2xl leading-5">
        Pontuação <br />
        da Rodada
      </p>
      <CardUIContent>
        <Image
          src="/images/white-stake.webp"
          alt="whiteStake"
          width={30}
          height={30}
        />
        <p className="text-5xl">{currentScore}</p>
      </CardUIContent>
    </CardUI>
  );
}
