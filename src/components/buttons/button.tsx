"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return <button {...rest}>{children}</button>;
}
