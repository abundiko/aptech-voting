import AppSelect from "@/components/ui/AppSelect";
import FadeIn from "@/components/ui/FadeIn";
import { changeCategory } from "@/state/votes/slice";
import { VoteCategoryType } from "@/utils/constants";
import { useDispatch } from "react-redux";

export default function Navbar() {
  const dispatch = useDispatch();
  return (
    <section className="py-5 flex items-center justify-between app-container">
      <FadeIn wait={0.5} className="text-lg font-bold text-primary">
        Voting(<span className="text-yellow-500">Aptech</span>)
      </FadeIn>
      <div className="flex gap-2">
        <FadeIn wait={1}>
          <h1 className="text-xs opacity-80 mb-1">Category:</h1>
          <div className="w-40 rounded-md bg-red-100 py-1 px-2">
            <AppSelect
              name="category"
              items={["education", "punctuality", "dressing"]}
              title="Category:"
              value="education"
              onChange={value => {
                dispatch(changeCategory(value as VoteCategoryType));
              }}
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
