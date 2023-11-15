import { VoteeStandProps } from "@/app/(index)/components/VoteeStand";
import { VoteCategories, VoteCategoryType, Votee } from "./constants";

export default function getStandFromVotes(votes: Votee[]): VoteeStandProps[] {
  const biggest = getBarPercentage(votes);
  return votes.map(vote => {
    return {
      ...vote,
      barHeight: getIndividualBarPercentage(vote, biggest),
      currentCategory: "education"
    };
  });
}

function getIndividualBarPercentage(
  individual: Votee,
  biggest: VoteCategories
): VoteCategories {
  return {
    dressing: getBarHeight(individual.votes.dressing, biggest.dressing),
    education: getBarHeight(individual.votes.education, biggest.education),
    punctuality: getBarHeight(individual.votes.punctuality, biggest.punctuality)
  };
}

function getBarHeight(individual: number, biggest: number): number {
  const max = 55;
  return max * individual / biggest;
}

function getBarPercentage(votes: Votee[]): VoteCategories {
  const categories: VoteCategoryType[] = [
    "dressing",
    "education",
    "punctuality"
  ];
  const final: VoteCategories = {
    dressing: 0,
    education: 0,
    punctuality: 0
  };

  for (let index = 0; index < categories.length; index++) {
    let biggest = 0;
    votes.forEach(vote => {
      if (vote.votes[categories[index]] > biggest)
        biggest = vote.votes[categories[index]];
    });
    final[categories[index]] = biggest;
  }

  return final;
}
