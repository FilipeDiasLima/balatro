import { cn } from "@/lib/utils";
import Image from "next/image";

interface CardContainerProps {
  naipe: string;
  value: string;
  width?: number;
  height?: number;
  className?: string;
}

export function CardContainer({
  naipe,
  value,
  height = 120,
  width = 150,
  className,
}: CardContainerProps) {
  return (
    <div className="card-shadow-sm-left rounded-md bg-white p-1">
      <Image
        src={`/images/deck/${naipe.toLowerCase()}/${value}.png`}
        width={width ?? 140}
        height={height ?? 120}
        alt={`${value}-${naipe}`}
        className={cn(className)}
      />
    </div>
  );
}
