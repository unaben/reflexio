import type { DifficultyConfig, Difficulty } from '../types/game.types';

export const DIFF_CONFIG: Record<Difficulty, DifficultyConfig> = {
  easy: {
    label: 'Easy',
    interval: 20,
    delayMin: 4000,
    delayMax: 7000,
    clickWindow: 5000,
    thresholds: { great: 400, ok: 700 },
  },
  medium: {
    label: 'Medium',
    interval: 10,
    delayMin: 2000,
    delayMax: 5000,
    clickWindow: 3500,
    thresholds: { great: 250, ok: 500 },
  },
  hard: {
    label: 'Hard',
    interval: 5,
    delayMin: 2000,
    delayMax: 3000,
    clickWindow: 2000,
    thresholds: { great: 150, ok: 300 },
  },
};

export const STORAGE_KEY = 'reflexio_history_v2';
export const MAX_HISTORY = 20;
