"use client";

import { Button } from "@/components/buttons/button";
import { CardDragged } from "@/components/card-dragged";
import { CardContainer } from "@/components/cards/card-container";
import { useApp } from "@/hooks/app";
import { CardProps } from "@/interfaces/card";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function PokerGame() {
  const {
    roundHand,
    gameRound,
    cardsSelected,
    getCardFromDeck,
    handleDiscardCards,
    handleCardClick,
  } = useApp();

  const [exitType, setExitType] = useState<"discard" | "play">("play");
  const [coutingScore, setCountingScore] = useState(false);
  const [cardsCounting, setCardsCounting] = useState<
    { card: CardProps; turn: boolean }[]
  >([]);

  const containerRef = useRef<HTMLUListElement>(null);

  function handleSelectHand() {
    setExitType("play");
    setTimeout(() => {
      setCountingScore(true);
      const newCardsCounting = cardsSelected.map((card) => ({
        card,
        turn: false,
      }));
      setCardsCounting(newCardsCounting);
    }, 200);
  }

  function setDiscardCards() {
    setExitType("discard");
    setTimeout(() => {
      handleDiscardCards();
    }, 200);
  }

  function animateCardsCounting() {
    let current = 0;
    setCardsCounting((prev) =>
      prev.map((item, idx) => ({ ...item, turn: idx === 0 })),
    );
    const interval = setInterval(() => {
      setCardsCounting((prev) =>
        prev.map((item, idx) => ({
          ...item,
          turn: idx === current,
        })),
      );
      current++;
      if (current >= cardsCounting.length - 1) {
        clearInterval(interval);
        setTimeout(() => {
          setCardsCounting((prev) =>
            prev.map((item) => ({ ...item, turn: false })),
          );
        }, 1000);
      }
    }, 1000);

    setTimeout(
      () => {
        setCardsCounting([]);
        setCountingScore(false);
      },
      1000 * cardsCounting.length + 1000,
    );
  }

  useEffect(() => {
    if (coutingScore && cardsCounting.length > 0) {
      const timer = setTimeout(() => {
        animateCardsCounting();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [coutingScore]);

  useEffect(() => {
    if (roundHand.length < 8) {
      const timer = setTimeout(() => {
        getCardFromDeck(roundHand);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [roundHand]);

  console.log({ roundHand });

  return (
    <div className="grid-row-6 grid h-full w-full gap-2">
      <div className="row-span-4">
        <ul className="flex h-full w-full flex-row items-center justify-center space-x-10">
          {coutingScore &&
            cardsCounting.map((couting, index) => (
              <div className="relative flex justify-center" key={index}>
                {couting.turn ? (
                  <motion.p
                    className="absolute -top-20 text-5xl xl:text-4xl"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: -50 }}
                    exit={{ opacity: 0, y: 0 }}
                  >
                    +
                    {couting.card.value === "Ace"
                      ? "1"
                      : ["Jack", "Queen", "King"].includes(couting.card.value)
                        ? "10"
                        : couting.card.value}
                  </motion.p>
                ) : null}

                <motion.li
                  initial={{ opacity: 1, y: 240 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    marginTop: couting.turn ? "-70px" : "0px",
                  }}
                  exit={{ opacity: 1, x: 1500 }}
                  transition={{ type: "spring", duration: 0.3 }}
                  className="relative flex justify-center"
                >
                  <CardContainer
                    naipe={couting.card.naipe}
                    value={couting.card.value}
                    className="max-h-[345px] max-w-[120px] xl:max-h-[288px] xl:max-w-[100px]"
                  />
                </motion.li>
              </div>
            ))}
        </ul>
      </div>

      <div className="flex w-full flex-col items-center justify-end">
        <ul
          ref={containerRef}
          className="relative flex min-h-36 w-full flex-row items-center justify-center -space-x-4 rounded-xl bg-black/20 pl-2"
        >
          <AnimatePresence mode="sync" initial={false}>
            {roundHand.map((card, index) => {
              const length = roundHand.length;
              const centerLeft = Math.floor((length - 1) / 2);
              const centerRight = Math.ceil((length - 1) / 2);
              const distanceFromCenter = Math.min(
                Math.abs(index - centerLeft),
                Math.abs(index - centerRight),
              );
              const maxRotation = 10;
              const step = length > 1 ? maxRotation / (centerRight || 1) : 0;
              const rotate = (index - centerLeft) * step;

              const marginTop =
                -(12 * (centerRight - distanceFromCenter)) -
                (cardsSelected.includes(card) ? 100 : 0);

              if (
                coutingScore &&
                cardsSelected.some(
                  (cardSelected) =>
                    cardSelected.naipe === card.naipe &&
                    cardSelected.value === card.value,
                )
              ) {
                return null;
              }

              return (
                <motion.li
                  key={index}
                  layout
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0, rotate: rotate }}
                  exit={
                    exitType === "discard"
                      ? { opacity: 1, x: 1000, rotate: 145 }
                      : { opacity: 0, y: -150 }
                  }
                  transition={{ type: "spring", duration: 0.2 }}
                  style={{
                    transform: `rotate(${rotate}deg)`,
                    marginTop: `${marginTop}px`,
                    transition: "margin-top 0.2s",
                  }}
                >
                  <CardDragged
                    onClick={() => {
                      !coutingScore && handleCardClick(card);
                    }}
                  >
                    <CardContainer
                      naipe={card.naipe}
                      value={card.value}
                      className="max-h-[345px] max-w-[120px] xl:max-h-[288px] xl:max-w-[100px]"
                    />
                  </CardDragged>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>

        <p>{roundHand.length}/8</p>
      </div>

      <div className="flex flex-row items-center justify-center space-x-4">
        <Button
          className="bg-blue-main hover:bg-blue-darker flex h-24 items-start pt-4"
          disabled={coutingScore}
          onClick={handleSelectHand}
        >
          <p className="text-shadow-none">Jogar mão</p>
        </Button>

        <Button
          className="flex h-24 items-start pt-4"
          onClick={setDiscardCards}
          disabled={gameRound.discards < 1 || coutingScore}
        >
          <p className="text-shadow-none">Descartar</p>
        </Button>
      </div>
    </div>
  );
}
