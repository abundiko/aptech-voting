import FadeIn from "@/components/ui/FadeIn";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import VoterLogin from "./VoterLogin";
import CastVote from "./CastVote";

export default function VoterSection() {
  const globalState = useSelector((state: RootState) => state.globalSlice);

  return (
    <FadeIn wait={2} className="py-5 app-container">
      {globalState.user === "new"
        ? <VoterLogin />
        : globalState.user === "voted"
          ? <h1 className="text-center font-bold text-xl">You have voted!</h1>
          : <CastVote />}
    </FadeIn>
  );
}
