"use client";

import { useSound } from "@/hooks/use-sound";
import { cn } from "@/lib/utils";
import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  mainClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, mainClassName, ...props }, ref) => {
    const playClickSound = useSound("/sounds/button.ogg", 0.2);

    return (
      <div
        className={cn(
          "bg-blue-main input-container shadow-main-menu hover:bg-blue-deep w-full rounded-xl p-1 transition-all duration-100 active:translate-y-1",
          mainClassName,
        )}
        onClick={playClickSound}
      >
        <input
          type="text"
          className={cn(
            "w-full p-0 text-center text-2xl focus:outline-none focus-visible:outline-none",
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);

export { Input };
