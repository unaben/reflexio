import type { RoundResult, Theme } from "../../types/game.types";

export interface ResultScreenProps {
  result: RoundResult;
  history: RoundResult[];
  roundNum: number;
  isNewPersonalBest: boolean;
  theme: Theme;
  onNext: () => void;
  onHome: () => void;
  onToggleTheme: () => void;
}
