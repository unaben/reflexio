import type { Difficulty, RoundResult, Theme } from "../../types/game.types";

export interface HomeProps {
  difficulty: Difficulty;
  theme: Theme;
  history: RoundResult[];
  onDifficultyChange: (d: Difficulty) => void;
  onPlay: () => void;
  onViewHistory: () => void;
  onToggleTheme: () => void;
}
