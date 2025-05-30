"use client";

import { Button } from "@/components/buttons/button";

export function MenuOptions() {
  return (
    <div className="bg-gray-darker shadow-main-menu flex flex-row items-center justify-center gap-4 rounded-xl p-3">
      <Button className="w-44">
        <p className="text-5xl uppercase">jogar</p>
      </Button>
      <Button className="bg-yellow-secondary border-yellow-secondary h-[4.5rem] w-36">
        <p className="text-3xl uppercase">opções</p>
      </Button>
      <Button className="bg-red-main border-red-main h-[4.5rem] w-36">
        <p className="text-3xl uppercase">sair</p>
      </Button>
      <Button className="bg-green-secondary border-green-secondary w-44">
        <p className="text-4xl uppercase">coleção</p>
      </Button>
    </div>
  );
}
