"use client";

import { Button } from "@/components/buttons/button";
import { ProfileModal } from "@/components/modals/profile-modal";
import { useApp } from "@/hooks/app";
import { useState } from "react";

export function GameProfile() {
  const { user } = useApp();
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-gray-darker shadow-main-menu flex flex-col items-center justify-center rounded-xl p-3 pt-1">
      <p className="text-2xl leading-8">Perfil</p>
      <Button
        className="bg-gray-main border-gray-main h-12 w-28 rounded-lg text-xl"
        onClick={() => setOpen(true)}
      >
        {user.nickname}
      </Button>
      <ProfileModal open={open} onOpenChange={setOpen} />
    </div>
  );
}
