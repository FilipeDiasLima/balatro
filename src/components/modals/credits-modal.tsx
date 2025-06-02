"use client";

import { Button } from "@/components/buttons/button";
import { LocalizationRow } from "@/components/localization-row";
import { Modal } from "@/components/modals/modal";
import Link from "next/link";
import { useState } from "react";

interface CreditsModalProps {
  open?: boolean;
  onOpenChange: (open: boolean) => void;
}

function ProductionTab() {
  return (
    <div className="bg-deepgreen-darkest grid w-full grid-cols-6 gap-2 rounded-2xl px-4 py-8">
      <div className="border-border col-span-2 flex flex-col items-center justify-center space-y-4 rounded-xl border-4">
        <h1 className="text-center text-5xl">
          Original Soundtrack composed by{" "}
          <span className="text-blue-main">LouisF</span>
        </h1>

        <Link
          href="https://www.instagram.com/louisfsoundtracks/"
          className="w-[60%]"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="shadow-dark-menu w-full">Instagram</Button>
        </Link>

        <p>Modified with their permission</p>
      </div>

      <div className="border-border flex flex-col items-center justify-start space-y-2 rounded-xl border-4">
        <p className="text-4xl">Porting</p>
        <div className="flex flex-col items-center -space-y-1">
          <p className="text-yellow-main">PlayStation</p>
          <p>Maarten De Meyer</p>
        </div>
        <div className="flex flex-col items-center -space-y-1">
          <p className="text-yellow-main">Xbox</p>
          <p>Maarten De Meyer</p>
        </div>
        <div className="flex flex-col items-center -space-y-1">
          <p className="text-yellow-main">Android</p>
          <p>Maarten De Meyer</p>
        </div>
        <div className="flex flex-col items-center -space-y-1">
          <p className="text-yellow-main">Apple Platforms</p>
          <p>Maarten De Meyer</p>
        </div>
        <div className="flex flex-col items-center -space-y-1">
          <p className="text-yellow-main">Mac (Steam)</p>
          <p>william341</p>
        </div>
      </div>

      <div className="border-border col-span-2 rounded-xl border-4 p-2">
        <p className="text-4xl">Localization</p>
        <p>Universally Speaking</p>
        <LocalizationRow
          title="German"
          description="Dominik May, Lisa-Marie Beck"
        />
        <LocalizationRow
          title="Spanish Latam"
          description="Romén René Orozco, Javier Gómez"
        />
        <LocalizationRow
          title="French"
          description="Romain Uervaecke, Claire Gérard"
        />
        <LocalizationRow
          title="Indonesian"
          description="Yopi Jalo Paksi, Sutarto mohammad"
        />
        <LocalizationRow
          title="Italian"
          description="Oliuer Cozzio. Giulia Benassi"
        />
        <LocalizationRow
          title="Japanese"
          description="Takashi Fujimoto, Ai Parlow"
        />
        <LocalizationRow
          title="Korean"
          description="Haejung Lee, Sanghyun Bae"
        />
        <LocalizationRow
          title="Dutch"
          description="Ellis aongsma, Erik nusselder"
        />
        <LocalizationRow
          title="Polish"
          description="mariusz Ulodarczgk, Bartosz klofik"
        />
        <LocalizationRow
          title="Portuguese Brasilian"
          description="Samuel modesto, R. Cali"
        />
        <LocalizationRow
          title="Russian"
          description="Yuliia Tatsenko, natalia Rudane"
        />
        <LocalizationRow
          title="Simplified Chinese"
          description="Shuai Fang. Liqi Ye"
        />
        <LocalizationRow
          title="Traditional Chinese"
          description="Pauline Lin. RngelRabbitBB"
        />
        <LocalizationRow
          title="Project managers"
          description="Ruogang Yuan, Tania Carê"
        />
      </div>

      <div className="border-border flex flex-col items-start justify-start -space-y-2 rounded-xl border-4 p-2">
        <p className="text-4xl">Testing/QA</p>

        <p className="mt-2">Uishwak Kondapalli</p>
        <p>Basha Syed</p>
        <p>CampfireCollective</p>
        <p>drspectred</p>
        <p>TheRealEvab</p>
        <p>Brightqwertg</p>
        <p>MrWizzrd</p>
        <p>mcpower</p>
      </div>
    </div>
  );
}

export function CreditsModal({ open, onOpenChange }: CreditsModalProps) {
  const [optionSelected, setOptionSelected] = useState<
    "production" | "publishing" | "collabs" | "sounds" | "imagery" | "misc"
  >("production");

  return (
    <Modal open={open} className="max-w-[87%]">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex flex-row items-center justify-center space-x-2 px-8">
          <div className="relative flex justify-center">
            {optionSelected === "production" && (
              <div className="border-t-red-main animate-jumping absolute -top-8 mx-auto h-0 w-0 border-t-[24px] border-r-[10px] border-l-[10px] border-r-transparent border-l-transparent" />
            )}
            <Button
              className="capitalize"
              onClick={() => setOptionSelected("production")}
            >
              production
            </Button>
          </div>
          <div className="relative flex justify-center">
            {optionSelected === "publishing" && (
              <div className="border-t-red-main animate-jumping absolute -top-8 mx-auto h-0 w-0 border-t-[24px] border-r-[10px] border-l-[10px] border-r-transparent border-l-transparent" />
            )}
            <Button
              className="capitalize"
              onClick={() => setOptionSelected("publishing")}
            >
              publishing
            </Button>
          </div>
          <div className="relative flex justify-center">
            {optionSelected === "collabs" && (
              <div className="border-t-red-main animate-jumping absolute -top-8 mx-auto h-0 w-0 border-t-[24px] border-r-[10px] border-l-[10px] border-r-transparent border-l-transparent" />
            )}
            <Button
              className="capitalize"
              onClick={() => setOptionSelected("collabs")}
            >
              collabs
            </Button>
          </div>
          <div className="relative flex justify-center">
            {optionSelected === "sounds" && (
              <div className="border-t-red-main animate-jumping absolute -top-8 mx-auto h-0 w-0 border-t-[24px] border-r-[10px] border-l-[10px] border-r-transparent border-l-transparent" />
            )}
            <Button
              className="capitalize"
              onClick={() => setOptionSelected("sounds")}
            >
              sounds
            </Button>
          </div>
          <div className="relative flex justify-center">
            {optionSelected === "imagery" && (
              <div className="border-t-red-main animate-jumping absolute -top-8 mx-auto h-0 w-0 border-t-[24px] border-r-[10px] border-l-[10px] border-r-transparent border-l-transparent" />
            )}
            <Button
              className="capitalize"
              onClick={() => setOptionSelected("imagery")}
            >
              imagery
            </Button>
          </div>
          <div className="relative flex justify-center">
            {optionSelected === "misc" && (
              <div className="border-t-red-main animate-jumping absolute -top-8 mx-auto h-0 w-0 border-t-[24px] border-r-[10px] border-l-[10px] border-r-transparent border-l-transparent" />
            )}
            <Button
              className="capitalize"
              onClick={() => setOptionSelected("misc")}
            >
              misc
            </Button>
          </div>
        </div>
        <div className="w-full px-10">
          <ProductionTab />
        </div>
        <Button
          variant="secondary"
          className="w-full"
          size="lg"
          onClick={() => onOpenChange(false)}
        >
          Voltar
        </Button>
      </div>
    </Modal>
  );
}
