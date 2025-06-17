"use client";

import { GameMenu } from "@/app/components/game-menu";
import { RedDeckGame } from "@/app/components/red-deck-game";
import BackgroundAnimated from "@/components/backgrounds/background-animated";
import { CardUI, CardUIContent } from "@/components/cards/card-ui";
import { useApp } from "@/hooks/app";

export default function Home() {
  const { gameStarted } = useApp();

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center">
      <BackgroundAnimated />
      <div className="flex h-screen w-full flex-col items-center justify-center overflow-hidden sm:hidden md:hidden">
        {!gameStarted ? <GameMenu /> : <RedDeckGame />}
      </div>
      <CardUI className="hidden w-[320px] sm:block md:block">
        <CardUIContent className="p-2 text-center">
          Desculpe, não é possível jogar no celular ou tablet. Por favor, acesse
          o jogo em um computador.
        </CardUIContent>
      </CardUI>
    </main>
  );
}
