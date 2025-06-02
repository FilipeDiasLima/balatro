"use client";

import { useSound } from "@/hooks/use-sound";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center text-3xl text-shadow whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow-main-menu transition-all duration-100 active:translate-y-1",
  {
    variants: {
      variant: {
        main: "bg-red-main hover:bg-red-darker",
        secondary: "bg-yellow-secondary hover:bg-yellow-darker",
        gray: "bg-gray-light hover:bg-gray-darker",
      },
      size: {
        default: "w-36 h-14 rounded-xl",
        lg: "w-24 h-10 rounded-xl",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "main",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, onClick, ...props }, ref) => {
    const playClickSound = useSound("/sounds/button.ogg", 0.2);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      playClickSound();
      onClick?.(e);
    };

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  },
);

export { Button, buttonVariants };
