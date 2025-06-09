"use client";

import { CardUI, CardUIContent } from "@/components/cards/card-ui";
import Image from "next/image";

export function CurrentStake() {
  return (
    <CardUI className="flex-row p-2">
      <p className="text-2xl leading-5">
        Pontuação <br />
        da Rodada
      </p>
      <CardUIContent>
        <Image
          src="/images/white-stake.webp"
          alt="whiteStake"
          width={30}
          height={30}
        />
        <p className="text-5xl">0</p>
      </CardUIContent>
    </CardUI>
  );
}
