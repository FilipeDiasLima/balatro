import GameBackgroundAnimated from "@/components/backgrounds/game-background-animated";
import { GameArea } from "@/components/game-round/game-area";
import { ScoreRoundSide } from "@/components/game-round/score-round-side";

export default function RedDeckGame() {
  return (
    <main className="flex h-screen w-full justify-center overflow-hidden">
      <GameBackgroundAnimated
        color1="71./255.,139./255., 110./255., 1"
        color2="55./255.,112./255., 88./255., 1"
        vort_speed="0.08"
      />

      <div className="grid h-full w-[85%] grid-cols-8 gap-10">
        <section className="bg-background border-deepgreen-darkest col-span-2 border-r-4 border-l-4 px-4 py-10">
          <ScoreRoundSide />
        </section>
        <section className="col-span-6">
          <GameArea />
        </section>
      </div>
    </main>
  );
}
