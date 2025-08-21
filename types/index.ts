export type RewardType = "xp" | "level" | "item";
export type RequirementType = "xp" | "level" | "playtime";
export type Difficulty = "easy" | "medium" | "hard";

export interface Stat {
  xp: number;
  level: number;
  playtime: number;
}

export interface Player {
  id: string;
  username: string;
  stats: Stat;
  gameId: string;
}

export interface Game {
  id: string;
  name: string;
  description: string;
}

export interface Requirement {
  type: RequirementType;
  value: number;
}
export type Requirements = Requirement[];
export type Rewards = Reward[];

export interface Reward {
  type: RewardType;
  value: number | string;
}

export interface Mission {
  id: string;
  name: string;
  description: string;
  gameId: string;
  difficulty: Difficulty;
  requirements: Requirements;
  rewards: Reward[];
}

export interface ValidationResult {
  eligible: boolean;
  failedRequirements: Requirement[];
  rewards: Reward[];
}