"use client";

import { Button } from "@/components/buttons/button";
import { ChooseDeckModal } from "@/components/modals/choose-deck";
import { CollectionModal } from "@/components/modals/collection-modal";
import { SettingsModal } from "@/components/modals/settings-modal";
import { useState } from "react";

export function MenuOptions() {
  const [openSettings, setOpenSettings] = useState(false);
  const [openCollection, setOpenCollection] = useState(false);
  const [openDeckSelect, setOpenDeckSelect] = useState(false);

  return (
    <div className="bg-gray-darkest shadow-main-menu flex flex-row items-center justify-center gap-4 rounded-xl p-3">
      <Button
        className="bg-blue-main hover:bg-blue-darker h-24 w-52 text-6xl uppercase"
        onClick={() => setOpenDeckSelect(true)}
      >
        jogar
      </Button>
      <Button
        className="h-[5.25rem] w-[9.25rem] text-4xl uppercase"
        variant="secondary"
        onClick={() => setOpenSettings(true)}
      >
        opções
      </Button>
      <Button className="h-[5.25rem] w-[9.25rem] text-4xl uppercase">
        sair
      </Button>
      <Button
        className="bg-green-secondary hover:bg-green-darker h-24 w-52 text-5xl uppercase"
        onClick={() => setOpenCollection(true)}
      >
        coleção
      </Button>
      <SettingsModal open={openSettings} onOpenChange={setOpenSettings} />
      <CollectionModal open={openCollection} onOpenChange={setOpenCollection} />
      <ChooseDeckModal open={openDeckSelect} onOpenChange={setOpenDeckSelect} />
    </div>
  );
}
