"use client";

import { AppProvider } from "@/contexts/app";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <AppProvider>{children}</AppProvider>;
}
