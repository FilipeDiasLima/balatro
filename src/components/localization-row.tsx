"use client";

interface LocalizationRowProps {
  title: string;
  description: string;
}

export function LocalizationRow({ description, title }: LocalizationRowProps) {
  return (
    <div className="grid w-full grid-cols-5 gap-2">
      <span className="text-yellow-main col-span-2 text-lg">{title}</span>
      <span className="col-span-3 text-lg">{description}</span>
    </div>
  );
}
