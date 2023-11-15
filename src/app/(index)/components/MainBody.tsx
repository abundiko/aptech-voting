import FadeIn from "@/components/ui/FadeIn";
import VoteeStand from "./VoteeStand";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

export default function MainBody() {
  const votesState = useSelector((state: RootState) => state.votesSlice);

  return (
    <section className="md:app-container">
      <FadeIn
        wait={1.5}
        className="border md:rounded-xl bg-light overflow-hidden flex justify-center"
      >
        <div className="overflow-x-auto h-fit overflow-y-hidden">
          <div className="px-5 pt-5 flex items-end gap-8 w-fit h-[60vh]">
            {votesState.allVotes.map((item, i) =>
              <VoteeStand
                key={item.id}
                {...item}
                currentCategory={votesState.currentCategory}
              />
            )}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
