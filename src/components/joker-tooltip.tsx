import { cn } from "@/lib/utils";

export function JokerTooltip({
  description,
  side = "bottom",
}: {
  description: string;
  side?: "top" | "bottom";
}) {
  return (
    <div
      className={cn(
        "border-red-darker bg-red-main absolute z-20 w-[240px] rounded-2xl border-b-4 p-1",
        side === "top" ? "bottom-16" : "top-32",
      )}
    >
      <div className="border-gray-light0 flex flex-col items-center justify-center space-y-4 rounded-xl border-b-[5px] bg-white px-4 pt-2 pb-4">
        <p className="text-background text-center text-3xl text-shadow-none xl:text-2xl">
          {description}
        </p>
      </div>
    </div>
  );
}
