"use client";

import { cn } from "@/lib/utils";

interface ProgressRowProps {
  title: string;
  currentState: number;
  maxState: number;
}

export function ProgressRow({
  currentState,
  maxState,
  title,
}: ProgressRowProps) {
  const progressPercentage = Math.round((currentState / maxState) * 100);

  const titleLength = title.length;

  return (
    <div className="bg-gray-light0 shadow-light-menu-sm grid w-full grid-cols-2 items-center rounded-xl p-1 pb-2">
      <p
        className={cn(
          "text-center",
          titleLength <= 10
            ? "text-3xl"
            : titleLength <= 24
              ? "text-2xl"
              : "text-lg",
        )}
      >
        {title}
      </p>
      <div className="bg-deepgreen-darkest shadow-dark-menu-sm relative flex flex-row items-center justify-center space-x-4 overflow-hidden rounded-lg p-1">
        <div
          className={cn("bg-blue-darker absolute left-0 h-full")}
          style={{
            width: `${progressPercentage}%`,
            transition: "width 0.3s ease-in-out",
          }}
        />
        <p className="z-[2] text-2xl">{progressPercentage}%</p>
        <p className="z-[2] text-2xl">
          ({currentState}/{maxState})
        </p>
      </div>
    </div>
  );
}
