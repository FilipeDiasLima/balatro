"use client";

import { Button } from "@/components/buttons/button";
import { Input } from "@/components/inputs/input";
import { Modal } from "@/components/modals/modal";
import { ProgressRow } from "@/components/progress-row";
import { useApp } from "@/hooks/app";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ProfileModalProps {
  open?: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileModal({ open, onOpenChange }: ProfileModalProps) {
  const { user, wins, updateNickName } = useApp();

  const [name, setName] = useState(user.nickname);

  const [profileSelected, setProfileSelected] = useState(1);

  function handleUpdateNickname() {
    if (name.trim() === "") {
      return;
    }
    updateNickName(name);
    onOpenChange(false);
  }

  return (
    <Modal open={open} className="flex max-w-[750px] flex-col items-center">
      <div className="flex flex-row items-center justify-center space-x-2">
        <div className="relative flex justify-center">
          {profileSelected === 1 && (
            <div className="border-t-red-main animate-jumping absolute -top-8 mx-auto h-0 w-0 border-t-[24px] border-r-[10px] border-l-[10px] border-r-transparent border-l-transparent" />
          )}
          <Button onClick={() => setProfileSelected(1)}>1</Button>
        </div>
        <div className="relative flex justify-center">
          {profileSelected === 2 && (
            <div className="border-t-red-main animate-jumping absolute -top-8 mx-auto h-0 w-0 border-t-[24px] border-r-[10px] border-l-[10px] border-r-transparent border-l-transparent" />
          )}
          <Button onClick={() => setProfileSelected(2)}>2</Button>
        </div>
        <div className="relative flex justify-center">
          {profileSelected === 3 && (
            <div className="border-t-red-main animate-jumping absolute -top-8 mx-auto h-0 w-0 border-t-[24px] border-r-[10px] border-l-[10px] border-r-transparent border-l-transparent" />
          )}
          <Button onClick={() => setProfileSelected(3)}>3</Button>
        </div>
      </div>

      <Input
        mainClassName="max-w-[200px]"
        placeholder="Inserir nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className="grid w-full grid-cols-5">
        {/* LEFT */}
        <div className="bg-deepgreen-darkest shadow-dark-menu-sm col-span-3 flex w-full flex-col items-center space-y-2 rounded-xl p-2 pb-3">
          <div className="grid w-full grid-cols-2">
            <p className="text-center text-3xl">Progresso</p>

            <div className="shadow-dark-menu-sm relative flex flex-row items-center justify-center space-x-4 overflow-hidden rounded-lg p-1">
              <div
                className={cn("bg-blue-darker absolute left-0 h-full")}
                style={{
                  width: `${21}%`,
                  transition: "width 0.3s ease-in-out",
                }}
              />
              <p className="z-[2] text-2xl">{21}%</p>
            </div>
          </div>

          <ProgressRow title="Coleção" currentState={23} maxState={213} />
          <ProgressRow title="Desafios" currentState={2} maxState={31} />
          <ProgressRow
            title="Adesivos de Curingas"
            currentState={38}
            maxState={1120}
          />
          <ProgressRow
            title="Vitórias de Aposta de Baralho"
            currentState={17}
            maxState={200}
          />
        </div>

        {/* RIGHT */}
        <div className="col-span-2 flex w-full flex-col items-center space-y-2">
          <p className="text-5xl">
            Vitórias: <span className="text-red-main text-6xl">{wins}</span>
          </p>
          <div className="shadow-dark-menu-sm w-[80%] rounded-xl bg-[#545454] py-2">
            <p className="text-center text-3xl opacity-30">Perfil Atual</p>
          </div>
        </div>
      </div>

      <Button
        variant="secondary"
        className="w-full"
        size="lg"
        onClick={handleUpdateNickname}
      >
        Voltar
      </Button>
    </Modal>
  );
}
