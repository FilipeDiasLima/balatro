import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardUIProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export function CardUI({ children, className, ...rest }: CardUIProps) {
  return (
    <div
      className={cn(
        "bg-deepgreen-darkest shadow-dark-menu-sm flex w-full flex-col items-center gap-2 rounded-xl p-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardUIContent({ children, className, ...rest }: CardUIProps) {
  return (
    <div
      className={cn(
        "bg-background flex w-full flex-1 flex-row items-center justify-center space-x-2 rounded-lg p-1",
        className,
      )}
    >
      {children}
    </div>
  );
}
