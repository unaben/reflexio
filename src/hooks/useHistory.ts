import { useState, useCallback } from "react";
import type { RoundResult, Difficulty } from "../types/game.types";
import { loadHistory, saveHistory } from "../utils/gameUtils";

export function useHistory() {
  const [history, setHistory] = useState<RoundResult[]>(loadHistory);

  const addResult = useCallback(
    (ms: number | null, difficulty: Difficulty, timeout: boolean) => {
      const entry: RoundResult = { ms, difficulty, timeout, ts: Date.now() };
      setHistory((prev) => {
        const next = [...prev, entry];
        saveHistory(next);
        return next;
      });
      return entry;
    },
    []
  );

  const clearHistory = useCallback(() => {
    setHistory([]);
    saveHistory([]);
  }, []);

  return { history, addResult, clearHistory };
}
