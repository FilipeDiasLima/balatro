import { HTMLAttributes } from "react";

interface PockerHandTriggerProps extends HTMLAttributes<HTMLDivElement> {
  level: number;
  name: string;
  chips: number;
  mult: number;
}

export function PockerHandTrigger({
  chips,
  level,
  mult,
  name,
  ...rest
}: PockerHandTriggerProps) {
  return (
    <div
      className="bg-gray-light0 border-gray-light flex w-full flex-row items-center justify-between overflow-hidden rounded-3xl border-b-4 p-1 hover:border-[#40454c] hover:bg-[#626770]"
      {...rest}
    >
      <div className="bg-gray-lightnest flex w-28 items-center justify-center rounded-[20px] px-2 py-1">
        <p className="text-background text-3xl text-shadow-none">nv.{level}</p>
      </div>

      <p className="text-4xl">{name}</p>

      <div className="bg-background flex w-56 flex-row space-x-1 rounded-[20px] p-1">
        <div className="bg-blue-main flex flex-1 flex-row items-center justify-end rounded-[16px] px-3 text-4xl">
          <p>{chips}</p>
        </div>
        <p className="text-red-main text-4xl">X</p>
        <div className="bg-red-main flex flex-1 flex-row items-center justify-start rounded-[16px] px-3 text-4xl">
          {mult}
        </div>
      </div>
    </div>
  );
}
