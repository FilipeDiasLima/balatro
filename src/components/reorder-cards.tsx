"use client";

import { CardContainer } from "@/components/cards/card-container";
import { CardProps } from "@/interfaces/card";
import { useRaisedShadow } from "@/lib/utils";
import {
  motion,
  Reorder,
  useDragControls,
  useMotionValue,
} from "framer-motion";

interface ReorderCardsProps {
  cards: CardProps[];
  coutingScore: boolean;
  cardsSelected: CardProps[];
  setItems: (cards: CardProps[]) => void;
}

export function ReorderCards({
  cards,
  cardsSelected,
  coutingScore,
  setItems,
}: ReorderCardsProps) {
  const x = useMotionValue(0);
  const boxShadow = useRaisedShadow(x);
  const dragControls = useDragControls();

  return (
    <Reorder.Group
      axis="x"
      onReorder={setItems}
      values={cards}
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "-16px",
        width: "100%",
        position: "relative",
      }}
    >
      {cards.map((card, index) => {
        const length = cards.length;
        const centerLeft = Math.floor((length - 1) / 2);
        const centerRight = Math.ceil((length - 1) / 2);
        const distanceFromCenter = Math.min(
          Math.abs(index - centerLeft),
          Math.abs(index - centerRight),
        );
        const maxRotation = 10;
        const step = length > 1 ? maxRotation / (centerRight || 1) : 0;
        const rotate = (index - centerLeft) * step;

        const marginTop =
          -(12 * (centerRight - distanceFromCenter)) -
          (cardsSelected.includes(card) ? 100 : 0);

        if (
          coutingScore &&
          cardsSelected.some(
            (cardSelected) =>
              cardSelected.naipe === card.naipe &&
              cardSelected.value === card.value,
          )
        ) {
          return null;
        }

        return (
          <Reorder.Item
            id={index}
            key={index}
            value={index}
            style={{ boxShadow, x, position: "relative", flexShrink: 0 }}
            dragListener={false}
            dragControls={dragControls}
          >
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0, rotate: rotate }}
              exit={{ opacity: 1, x: 1500, rotate: 145 }}
              transition={{ type: "spring", duration: 0.2 }}
              style={{
                transform: `rotate(${rotate}deg)`,
                marginTop: `${marginTop}px`,
                transition: "margin-top 0.2s",
              }}
              dragControls={dragControls}
            >
              <CardContainer
                naipe={card.naipe}
                value={card.value}
                className="max-h-[345px] max-w-[120px] xl:max-h-[288px] xl:max-w-[100px]"
              />
            </motion.div>
          </Reorder.Item>
        );
      })}
    </Reorder.Group>
  );
}
