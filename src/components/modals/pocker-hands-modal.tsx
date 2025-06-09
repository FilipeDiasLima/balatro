"use client";

import { Button } from "@/components/buttons/button";
import { Modal } from "@/components/modals/modal";
import { CartaAlta } from "@/components/pocker-hands/carta-alta";
import { DoisPares } from "@/components/pocker-hands/dois-pares";
import { Flush } from "@/components/pocker-hands/flush";
import { FullHouse } from "@/components/pocker-hands/full-house";
import { Par } from "@/components/pocker-hands/par";
import { Quadra } from "@/components/pocker-hands/quadra";
import { Sequencia } from "@/components/pocker-hands/sequencia";
import { StraightFlush } from "@/components/pocker-hands/straight-flush";
import { Trinca } from "@/components/pocker-hands/trinca";
import { TriangleJumping } from "@/components/triangule-jumping";
import { useState } from "react";

interface PockerHandsModalProps {
  open?: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PockerHandsModal({
  open = false,
  onOpenChange,
}: PockerHandsModalProps) {
  const [profileSelected, setProfileSelected] = useState(1);

  return (
    <Modal open={open} className="flex max-w-[900px] flex-col items-center">
      <div className="flex w-full flex-col items-center justify-center space-y-10 px-10">
        <div className="flex flex-row items-center justify-center space-x-2">
          <div className="relative flex justify-center">
            {profileSelected === 1 && <TriangleJumping />}
            <Button className="w-48" onClick={() => setProfileSelected(1)}>
              Mãos de Pôquer
            </Button>
          </div>
          <div className="relative flex justify-center">
            {profileSelected === 2 && <TriangleJumping />}
            <Button className="w-48" onClick={() => setProfileSelected(2)}>
              Blinds
            </Button>
          </div>
          <div className="relative flex justify-center">
            {profileSelected === 3 && <TriangleJumping />}
            <Button className="w-48" onClick={() => setProfileSelected(3)}>
              Cupons
            </Button>
          </div>
        </div>

        <div className="flex w-full flex-col space-y-1">
          <StraightFlush />
          <Quadra />
          <FullHouse />
          <Flush />
          <Sequencia />
          <Trinca />
          <DoisPares />
          <Par />
          <CartaAlta />
        </div>
      </div>
      <Button
        className="mt-10 w-full"
        variant="secondary"
        size="lg"
        onClick={() => onOpenChange(false)}
      >
        Voltar
      </Button>
    </Modal>
  );
}
