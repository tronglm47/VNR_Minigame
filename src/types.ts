export type Choice = {
  label: string;
  text: string;
};

export type Question = {
  id: number; // 1..26
  letter: string; // A..Z
  category: string; // group name
  text: string;
  choices: Choice[];
  correctLabel: string; // "A" | "B" | "C" | "D"
  points: number; // 1..5 (randomized at init)
  used: boolean; // selected already
};

export type Team = {
  id: string;
  name: string;
  score: number;
};

export type RewardType = 'plus5' | 'steal' | 'double' | 'swap';

export type PuzzleState = {
  rows: number;
  cols: number;
  revealed: boolean[]; // length = rows*cols
};

export type GameState = {
  teams: Team[];
  activeTeamId: string;
  questions: Question[];
  puzzle: PuzzleState;
};


