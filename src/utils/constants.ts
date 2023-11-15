export const APP_SECRET = "a secret that i refused to tell";

export type VoteCategoryType = "dressing" | "education" | "punctuality";

export type VoteCategories = {
  dressing: number;
  education: number;
  punctuality: number;
};

export type Votee = {
  name: string;
  id: string;
  votes: VoteCategories;
};

export const VOTEES: Votee[] = [
  {
    name: "Akunna Judith",
    id: "akunna",
    votes: {
      dressing: 20,
      education: 20,
      punctuality: 30
    }
  },
  {
    name: "Stanley Dureke",
    id: "stanley",
    votes: {
      dressing: 40,
      education: 50,
      punctuality: 10
    }
  },
  {
    name: "Chibuike Uwakwe",
    id: "chibyke",
    votes: {
      dressing: 40,
      education: 40,
      punctuality: 40
    }
  },
  {
    name: "Kizito Nwanem",
    id: "kizito",
    votes: {
      dressing: 11,
      education: 23,
      punctuality: 8
    }
  }
];
