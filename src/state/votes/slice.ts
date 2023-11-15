import { VoteeStandProps } from "@/app/(index)/components/VoteeStand";
import { VOTEES, VoteCategoryType } from "@/utils/constants";
import getStandFromVotes from "@/utils/getStandFromVotes";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type VotesState = {
  allVotes: VoteeStandProps[];
  currentCategory: VoteCategoryType;
};

const initialState: VotesState = {
  allVotes: getStandFromVotes(VOTEES),
  currentCategory: "education"
};

const votesSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    updateAll: (state, action: PayloadAction<VoteeStandProps[]>) => {
      const oldCat = state.currentCategory as VoteCategoryType;
      state.allVotes = sortVotes(action.payload, oldCat);
    },
    changeCategory: (state, action: PayloadAction<VoteCategoryType>) => {
      const oldVotes = state.allVotes as VoteeStandProps[];
      state.currentCategory = action.payload;
      state.allVotes = sortVotes(oldVotes, action.payload);
    }
  }
});

export const { updateAll, changeCategory } = votesSlice.actions;
export default votesSlice.reducer;

function sortVotes(
  votesList: VoteeStandProps[],
  category: VoteCategoryType
): VoteeStandProps[] {
  if (!votesList || !Array.isArray(votesList) || votesList.length === 0) {
    return [];
  }

  // Validate the category
  const validCategories = ["dressing", "education", "punctuality"];
  if (!validCategories.includes(category)) {
    console.error("Invalid category");
    return votesList;
  }

  // Sort the list based on the specified category
  const sortedList = votesList
    .slice()
    .sort((a, b) => a.votes[category] - b.votes[category]);

  return sortedList;
}
