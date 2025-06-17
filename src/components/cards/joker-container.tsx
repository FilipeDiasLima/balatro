"use client";

import { Button } from "@/components/buttons/button";
import { CardDragged } from "@/components/card-dragged";
import { CardUI, CardUIContent } from "@/components/cards/card-ui";
import { JokerTooltip } from "@/components/joker-tooltip";
import JumpingText from "@/components/texts/jumping-text";
import { useApp } from "@/hooks/app";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface JokerContainerProps {
  value: string;
  description?: string;
  width?: number;
  height?: number;
  className?: string;
  tooltipSide?: "top" | "bottom";
  price?: number;
  showPrice?: boolean;
  isSelected?: boolean;
  showScore?: boolean;
  disabled?: boolean;
  showSellButton?: boolean;
  onClick?: () => void;
}

export function JokerContainer({
  value,
  description = "",
  height,
  width,
  className,
  tooltipSide = "bottom",
  price = 0,
  showScore = false,
  isSelected = false,
  disabled = false,
  showPrice = false,
  showSellButton = false,
  onClick,
}: JokerContainerProps) {
  const { sellJoker } = useApp();
  const [open, setOpen] = useState(false);

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  return (
    <div
      className="relative flex justify-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => !disabled && onClick && onClick()}
    >
      {(open || isSelected) && showPrice && (
        <div className="absolute -top-24 z-2 flex h-full w-[80%] items-center justify-center">
          <CardUI className="p-1 pb-8">
            <CardUIContent className="p-1">
              <JumpingText
                text={`$${price}`}
                className="text-yellow-main text-3xl"
              />
            </CardUIContent>
          </CardUI>
        </div>
      )}
      <CardDragged>
        <div
          className={cn(
            "card-shadow-sm-left rounded-md bg-white p-1",
            showPrice && "border-4 border-transparent",
            isSelected && "border-yellow-secondary",
            disabled && "cursor-not-allowed opacity-50",
          )}
        >
          <Image
            src={`/images/jokers/${value}.png`}
            width={width ?? 140}
            height={height ?? 120}
            alt={value}
            className={cn(className)}
          />
        </div>
      </CardDragged>

      {showSellButton && open && (
        <div className="absolute -top-24 flex h-full w-full items-center justify-center">
          <CardUI className="p-1 px-2 pb-4">
            <Button
              className="w-full px-2 text-2xl xl:text-xl"
              onClick={() => sellJoker(value)}
            >
              Vender
            </Button>
          </CardUI>
        </div>
      )}

      <AnimatePresence initial={false}>
        {showScore && (
          <motion.p
            initial={{ opacity: 0, scale: 0.5, y: 0 }}
            animate={{ opacity: 1, scale: 1.4, y: 10 }}
            exit={{ opacity: 0, scale: 1, x: -800, y: 600 }}
            transition={{ duration: 0.3 }}
            className="absolute -bottom-10 z-10 w-full text-center text-3xl xl:text-2xl"
          >
            {["joker_mult", "joker_par"].includes(value) ? (
              <span className="text-red-main">+4 Mult</span>
            ) : value === "joker_impar" ? (
              <span className="text-blue-main">+31 Chips</span>
            ) : (
              <span className="text-red-main">+3 Mult</span>
            )}
          </motion.p>
        )}
      </AnimatePresence>
      {open && <JokerTooltip side={tooltipSide} description={description} />}
    </div>
  );
}
