"use client";

import { Button } from "@/components/buttons/button";
import { LanguagesModal } from "@/components/modals/languages-modal";
import Image from "next/image";
import { useState } from "react";

export function GameLanguage() {
  const [openLanguagesModal, setOpenLanguagesModal] = useState(false);

  return (
    <div className="bg-gray-darkest shadow-main-menu flex flex-col items-center justify-center rounded-xl p-3">
      <Button
        variant="gray"
        className="flex h-14 w-36 flex-row space-x-2 rounded-lg"
        onClick={() => setOpenLanguagesModal(true)}
      >
        <Image
          src="/images/language.png"
          width={30}
          height={20}
          alt="language"
        />
        <p className="text-2xl uppercase">Português</p>
      </Button>
      <LanguagesModal
        open={openLanguagesModal}
        onOpenChange={setOpenLanguagesModal}
      />
    </div>
  );
}
