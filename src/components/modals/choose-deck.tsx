"use client";

import { Button } from "@/components/buttons/button";
import { Modal } from "@/components/modals/modal";

interface ChooseDeckModalProps {
  open?: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChooseDeckModal({
  open = false,
  onOpenChange,
}: ChooseDeckModalProps) {
  return (
    <Modal open={open} className="flex max-w-[500px] flex-col items-center">
      <div>
        <section>
          <div>
            <p>Carta</p>
          </div>

          <div>
            <h1>Baralho vermelho</h1>
            <p>
              <span>+1</span> descarte em cada rodada
            </p>
          </div>
        </section>

        <section>
          <div>
            <p>Aposta</p>
            <p>Ficha</p>
          </div>

          <div>
            <h2>Aposta Branca</h2>
            <p>Dificuldade Base</p>
          </div>
        </section>

        <Button className="bg-blue-main hover:bg-blue-darker h-24 w-52 text-6xl uppercase">
          jogar
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
  );
}
