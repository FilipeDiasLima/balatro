"use client";

import JumpingText from "@/components/texts/jumping-text";
import { useApp } from "@/hooks/app";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";

export function BlindHeader() {
  const { gameRound, blinds } = useApp();

  const blind = blinds.find((blind) => blind.type === gameRound.blindSelected);

  return (
    <motion.div className="bg-deepgreen-darkest flex w-full flex-col space-y-2 overflow-hidden rounded-2xl p-1">
      <div
        className={cn(
          "flex w-full items-center justify-center rounded-xl",
          blind?.type === "small"
            ? "bg-[#275BA1]"
            : blind?.type === "big"
              ? "bg-[#946317]"
              : "bg-[#941717]",
        )}
      >
        <JumpingText className="text-4xl" text={blind?.name ?? ""} />
      </div>
      <div
        className={cn(
          "flex w-full flex-col items-center justify-center space-y-2 rounded-xl p-3",
          blind?.type === "small"
            ? "bg-[#1B3A53]"
            : blind?.type === "big"
              ? "bg-[#483D1C]"
              : "bg-[#481C1C]",
        )}
      >
        <div className="flex w-full flex-row space-x-2">
          <div
            className={cn(
              "shadow-dark-menu-sm flex h-28 w-28 items-center justify-center rounded-full border-b-4 xl:h-20 xl:w-20",
              blind?.type === "small"
                ? "border-[#122156] bg-[#2240a3]"
                : blind?.type === "big"
                  ? "border-[#ac751a] bg-[#df9822]"
                  : "border-[#632C2D] bg-[#9b0d0d]",
            )}
          >
            <p
              className={cn(
                "text-center text-4xl leading-7 uppercase text-shadow-none xl:text-2xl xl:leading-5",
                blind?.type === "small"
                  ? "text-white"
                  : blind?.type === "big"
                    ? "text-background"
                    : "text-[#4f0707]",
              )}
            >
              {blind?.type}
              <br />
              BLIND
            </p>
          </div>

          <div className="bg-deepgreen-darkest shadow-dark-menu-sm flex w-full flex-1 flex-col items-center justify-center space-y-2 rounded-2xl p-2">
            <p className="leading-4 xl:text-xl">Pontue pelo menos</p>
            <div className="flex flex-row items-center justify-center gap-2">
              <Image
                src="/images/white-stake.webp"
                alt="white-stake"
                width={40}
                height={40}
              />
              <p className="text-red-main text-5xl leading-7">{blind?.score}</p>
            </div>
            <p className="text-3xl leading-4 xl:text-[20px] xl:leading-2">
              Recompensa:{" "}
              <span className="text-yellow-main">
                {"$".repeat(blind?.rewardAmount ?? 1)}+
              </span>
            </p>
          </div>
        </div>

        {blind?.type === "boss" && (
          <p className="text-center text-2xl xl:text-xl">
            Os pontos feitos são divididos pela metade.
          </p>
        )}
      </div>
    </motion.div>
  );
}
