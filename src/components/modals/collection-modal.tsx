"use client";

import { Button } from "@/components/buttons/button";
import { Modal } from "@/components/modals/modal";

interface CollectionModalProps {
  open?: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CollectionModal({ open, onOpenChange }: CollectionModalProps) {
  return (
    <Modal open={open} className="flex max-w-[800px] flex-col items-center">
      <div className="grid w-full grid-cols-2 gap-10 px-4 py-2">
        {/* LEFT */}
        <div className="flex w-full flex-col space-y-4">
          <Button className="flex w-full flex-col items-center -space-y-2 p-14">
            <p className="text-4xl">Curingas</p>
            <p>1 / 150</p>
          </Button>
          <Button className="flex w-full flex-col items-center -space-y-2 p-9">
            <p className="text-4xl">Baralhos</p>
            <p>1 / 15</p>
          </Button>
          <Button className="flex w-full flex-col items-center -space-y-2 p-9">
            <p className="text-4xl">Cupons</p>
            <p>1 / 32</p>
          </Button>

          <div className="bg-deepgreen-darkest relative flex flex-row items-center justify-end rounded-xl p-4">
            <p className="text-background absolute -left-14 -rotate-90 text-4xl uppercase">
              consumíveis
            </p>
            <div className="flex w-[90%] flex-col space-y-3">
              <Button className="bg-purple-main hover:bg-purple-darker shadow-dark-menu flex w-full flex-col items-center -space-y-2 p-8">
                <p className="text-4xl">Cartas de Tarô</p>
                <p>17 / 22</p>
              </Button>
              <Button className="bg-blue-light hover:bg-blue-light1 shadow-dark-menu flex w-full flex-col items-center -space-y-2 p-8">
                <p className="text-4xl">Cartas de Planeta</p>
                <p>10 / 12</p>
              </Button>
              <Button className="bg-blue-spectral hover:bg-blue-spectral-darker shadow-dark-menu flex w-full flex-col items-center -space-y-2 p-8">
                <p className="text-4xl">Cartas Espectrais</p>
                <p>4 / 18</p>
              </Button>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col space-y-4">
          <Button className="w-full text-4xl">Cartas Aprimoradas</Button>
          <Button className="w-full p-9 text-4xl">Selos</Button>
          <Button className="flex w-full flex-col -space-y-2 p-9">
            <p className="text-4xl">Edições</p>
            <p>1 / 5</p>
          </Button>
          <Button className="flex w-full flex-col -space-y-2 p-9">
            <p className="text-4xl">Pacotes de Reforço</p>
            <p>1 / 32</p>
          </Button>
          <Button className="flex w-full flex-col -space-y-2 p-9">
            <p className="text-4xl">Marcas</p>
            <p>1 / 24</p>
          </Button>
          <Button className="flex w-full flex-1 flex-col items-center -space-y-2">
            <p className="text-4xl">Blinds</p>
            <p>1 / 30</p>
          </Button>
        </div>
      </div>
      <Button
        variant="secondary"
        onClick={() => onOpenChange(false)}
        className="w-full"
      >
        Voltar
      </Button>
    </Modal>
  );
}
