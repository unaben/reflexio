export type Difficulty = 'easy' | 'medium' | 'hard';
export type GameScreen = 'home' | 'game' | 'result' | 'history';
export type GameState  = 'idle' | 'waiting' | 'active';
export type Theme      = 'light' | 'dark';
export type ReflexGrade = 'great' | 'ok' | 'slow';

export interface DifficultyConfig {
  label: string;
  interval: number;
  delayMin: number;
  delayMax: number;
  clickWindow: number;
  thresholds: { great: number; ok: number };
}

export interface RoundResult {
  ms: number | null;
  difficulty: Difficulty;
  timeout: boolean;
  ts: number;
}

export interface ReflexMessage {
  emoji: string;
  msg: string;
  grade: ReflexGrade;
}

export interface BoxPosition {
  left: number;
  top: number;
}
