"use client";

import { Button } from "@/components/buttons/button";
import { CreditsModal } from "@/components/modals/credits-modal";
import { Modal } from "@/components/modals/modal";
import { useState } from "react";

interface SettingsModalProps {
  open?: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsModal({
  open = false,
  onOpenChange,
}: SettingsModalProps) {
  const [openCredits, setOpenCredits] = useState(false);

  function handleOpenOption({ setOpen }: { setOpen: (open: boolean) => void }) {
    onOpenChange(false);
    setOpen(true);
  }

  return (
    <>
      <Modal open={open} className="flex max-w-[500px] flex-col items-center">
        <div className="flex w-full flex-col items-center justify-center space-y-4 px-16">
          <Button className="w-full">Configurações</Button>
          <Button className="w-full">Estatísticas</Button>
          <Button className="w-full">Personalizar o baralho</Button>
          <Button
            className="w-full"
            onClick={() =>
              handleOpenOption({
                setOpen: setOpenCredits,
              })
            }
          >
            Créditos
          </Button>
        </div>
        <Button
          className="w-full"
          variant="secondary"
          size="lg"
          onClick={() => onOpenChange(false)}
        >
          Voltar
        </Button>
      </Modal>
      <CreditsModal open={openCredits} onOpenChange={setOpenCredits} />
    </>
  );
}
