import { GameArea } from "@/components/game-round/game-area";
import { ScoreRoundSide } from "@/components/game-round/score-round-side";

export function RedDeckGame() {
  return (
    <div className="grid h-full w-[90%] grid-cols-8 gap-10 xl:w-[95%] xl:gap-5">
      <section className="bg-background border-deepgreen-darkest col-span-2 border-r-4 border-l-4 px-4 py-10">
        <ScoreRoundSide />
      </section>
      <section className="col-span-6">
        <GameArea />
      </section>
    </div>
  );
}
