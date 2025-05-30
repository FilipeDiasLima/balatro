"use client";

import { Button } from "@/components/buttons/button";

export function GameProfile() {
  return (
    <div className="bg-gray-darker shadow-main-menu flex flex-col items-center justify-center rounded-xl p-3 pt-1">
      <p className="text-2xl leading-8">Perfil</p>
      <Button className="bg-gray-main border-gray-main h-12 w-28 rounded-lg">
        <p className="text-xl uppercase">P1</p>
      </Button>
    </div>
  );
}
