"use client";

import { Button } from "@/components/buttons/button";
import { JokerContainer } from "@/components/cards/joker-container";
import { useApp } from "@/hooks/app";
import * as motion from "motion/react-client";
import { useState } from "react";

interface StoreMenuProps {
  closeStore: () => void;
}

export function StoreMenu({ closeStore }: StoreMenuProps) {
  const { buyJoker, userDeck } = useApp();

  const [selectedJoker, setSelectedJoker] = useState<string | null>(null);

  console.log({ userDeck });

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
      className="bg-background grid h-full w-fit grid-cols-1 gap-10 justify-self-center rounded-2xl border-2 border-b-0 border-red-600 p-4 xl:gap-4"
    >
      <div className="bg-deepgreen-darkest flex flex-col space-y-2 rounded-xl p-4">
        <div className="relative flex flex-row space-x-2">
          <JokerContainer
            value="joker_mult"
            width={90}
            description="+4 Mult"
            price={4}
            showPrice
            disabled={userDeck.jokers.includes("joker_mult")}
            isSelected={selectedJoker === "joker_mult"}
            onClick={() => setSelectedJoker("joker_mult")}
          />

          <JokerContainer
            value="joker_impar"
            width={90}
            description="Cartas jogadas com valor Ímpar dará +31 Chips quando pontudas (A, 9, 7, 5, 3)"
            price={6}
            showPrice
            disabled={userDeck.jokers.includes("joker_impar")}
            isSelected={selectedJoker === "joker_impar"}
            onClick={() => setSelectedJoker("joker_impar")}
          />

          <JokerContainer
            value="joker_par"
            width={90}
            description="Cartas jogadas com valor Par dará +4 Mult quando pontuadas (10, 8, 6, 4, 2)"
            price={6}
            showPrice
            disabled={userDeck.jokers.includes("joker_par")}
            isSelected={selectedJoker === "joker_par"}
            onClick={() => setSelectedJoker("joker_par")}
          />
        </div>
        <div className="flex flex-row space-x-2">
          <JokerContainer
            value="joker_hearts"
            width={90}
            description="Cartas com naipe de Copas dará +3 Mult quando pontuadas"
            price={5}
            showPrice
            disabled={userDeck.jokers.includes("joker_hearts")}
            isSelected={selectedJoker === "joker_hearts"}
            onClick={() => setSelectedJoker("joker_hearts")}
          />

          <JokerContainer
            value="joker_diamonds"
            width={90}
            description="Cartas com naipe de Ouro dará +3 Mult quando pontuadas"
            price={5}
            showPrice
            disabled={userDeck.jokers.includes("joker_diamonds")}
            isSelected={selectedJoker === "joker_diamonds"}
            onClick={() => setSelectedJoker("joker_diamonds")}
          />
          <JokerContainer
            value="joker_spades"
            width={90}
            description="Cartas com naipe de Espada dará +3 Mult quando pontuadas"
            price={5}
            showPrice
            disabled={userDeck.jokers.includes("joker_spades")}
            isSelected={selectedJoker === "joker_spades"}
            onClick={() => setSelectedJoker("joker_spades")}
          />
        </div>
        <div className="flex flex-row space-x-2">
          <JokerContainer
            value="joker_clubs"
            width={90}
            description="Cartas com naipe de Paus dará +3 Mult quando pontuadas"
            price={5}
            showPrice
            disabled={userDeck.jokers.includes("joker_clubs")}
            isSelected={selectedJoker === "joker_clubs"}
            onClick={() => setSelectedJoker("joker_clubs")}
          />
        </div>

        <Button
          variant="secondary"
          className="w-full"
          onClick={() => selectedJoker && buyJoker(selectedJoker)}
        >
          Comprar
        </Button>
        <Button className="w-full" onClick={closeStore}>
          Começar rodada
        </Button>
      </div>

      {/* <div className="bg-deepgreen-darkest flex flex-col justify-between space-y-2 rounded-xl p-4">
        <div className="flex w-full flex-row items-center justify-between">
          <p className="text-4xl xl:text-3xl">Straight Flush</p>
          <Button size="lg" className="w-32 text-3xl">
            Aprimorar
          </Button>
        </div>
        <div className="flex w-full flex-row items-center justify-between">
          <p className="text-4xl xl:text-3xl">Quadra</p>
          <Button size="lg" className="w-32 text-3xl">
            Aprimorar
          </Button>
        </div>
        <div className="flex w-full flex-row items-center justify-between">
          <p className="text-4xl xl:text-3xl">Full House</p>
          <Button size="lg" className="w-32 text-3xl">
            Aprimorar
          </Button>
        </div>
        <div className="flex w-full flex-row items-center justify-between">
          <p className="text-4xl xl:text-3xl">Flush</p>
          <Button size="lg" className="w-32 text-3xl">
            Aprimorar
          </Button>
        </div>
        <div className="flex w-full flex-row items-center justify-between">
          <p className="text-4xl xl:text-3xl">Sequência</p>
          <Button size="lg" className="w-32 text-3xl">
            Aprimorar
          </Button>
        </div>
        <div className="flex w-full flex-row items-center justify-between">
          <p className="text-4xl xl:text-3xl">Trinca</p>
          <Button size="lg" className="w-32 text-3xl">
            Aprimorar
          </Button>
        </div>
        <div className="flex w-full flex-row items-center justify-between">
          <p className="text-4xl xl:text-3xl">Dois Pares</p>
          <Button size="lg" className="w-32 text-3xl">
            Aprimorar
          </Button>
        </div>
        <div className="flex w-full flex-row items-center justify-between">
          <p className="text-4xl xl:text-3xl">Par</p>
          <Button size="lg" className="w-32 text-3xl">
            Aprimorar
          </Button>
        </div>
        <div className="flex w-full flex-row items-center justify-between">
          <p className="text-4xl xl:text-3xl">Carta Alta</p>
          <Button size="lg" className="w-32 text-3xl">
            Aprimorar
          </Button>
        </div>
      </div> */}
    </motion.div>
  );
}
