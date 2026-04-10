import type { Difficulty, GameState, BoxPosition } from "../../types/game.types";

export interface UseGameLoopOptions {
  difficulty: Difficulty;
  onBoxClick: (ms: number) => void;
  onTimeout: () => void;
}

export interface UseGameLoopReturn {
  gameState: GameState;
  boxVisible: boolean;
  boxPos: BoxPosition;
  reflex: number;
  roundNum: number;
  barPct: number;
  barColor: string;
  startRound: () => void;
  handleBoxClick: () => void;
  reset: () => void;
}