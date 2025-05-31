"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        "main-menu":
          "bg-blue-main border-4 border-blue-main hover:border-blue-lightest rounded-xl shadow-main-menu transition-transform duration-100 active:translate-y-1",
        secondary:
          "bg-yellow-secondary border-4 border-yellow-secondary hover:border-blue-lightest rounded-xl shadow-main-menu transition-transform duration-100 active:translate-y-1",
        setting:
          "bg-red-main border-4 border-red-main hover:border-blue-lightest rounded-xl shadow-main-menu transition-transform duration-100 active:translate-y-1",
      },
      size: {
        default: "h-20 px-4 py-2 text-2xl",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "main-menu",
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
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);

export { Button, buttonVariants };
