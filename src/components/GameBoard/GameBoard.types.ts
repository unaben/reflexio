import type { Difficulty, GameState, BoxPosition, Theme } from '../../types/game.types';

export interface GameBoardProps {
  difficulty: Difficulty;
  theme: Theme;
  gameState: GameState;
  boxVisible: boolean;
  boxPos: BoxPosition;
  reflex: number;
  roundNum: number;
  barPct: number;
  streak: number;
  onBoxClick: () => void;
  onHome: () => void;
  onToggleTheme: () => void;
}
