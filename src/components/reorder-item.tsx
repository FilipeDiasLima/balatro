"use client";

import { CardProps } from "@/interfaces/card";
import { useRaisedShadow } from "@/lib/utils";
import { Reorder, useDragControls, useMotionValue } from "motion/react";

interface ReorderItemProps {
  card: CardProps;
}

export function ReorderItem({ card }: ReorderItemProps) {
  const x = useMotionValue(0);
  const boxShadow = useRaisedShadow(x);
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={card}
      id={card}
      style={{ boxShadow, x }}
      dragListener={false}
      dragControls={dragControls}
    >
      <p>
        {card.naipe} - {card.value}{" "}
      </p>
    </Reorder.Item>
  );
}
