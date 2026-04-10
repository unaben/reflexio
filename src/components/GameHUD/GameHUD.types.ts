import type { Difficulty } from '../../types/game.types';

export interface GameHUDProps {
  roundNum: number;
  difficulty: Difficulty;
  reflex: number;
  barPct: number;
  streak: number;
}
