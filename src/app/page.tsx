import BackgroundAnimated from "@/components/background-animated";
import { AceSpadesAnimated } from "@/components/main-menu/ace-spades-animated";
import { GameLanguage } from "@/components/main-menu/game-language";
import { GameProfile } from "@/components/main-menu/game-profile";
import { MenuOptions } from "@/components/main-menu/menu-options";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center p-10">
      <BackgroundAnimated />
      <div className="relative flex h-full w-full items-center justify-center">
        <AceSpadesAnimated />
        <Image
          src="/images/balatro-image.png"
          width={800}
          height={500}
          alt="balatro-logo"
          className="absolute"
        />
      </div>
      <div className="flex flex-row items-end space-x-10">
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
