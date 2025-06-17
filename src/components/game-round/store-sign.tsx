"use client";
import { CardUI } from "@/components/cards/card-ui";
import JumpingText from "@/components/texts/jumping-text";
import { motion } from "framer-motion";
import Image from "next/image";

export function StoreSign() {
  return (
    <motion.div
      initial={{ y: -200 }}
      animate={{ y: 0, transition: { type: "spring", duration: 0.2 } }}
      exit={{ y: -200 }}
      className="bg-red-main border-red-darker flex w-full flex-col items-center justify-center space-y-4 rounded-2xl border-b-6 p-2"
    >
      <CardUI>
        <Image src="/images/shop-img.png" alt="shop" width={200} height={200} />
        <JumpingText
          text="Melhore sua tentativa!"
          className="text-yellow-main text-3xl"
        />
      </CardUI>
    </motion.div>
  );
}
