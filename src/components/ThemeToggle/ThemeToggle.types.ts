import type { Theme } from "../../types/game.types";

export interface ThemeToggleProps {
    theme: Theme;
    onToggle: () => void;
  }