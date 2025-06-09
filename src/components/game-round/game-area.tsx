"use client";

import { FaceDownCardDragged } from "@/components/face-down-card-dragged";
import { BlindSelect } from "@/components/game-round/blind-select";
import Image from "next/image";

export function GameArea() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-between pt-10">
      <section className="grid w-full grid-cols-6 gap-4 text-shadow-none">
        <div className="col-span-4 flex h-56 flex-col">
          <div className="flex flex-1 flex-row items-center rounded-xl bg-black/20 p-4">
            Curingas
          </div>
          <p className="ml-2">0/5</p>
        </div>

        <div className="col-span-2 flex h-56 flex-col">
          <div className="flex flex-1 items-center rounded-xl bg-black/20 p-4">
            Espectrais
          </div>
          <p className="self-end">0/2</p>
        </div>
      </section>

      <section className="flex h-full w-full flex-row space-x-10">
        <BlindSelect />
        <div className="flex w-[220px] flex-col items-end justify-end pb-10">
          <div className="relative w-fit">
            <FaceDownCardDragged className="absolute top-0 left-4 z-20">
              <Image
                src="/images/red-card-no-shadow.svg"
                width={140}
                height={200}
                alt="red-card-no-shadow"
              />
            </FaceDownCardDragged>
            <Image
              src="/images/red-deck.svg"
              width={156}
              height={200}
              alt="red-deck"
              className="-z-10"
            />
          </div>
          <p className="mr-4">52/52</p>
        </div>
      </section>
    </div>
  );
}
