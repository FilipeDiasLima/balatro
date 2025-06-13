"use client";

import { GameMenu } from "@/app/components/game-menu";
import { RedDeckGame } from "@/app/components/red-deck-game";
import BackgroundAnimated from "@/components/backgrounds/background-animated";
import { useApp } from "@/hooks/app";

export default function Home() {
  const { gameStarted } = useApp();

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      <BackgroundAnimated />
      {!gameStarted ? <GameMenu /> : <RedDeckGame />}
    </main>
  );
}
