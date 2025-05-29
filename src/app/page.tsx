import { AceSpadesAnimated } from "@/components/main-menu/ace-spades-animated";
import { MenuOptions } from "@/components/main-menu/menu-options";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center bg-[url('/images/background.png')] bg-cover bg-center">
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
      <MenuOptions />
    </main>
  );
}
