import type { RoundResult, Theme } from "../../types/game.types";

export interface HistoryScreenProps {
  history: RoundResult[];
  theme: Theme;
  onBack: () => void;
  onToggleTheme: () => void;
}
