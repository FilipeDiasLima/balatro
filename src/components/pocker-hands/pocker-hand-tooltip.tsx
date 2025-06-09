import { cn } from "@/lib/utils";

export function PockerHandTooltip({
  children,
  description,
  side = "bottom",
}: {
  children: React.ReactNode;
  description: string;
  side?: "top" | "bottom";
}) {
  return (
    <div
      className={cn(
        "border-red-darker bg-red-main absolute z-20 max-w-[80%] rounded-2xl border-b-4 p-1",
        side === "top" ? "bottom-16" : "top-16",
      )}
    >
      <div className="border-gray-light0 flex flex-col items-center justify-center space-y-4 rounded-xl border-b-[5px] bg-white px-10 pt-2 pb-4">
        <p className="text-background text-center text-3xl text-shadow-none">
          {description}
        </p>
        <div className="flex w-full flex-row items-center justify-center space-x-5">
          {children}
        </div>
      </div>
    </div>
  );
}
