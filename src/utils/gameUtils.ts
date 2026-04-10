import type {
  Difficulty,
  RoundResult,
  ReflexMessage,
  BoxPosition,
} from "../types/game.types";
import { DIFF_CONFIG, STORAGE_KEY, MAX_HISTORY } from "./config";

export const getRand = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomPosition = (boxSize = 110): BoxPosition => {
  const pad = 16;
  const hudHeight = 80;
  const bottomPad = 40;
  const maxLeft = window.innerWidth - boxSize - pad;
  const maxTop = window.innerHeight - boxSize - bottomPad;
  return {
    left: getRand(pad, Math.max(pad, maxLeft)),
    top: getRand(hudHeight + pad, Math.max(hudHeight + pad, maxTop)),
  };
};

export const getReflexMessage = (
  ms: number,
  diff: Difficulty
): ReflexMessage => {
  const { thresholds } = DIFF_CONFIG[diff];
  if (ms < thresholds.great)
    return { emoji: "⚡", msg: "Lightning reflexes!", grade: "great" };
  if (ms < thresholds.ok)
    return { emoji: "👍", msg: "Pretty solid reaction time", grade: "ok" };
  if (ms < thresholds.ok * 1.6)
    return {
      emoji: "🐢",
      msg: "Getting there… keep practising",
      grade: "slow",
    };
  return { emoji: "🦥", msg: "Slower than a sleepy sloth", grade: "slow" };
};

export const loadHistory = (): RoundResult[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
};

export const saveHistory = (history: RoundResult[]): void => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(history.slice(-MAX_HISTORY))
    );
  } catch (error){
    if (error instanceof Error) {
      console.warn("History could not be saved:", error.message);
    }
  
  }
};

export const getBest = (history: RoundResult[]): number | null => {
  const valid = history.filter(
    (r) => !r.timeout && r.ms !== null
  ) as (RoundResult & { ms: number })[];
  return valid.length ? Math.min(...valid.map((r) => r.ms)) : null;
};

export const computeStreak = (history: RoundResult[]): number => {
  let streak = 0;
  for (let i = history.length - 1; i >= 0; i--) {
    if (history[i].timeout) break;
    streak++;
  }
  return streak;
};

export const getAvg = (history: RoundResult[]): number | null => {
  const valid = history.filter(
    (r) => !r.timeout && r.ms !== null
  ) as (RoundResult & { ms: number })[];
  return valid.length
    ? Math.round(valid.reduce((a, r) => a + r.ms, 0) / valid.length)
    : null;
};
