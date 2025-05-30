"use client";

import { Button } from "@/components/buttons/button";

export function GameLanguage() {
  return (
    <div className="bg-gray-darker shadow-main-menu flex flex-col items-center justify-center rounded-xl p-3">
      <Button className="bg-gray-main border-gray-main h-12 w-28 rounded-lg">
        <p className="text-xl uppercase">Português</p>
      </Button>
    </div>
  );
}
