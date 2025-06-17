"use client";

import { Button } from "@/components/buttons/button";
import { FaceDownCardDragged } from "@/components/face-down-card-dragged";
import { Modal } from "@/components/modals/modal";
import { TriangleJumping } from "@/components/triangule-jumping";
import { useApp } from "@/hooks/app";
import Image from "next/image";
import { useRef, useState } from "react";

interface ChooseDeckModalProps {
  open?: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChooseDeckModal({
  open = false,
  onOpenChange,
}: ChooseDeckModalProps) {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const { setGameStarted, resetGame } = useApp();

  const [profileSelected, setProfileSelected] = useState(2);

  function handleStartGame() {
    if (profileSelected === 1) {
      resetGame();
    }
    setTimeout(() => {
      setGameStarted(true);
    }, 500);
  }

  return (
    <Modal
      open={open}
      className="flex max-w-fit flex-col items-center"
      ref={constraintsRef}
    >
      <div className="flex w-full flex-col items-center space-y-10 px-20">
        <div className="flex flex-row items-center justify-center space-x-2">
          <div className="relative flex justify-center">
            {profileSelected === 1 && <TriangleJumping />}
            <Button
              className="w-fit px-4"
              onClick={() => setProfileSelected(1)}
            >
              Nova tentativa
            </Button>
          </div>
          <div className="relative flex justify-center">
            {profileSelected === 2 && <TriangleJumping />}
            <Button onClick={() => setProfileSelected(2)}>Continuar</Button>
          </div>
          <div className="relative flex justify-center">
            {profileSelected === 3 && <TriangleJumping />}
            <Button onClick={() => setProfileSelected(3)}>Desafios</Button>
          </div>
        </div>
        <section className="grid w-full grid-cols-8 gap-4">
          {profileSelected === 1 ? (
            <Button className="h-full w-fit justify-self-end px-6 text-4xl">
              {"<"}
            </Button>
          ) : (
            <div />
          )}

          <div className="bg-deepgreen-darkest shadow-dark-menu-sm col-span-6 flex w-full flex-row rounded-xl p-4">
            <div className="relative z-10 w-[160px]">
              <FaceDownCardDragged>
                <Image
                  src="/images/red-card-no-shadow.svg"
                  width={140}
                  height={200}
                  alt="red-card-no-shadow"
                />
              </FaceDownCardDragged>
              <Image
                src="/images/red-deck-menu.svg"
                width={146}
                height={200}
                alt="red-deck"
                className="absolute top-0 left-0 -z-[1]"
              />
            </div>

            <div className="bg-background flex h-[210px] w-full flex-1 flex-col items-center space-y-2 rounded-lg p-4">
              <h1 className="text-center text-4xl">Baralho vermelho</h1>
              <div className="flex h-full w-full items-center justify-center rounded-lg bg-white p-4">
                <p className="text-background text-center text-2xl text-shadow-none">
                  <span className="text-red-main">+1</span> descarte <br /> em
                  cada rodada
                </p>
              </div>
            </div>
          </div>
          {profileSelected === 1 ? (
            <Button className="h-full w-fit px-6 text-4xl">{">"}</Button>
          ) : (
            <div />
          )}
        </section>

        <section className="grid w-full grid-cols-8 gap-4">
          <Button
            disabled
            className="no-shadow text-background h-full w-fit justify-self-end px-6 text-4xl"
          >
            {"<"}
          </Button>

          <div className="bg-deepgreen-darkest col-span-6 flex h-full w-full flex-row items-center space-x-4 rounded-xl px-4 py-2">
            <div className="relative flex flex-row items-center">
              <p className="text-background absolute -left-8 -rotate-90 text-3xl text-shadow-none">
                Aposta
              </p>
              <Image
                src="/images/white-stake.webp"
                alt="white-stake"
                width={60}
                height={60}
                className="ml-6"
              />
            </div>

            <div className="bg-background flex w-full flex-1 flex-col items-center space-y-2 rounded-lg p-2">
              <h2 className="text-center text-2xl">Aposta Branca</h2>
              <div className="flex h-full w-full items-center justify-center rounded-lg bg-white p-4">
                <p className="text-background text-center text-2xl text-shadow-none">
                  Dificuldade Base
                </p>
              </div>
            </div>
          </div>

          <Button
            disabled
            className="no-shadow text-background h-full w-fit px-6 text-4xl"
          >
            {">"}
          </Button>
        </section>

        <Button
          className="bg-blue-main hover:bg-blue-darker mt-14 h-24 w-[60%] text-6xl uppercase"
          onClick={handleStartGame}
        >
          jogar
        </Button>
      </div>
      <Button
        className="mt-4 w-full"
        variant="secondary"
        size="lg"
        onClick={() => onOpenChange(false)}
      >
        Voltar
      </Button>
    </Modal>
  );
}
