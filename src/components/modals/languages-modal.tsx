"use client";

import { Button } from "@/components/buttons/button";
import { Modal } from "@/components/modals/modal";

interface LanguagesModalProps {
  open?: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LanguagesModal({
  open = false,
  onOpenChange,
}: LanguagesModalProps) {
  return (
    <Modal open={open} className="flex max-w-[500px] flex-col items-center">
      <div className="flex w-full flex-col items-center justify-center space-y-4 px-16">
        <Button
          className="bg-blue-main hover:bg-blue-darker w-full"
          onClick={() => onOpenChange(false)}
        >
          Português
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
