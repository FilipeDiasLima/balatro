"use client";

import { Button } from "@/components/buttons/button";
import { Input } from "@/components/inputs/input";
import { Modal } from "@/components/modals/modal";
import { useApp } from "@/hooks/app";
import { useState } from "react";

interface ProfileModalProps {
  open?: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileModal({ open, onOpenChange }: ProfileModalProps) {
  const { user, wins, updateNickName } = useApp();

  const [name, setName] = useState(user.nickname);

  function handleUpdateNickname() {
    if (name.trim() === "") {
      return;
    }
    updateNickName(name);
    onOpenChange(false);
  }

  return (
    <Modal open={open} className="flex max-w-[400px] flex-col items-center">
      <Input
        mainClassName="max-w-[200px]"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="flex w-full flex-col items-center space-y-2">
        <p className="text-4xl">
          Vitórias: <span className="text-red-main text-5xl">{wins}</span>
        </p>
      </div>
      <Button
        variant="secondary"
        className="h-10 w-full"
        onClick={handleUpdateNickname}
      >
        Voltar
      </Button>
    </Modal>
  );
}
