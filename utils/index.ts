import { BASE_URL } from "../constants/index.js";
import type {
  Mission,
  Player,
  Requirement,
  ValidationResult,
} from "../types/index.js";

export const fetchResource = async <T>(
  name: "players" | "games" | "missions",
  value: string
) => {
  const res = await fetch(`${BASE_URL}/${name}/${value}`);
  if (!res.ok) return null;
  return res.json() as Promise<T>;
};

export const validatePlayer = (
  player: Player,
  mission: Mission
): ValidationResult => {
  const failedRequirements: Requirement[] = [];
  const { requirements } = mission;

  for (const requirement of requirements) {
    const { type, value } = requirement;

    if (player.stats[type] < value) {
      failedRequirements.push(requirement);
    }
  }

  const eligible = failedRequirements.length === 0;

  return {
    eligible,
    failedRequirements,
    rewards: eligible ? mission.rewards : [],
  };
};
