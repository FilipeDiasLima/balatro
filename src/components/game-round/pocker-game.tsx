"use client";

import { Button } from "@/components/buttons/button";
import { CardDragged } from "@/components/card-dragged";
import { CardContainer } from "@/components/cards/card-container";
import { useApp } from "@/hooks/app";
import { CardProps } from "@/interfaces/card";
import { getCardValue } from "@/utils/card-values";
import { getPockerHandByCards } from "@/utils/pocker-hands";
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
    setChipsAndMult,
    setNewScore,
  } = useApp();

  const [exitType, setExitType] = useState<"discard" | "play">("play");
  const [coutingScore, setCountingScore] = useState(false);
  const [cardsCounting, setCardsCounting] = useState<
    { card: CardProps; turn: boolean }[]
  >([]);

  const containerRef = useRef<HTMLUListElement>(null);

  function handleSelectHand() {
    if (!cardsSelected.length) return;
    setExitType("play");
    setTimeout(() => {
      handleDiscardCards({
        isPlay: true,
      });
      setCountingScore(true);
      const newCardsCounting = cardsSelected.map((card) => ({
        card,
        turn: false,
      }));
      setCardsCounting(newCardsCounting);
    }, 200);
  }

  function setDiscardCards() {
    if (!cardsSelected.length) return;
    setExitType("discard");
    setTimeout(() => {
      handleDiscardCards();
    }, 200);
  }

  function animateAcceptedCard(index: number) {
    setCardsCounting((prev) =>
      prev.map((item, idx) => ({
        ...item,
        turn: idx === index,
      })),
    );
    const currentCard = cardsCounting[index];
    if (currentCard) {
      setChipsAndMult("chips", getCardValue(currentCard.card.value));
    }
  }

  useEffect(() => {
    setExitType("discard");

    if (coutingScore && cardsCounting.length > 0) {
      const { acceptedCards } = getPockerHandByCards(
        cardsCounting.map((c) => c.card),
      );
      if (!acceptedCards) return;

      const isCardAccepted = (card: CardProps) =>
        acceptedCards.some(
          (ac) => ac.naipe === card.naipe && ac.value === card.value,
        );

      const indexesToAnimate = cardsCounting
        .map((item, idx) => (isCardAccepted(item.card) ? idx : -1))
        .filter((idx) => idx !== -1);

      let current = 0;
      if (indexesToAnimate.length === 0) return;

      // Delay antes do primeiro item
      const firstDelay = setTimeout(() => {
        animateAcceptedCard(indexesToAnimate[current]);

        const interval = setInterval(() => {
          current++;
          if (current < indexesToAnimate.length) {
            animateAcceptedCard(indexesToAnimate[current]);
          } else {
            clearInterval(interval);
            setTimeout(() => {
              setCardsCounting([]);
              clearInterval(interval);
              setCountingScore(false);
              setNewScore();
            }, 500);
          }
        }, 1000);
      }, 1000);

      return () => {
        clearTimeout(firstDelay);
      };
    }
  }, [coutingScore, cardsCounting.length]);

  useEffect(() => {
    if (roundHand.length < 8 && !coutingScore) {
      const timer = setTimeout(() => {
        getCardFromDeck(roundHand);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [roundHand, coutingScore]);

  return (
    <div className="grid-row-6 grid h-full w-full gap-2">
      <div className="row-span-4">
        <ul className="flex h-full w-full flex-row items-center justify-center space-x-10">
          <AnimatePresence mode="sync" initial={false}>
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
                      +{getCardValue(couting.card.value)}
                    </motion.p>
                  ) : null}

                  <motion.li
                    layout
                    initial={{ opacity: 1, y: 240 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      marginTop: couting.turn ? "-70px" : "0px",
                    }}
                    exit={{ opacity: 0.6, x: 1200, rotate: 145 }}
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
          </AnimatePresence>
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
                  initial={{ opacity: 0, y: 200, x: 1000, rotate: 145 }}
                  animate={{ opacity: 1, y: 0, x: 0, rotate: rotate }}
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
          disabled={coutingScore || !roundHand.length || gameRound.hands < 1}
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
