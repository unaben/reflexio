import { useState, useRef, useCallback, useEffect } from "react";
import type { GameState, BoxPosition } from "../../types/game.types";
import type {
  UseGameLoopOptions,
  UseGameLoopReturn,
} from "./useGameLoop.types";
import { DIFF_CONFIG } from "../../utils/config";
import { getRand, getRandomPosition } from "../../utils/gameUtils";

export function useGameLoop(props: UseGameLoopOptions): UseGameLoopReturn {
  const { difficulty, onBoxClick, onTimeout } = props;

  const [gameState, setGameState] = useState<GameState>("idle");
  const [boxVisible, setBoxVisible] = useState(false);
  const [boxPos, setBoxPos] = useState<BoxPosition>({ left: 200, top: 200 });
  const [reflex, setReflex] = useState(0);
  const [roundNum, setRoundNum] = useState(0);

  const cfg = DIFF_CONFIG[difficulty];
  const reflexRef = useRef(0);
  const activeRef = useRef(false);
  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const delayId = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearAll = useCallback(() => {
    if (intervalId.current) clearInterval(intervalId.current);
    if (timeoutId.current) clearTimeout(timeoutId.current);
    if (delayId.current) clearTimeout(delayId.current);
    intervalId.current = timeoutId.current = delayId.current = null;
    activeRef.current = false;
  }, []);

  const startRound = useCallback(() => {
    clearAll();
    reflexRef.current = 0;
    setReflex(0);
    setBoxVisible(false);
    setGameState("waiting");
    setRoundNum((r) => r + 1);

    delayId.current = setTimeout(() => {
      setBoxPos(getRandomPosition());
      setBoxVisible(true);
      setGameState("active");
      activeRef.current = true;

      intervalId.current = setInterval(() => {
        reflexRef.current += cfg.interval;
        setReflex(reflexRef.current);
      }, cfg.interval);

      timeoutId.current = setTimeout(() => {
        if (!activeRef.current) return;
        clearAll();
        setBoxVisible(false);
        setGameState("idle");
        onTimeout();
      }, cfg.clickWindow);
    }, getRand(cfg.delayMin, cfg.delayMax));
  }, [cfg, clearAll, onTimeout]);

  const handleBoxClick = useCallback(() => {
    if (!activeRef.current) return;
    clearAll();
    const ms = reflexRef.current;
    setBoxVisible(false);
    setGameState("idle");
    onBoxClick(ms);
  }, [clearAll, onBoxClick]);

  const reset = useCallback(() => {
    clearAll();
    setGameState("idle");
    setBoxVisible(false);
    setReflex(0);
    setRoundNum(0);
    reflexRef.current = 0;
  }, [clearAll]);

  useEffect(() => () => clearAll(), [clearAll]);

  const barPct =
    gameState === "active"
      ? Math.min(100, Math.round((reflex / cfg.clickWindow) * 100))
      : 0;
  const barColor =
    barPct < 50 ? "var(--green)" : barPct < 80 ? "var(--amber)" : "var(--red)";

  return {
    gameState,
    boxVisible,
    boxPos,
    reflex,
    roundNum,
    barPct,
    barColor,
    startRound,
    handleBoxClick,
    reset,
  };
}
