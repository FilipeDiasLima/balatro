"use client";

import { AppContext } from "@/contexts/app";
import { useContext } from "react";

export function useApp() {
  const context = useContext(AppContext);
  return context;
}
