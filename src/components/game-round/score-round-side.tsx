"use client";

import { Button } from "@/components/buttons/button";
import { CardUI, CardUIContent } from "@/components/cards/card-ui";
import { CurrentStake } from "@/components/current-stake";
import { PockerHandsModal } from "@/components/modals/pocker-hands-modal";
import JumpingText from "@/components/texts/jumping-text";
import { useState } from "react";

export function ScoreRoundSide() {
  const cardPoint = 0;
  const multi = 0;

  const [openInfo, setOpenInfo] = useState(false);

  return (
    <div className="flex h-full w-full flex-col items-center justify-end space-y-4">
      <JumpingText
        text="Escolha seu próximo Blind"
        className="py-20 text-center text-5xl"
        startDelay={-0.5}
      />

      <CurrentStake />

      <CardUI className="">
        <header className="h-24">
          <p>Pontuação das cartas</p>
        </header>

        <main className="flex w-full flex-row space-x-4">
          <div className="bg-blue-main border-blue-darker flex flex-1 justify-end rounded-xl border-b-[5px] px-2 py-1">
            <p className="text-6xl">{cardPoint}</p>
          </div>

          <p className="text-red-main text-6xl">X</p>

          <div className="bg-red-main border-red-darker flex flex-1 justify-start rounded-xl border-b-[5px] px-2 py-1">
            <p className="text-6xl">{multi}</p>
          </div>
        </main>
      </CardUI>

      <section className="grid grid-cols-3 gap-4">
        <div className="flex flex-1 flex-col space-y-4">
          <Button
            className="w-full flex-1 p-2"
            onClick={() => setOpenInfo(true)}
          >
            <p className="text-center text-2xl leading-2">
              Informação <br /> <span className="text-xl">da Tentativa</span>
            </p>
          </Button>
          <Button variant="secondary" className="w-full flex-1 p-2">
            <p className="text-center text-3xl">Opções</p>
          </Button>
        </div>

        <div className="col-span-2 grid grid-cols-2 grid-rows-3 gap-x-2 gap-y-3">
          <CardUI className="col-span-1 gap-2 p-1 pt-3 pb-2">
            <p className="leading-2">Mãos</p>
            <CardUIContent className="px-2 py-4">
              <p className="text-blue-main text-5xl leading-2">0</p>
            </CardUIContent>
          </CardUI>
          <CardUI className="col-span-1 gap-2 p-1 pt-3 pb-2">
            <p className="leading-2">Descartes</p>
            <CardUIContent className="px-2 py-4">
              <p className="text-red-main text-5xl leading-2">0</p>
            </CardUIContent>
          </CardUI>

          <CardUI className="col-span-2 py-2">
            <CardUIContent className="px-2 py-4">
              <JumpingText
                text="$4"
                className="text-yellow-main text-6xl leading-2"
                repeatDelay={2}
              />
            </CardUIContent>
          </CardUI>

          <CardUI className="col-span-1 gap-2 p-1 pt-3 pb-2">
            <p className="leading-2">Aposta</p>
            <CardUIContent className="px-2 py-4">
              <p className="text-yellow-secondary text-center text-5xl leading-2">
                1 <span className="text-2xl leading-2 text-white">/ 8</span>
              </p>
            </CardUIContent>
          </CardUI>
          <CardUI className="col-span-1 gap-2 p-1 pt-3 pb-2">
            <p className="leading-2">da Rodada</p>
            <CardUIContent>
              <p className="text-yellow-secondary text-5xl leading-2">0</p>
            </CardUIContent>
          </CardUI>
        </div>
      </section>

      <PockerHandsModal open={openInfo} onOpenChange={setOpenInfo} />
    </div>
  );
}
