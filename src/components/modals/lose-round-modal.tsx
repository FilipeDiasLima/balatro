"use client";

import { Button } from "@/components/buttons/button";
import { Modal } from "@/components/modals/modal";

interface LoseRoundModalProps {
  open?: boolean;
  action: () => void;
  backToMenu: () => void;
}

export function LoseRoundModal({
  open = false,
  action,
  backToMenu,
}: LoseRoundModalProps) {
  return (
    <Modal open={open} className="flex max-w-[500px] flex-col items-center">
      <div className="flex w-full flex-col items-center justify-center space-y-4 px-16">
        <p className="text-center text-4xl xl:text-3xl">
          Que pena! Você não conseguiu alcançar a quantidade mínima de pontos
          ;-;
        </p>
      </div>
      <Button className="w-full" size="lg" onClick={action}>
        Reiniciar jogo
      </Button>
      <Button
        className="w-full"
        variant="secondary"
        size="lg"
        onClick={backToMenu}
      >
        Voltar para o menu
      </Button>
    </Modal>
  );
}
