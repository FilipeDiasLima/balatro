"use client";

import { Button } from "@/components/buttons/button";
import { ProfileModal } from "@/components/modals/profile-modal";
import { useApp } from "@/hooks/app";
import { useState } from "react";

export function GameProfile() {
  const { user } = useApp();
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-gray-darkest shadow-main-menu flex w-full max-w-64 min-w-36 flex-col items-center justify-center space-y-1 rounded-xl p-3 pt-1">
      <p className="text-3xl leading-8">Perfil</p>
      <Button
        variant="gray"
        className="h-14 w-full max-w-full rounded-lg px-2"
        onClick={() => setOpen(true)}
      >
        <p className="truncate overflow-hidden text-2xl">{user.nickname}</p>
      </Button>
      <ProfileModal open={open} onOpenChange={setOpen} />
    </div>
  );
}
