"use client";

import { FaceDownCardDragged } from "@/components/face-down-card-dragged";
import { BlindSelect } from "@/components/game-round/blind-select";
import { PokerGame } from "@/components/game-round/pocker-game";
import { useApp } from "@/hooks/app";
import Image from "next/image";

export function GameArea() {
  const { gameRound, userDeck } = useApp();

  const availableCards = userDeck.deck.map((deck) => {
    return deck.cards.filter((card) => !card.available);
  });

  const remainingCards =
    52 - availableCards.reduce((acc, cards) => acc + cards.length, 0);

  return (
    <div className="flex h-full w-full flex-col items-center justify-between pt-10">
      <section className="grid w-full grid-cols-6 gap-4 text-shadow-none">
        <div className="col-span-4 flex h-56 flex-col xl:h-48">
          <div className="flex flex-1 flex-row items-center rounded-xl bg-black/20 p-4">
            Curingas
          </div>
          <p className="ml-2">0/5</p>
        </div>

        <div className="col-span-2 flex h-56 flex-col xl:h-48">
          <div className="flex flex-1 items-center rounded-xl bg-black/20 p-4">
            Espectrais
          </div>
          <p className="self-end">0/2</p>
        </div>
      </section>

      <section className="grid h-full w-full grid-cols-5 gap-5 xl:gap-1">
        <div className="col-span-4">
          {gameRound.blindSelected ? <PokerGame /> : <BlindSelect />}
        </div>
        <div className="flex w-[220px] flex-col items-end justify-end pb-10">
          <div className="relative">
            <FaceDownCardDragged className="absolute top-0 left-4 z-20">
              <Image
                src="/images/red-card-no-shadow.svg"
                width={300}
                height={300}
                alt="red-card-no-shadow"
                className="max-h-[405px] max-w-[140px] xl:max-h-[345px] xl:max-w-[120px]"
              />
            </FaceDownCardDragged>
            <Image
              src="/images/red-deck.svg"
              width={300}
              height={300}
              alt="red-deck"
              className="-z-10 max-h-[462px] max-w-[158px] xl:max-h-[402px] xl:max-w-[138px]"
            />
          </div>
          <p className="mr-4">{remainingCards}/52</p>
        </div>
      </section>
    </div>
  );
}
