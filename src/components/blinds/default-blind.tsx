"use client";

import { Button } from "@/components/buttons/button";
import JumpingText from "@/components/texts/jumping-text";
import { cn } from "@/lib/utils";
import * as motion from "motion/react-client";
import Image from "next/image";

interface DefaultBlindProps {
  blind: "small" | "big" | "boss";
  bossName?: string;
  blindSelected?: "small" | "big" | "boss";
  score: number;
  rewardAmout: number;
  tag?: string;
  finished?: boolean;
  skipped?: boolean;
  onSkip?: (blind: "small" | "big") => void;
  onChoose: () => void;
}

export function DefaultBlind({
  blindSelected,
  blind,
  score,
  rewardAmout,
  bossName = "Chefe",
  finished = false,
  skipped = false,
  tag,
  onSkip,
  onChoose,
}: DefaultBlindProps) {
  const selected = blindSelected === blind;

  return (
    <motion.div
      initial={{ y: 800 }}
      animate={{
        y: 0,
        height: selected ? "100%" : "90%",
        transition: {
          type: "spring",
          duration: 0.2,
          bounce: 0.25,
        },
      }}
      className={cn(
        "bg-background relative flex w-full flex-col items-center overflow-hidden rounded-t-3xl p-2",
        blind === "small"
          ? "border-blue-darker"
          : blind === "big"
            ? "border-[#a56c00]"
            : "border-[#750a0a]",
        selected ? "border-8 border-b-0" : "border-4 border-b-0",
        blind === "boss" && "bg-[#452323]",
      )}
    >
      {!selected && (
        <div className="absolute -top-2 flex h-full w-full justify-center bg-gray-600/50">
          {skipped && (
            <JumpingText
              className="mt-44 -rotate-[30deg] text-7xl uppercase xl:text-6xl"
              text="Ignorado(a)"
            />
          )}
          {finished && (
            <JumpingText
              className="mt-44 -rotate-[30deg] text-6xl uppercase xl:text-5xl"
              text="Derrotado(a)"
            />
          )}
        </div>
      )}

      <section className="flex w-full flex-col items-center gap-4 rounded-2xl border-4 border-[#395054] bg-[#2c3d40] p-4">
        <Button
          variant="secondary"
          className="w-full rounded-2xl text-4xl xl:h-11 xl:text-3xl"
          onClick={onChoose}
        >
          Selecionar
        </Button>

        <div
          className={cn(
            "w-full rounded-2xl border-b-6",
            blind === "small"
              ? "border-[#122156]"
              : blind === "big"
                ? "border-[#5a4a25]"
                : "border-[#340404]",
          )}
        >
          <div
            className={cn(
              "w-full rounded-2xl border-4 px-4 py-0 text-center text-4xl",
              blind === "small"
                ? "border-blue-darker bg-blue-deep"
                : blind === "big"
                  ? "border-[#a56c00] bg-[#6a4200]"
                  : "border-[#750a0a] bg-[#452323]",
            )}
          >
            <JumpingText
              className="xl:text-3xl"
              text={
                blind === "small"
                  ? "Small Blind"
                  : blind === "big"
                    ? "Big Blind"
                    : bossName
              }
              y={[0, -2, 0]}
            />
          </div>
        </div>

        <div
          className={cn(
            "shadow-dark-menu-sm flex h-28 w-28 items-center justify-center rounded-full border-b-4 xl:h-20 xl:w-20",
            blind === "small"
              ? "border-[#122156] bg-[#2240a3]"
              : blind === "big"
                ? "border-[#ac751a] bg-[#df9822]"
                : "border-[#632C2D] bg-[#9b0d0d]",
            selected && "border-t-1 border-t-gray-300",
          )}
        >
          <p
            className={cn(
              "text-center text-4xl leading-7 uppercase text-shadow-none xl:text-2xl xl:leading-5",
              blind === "small"
                ? "text-white"
                : blind === "big"
                  ? "text-background"
                  : "text-[#4f0707]",
            )}
          >
            {blind}
            <br />
            BLIND
          </p>
        </div>

        {blind === "boss" && (
          <p className="text-center leading-4">
            Os pontos serão dividos pela metade.
          </p>
        )}

        <div className="bg-deepgreen-darkest shadow-dark-menu-sm flex w-full flex-col items-center justify-center space-y-2 rounded-2xl p-2">
          <p className="leading-4 xl:text-xl">Pontue pelo menos</p>
          <div className="flex flex-row items-center justify-center gap-2">
            <Image
              src="/images/white-stake.webp"
              alt="white-stake"
              width={40}
              height={40}
            />
            <p className="text-red-main text-5xl leading-7">{score}</p>
          </div>
          <p className="text-3xl leading-4 xl:text-[26px] xl:leading-3">
            Recompensa:{" "}
            <span className="text-yellow-main">{"$".repeat(rewardAmout)}+</span>
          </p>
        </div>
      </section>

      {blind !== "boss" && tag && onSkip && !skipped && (
        <p className="text-4xl">ou</p>
      )}

      {blind !== "boss" && tag && onSkip && !skipped && (
        <div className="bg-deepgreen-darkest flex w-fit flex-row items-center justify-center space-x-2 rounded-2xl p-1 pb-2">
          <div>
            <Image
              src={`/images/tags/${tag}-tag.webp`}
              alt={`${tag} tag`}
              width={60}
              height={60}
            />
          </div>
          <Button
            onClick={() => onSkip(blind)}
            className="shadow-dark-menu-sm xl:text-2xl"
          >
            Ignorar Blind
          </Button>
        </div>
      )}

      {blind === "boss" && (
        <div className="mt-4 flex w-fit flex-col items-center justify-center space-y-2 rounded-xl bg-black/20 px-1 py-2">
          <JumpingText
            text="Aumentar a Aposta"
            className="text-3xl leading-4 xl:text-2xl xl:leading-3"
          />
          <p className="text-xl leading-5">Aumentar todos os Blinds</p>
          <p className="text-3xl leading-4 xl:text-2xl xl:leading-3">
            Atualizar Blinds
          </p>
        </div>
      )}
    </motion.div>
  );
}
