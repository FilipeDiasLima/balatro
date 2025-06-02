import BackgroundAnimated from "@/components/background-animated";
import { LogoAnimated } from "@/components/logo-animated";
import { GameLanguage } from "@/components/main-menu/game-language";
import { GameProfile } from "@/components/main-menu/game-profile";
import { MenuOptions } from "@/components/main-menu/menu-options";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      <BackgroundAnimated />
      <LogoAnimated />

      <div className="flex flex-row items-end space-x-10 pb-14">
        <GameProfile />
        <MenuOptions />
        <GameLanguage />
      </div>
      <p className="absolute top-5 right-10 text-center text-lg text-white">
        Desenvolvido por{" "}
        <Link
          href="https://filipe-dias.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>Filipe Dias</strong>
        </Link>
      </p>
    </main>
  );
}
