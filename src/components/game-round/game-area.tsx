"use client";

import { JokerContainer } from "@/components/cards/joker-container";
import { FaceDownCardDragged } from "@/components/face-down-card-dragged";
import { BlindSelect } from "@/components/game-round/blind-select";
import { GameRewards } from "@/components/game-round/game-rewards";
import { PokerGame } from "@/components/game-round/pocker-game";
import { StoreMenu } from "@/components/game-round/store-menu";
import { useApp } from "@/hooks/app";
import { jokers } from "@/utils/jokers";
import { AnimatePresence, motion } from "framer-motion";

import Image from "next/image";

export function GameArea() {
  const {
    gameRound,
    jokerAnimation,
    userDeck,
    openStore,
    showReward,
    setOpenStore,
  } = useApp();

  const availableCards = userDeck.deck.map((deck) => {
    return deck.cards.filter((card) => !card.available);
  });

  const remainingCards =
    52 - availableCards.reduce((acc, cards) => acc + cards.length, 0);

  return (
    <div className="flex h-full w-full flex-col items-center justify-between pt-10">
      <section className="grid w-full grid-cols-6 gap-4 text-shadow-none">
        <div className="col-span-4 flex h-56 flex-col xl:h-48">
          <ul className="flex flex-1 flex-row items-center justify-between rounded-xl bg-black/20 p-4">
            <AnimatePresence mode="sync" initial={false}>
              {userDeck.jokers &&
                userDeck.jokers.map((joker) => (
                  <motion.li
                    key={joker}
                    layout
                    initial={{ opacity: 0, y: 400, x: -200, rotate: 145 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      x: 0,
                      rotate: 0,
                      scale: jokerAnimation.find(
                        (jokerP) => jokerP.value === joker,
                      )?.turn
                        ? 1.2
                        : 1,
                    }}
                    exit={{ opacity: 1, x: 1000, rotate: 145 }}
                    transition={{ type: "spring", duration: 0.2 }}
                  >
                    <JokerContainer
                      value={joker}
                      width={80}
                      showSellButton
                      showScore={
                        jokerAnimation.find((jokerP) => jokerP.value === joker)
                          ?.turn
                      }
                      description={
                        jokers.find((item) => item.value === joker)?.description
                      }
                    />
                  </motion.li>
                ))}
            </AnimatePresence>
          </ul>
          <p className="ml-2">{userDeck.jokers.length}/5</p>
        </div>

        <div className="col-span-2 flex h-56 flex-col xl:h-48">
          <div className="flex flex-1 items-center rounded-xl bg-black/20 p-4"></div>
          <p className="self-end">0/2</p>
        </div>
      </section>

      <section className="grid h-full w-full grid-cols-5 gap-5 xl:gap-1">
        <div className="col-span-4">
          {openStore ? (
            <StoreMenu closeStore={() => setOpenStore(false)} />
          ) : showReward ? (
            <GameRewards />
          ) : gameRound.blindSelected ? (
            <PokerGame />
          ) : (
            <BlindSelect />
          )}
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
