import { useCallback, useState } from "react";
import { useGameLoop } from "../hooks";
import { useHistory } from "../hooks/useHistory";
import { useTheme } from "../hooks/useTheme";
import type { GameScreen, Difficulty, RoundResult } from "../types/game.types";
import { getBest } from "../utils/gameUtils";
import { GameBoard } from "./GameBoard/GameBoard";
import { HistoryScreen } from "./HistoryScreen/HistoryScreen";
import { Home } from "./Home/Home";
import { ResultScreen } from "./ResultScreen/ResultScreen";

const AppWrapper = () => {
  const [screen, setScreen] = useState<GameScreen>("home");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [lastResult, setLastResult] = useState<RoundResult | null>(null);
  const [streak, setStreak] = useState(0);

  const { theme, toggleTheme } = useTheme();
  const { history, addResult } = useHistory();

  const handleBoxClick = useCallback(
    (ms: number) => {
      addResult(ms, difficulty, false);
      setLastResult({ ms, difficulty, timeout: false, ts: Date.now() });
      setStreak((s) => s + 1);
      setScreen("result");
    },
    [difficulty, addResult]
  );

  const handleTimeout = useCallback(() => {
    addResult(null, difficulty, true);
    setLastResult({ ms: null, difficulty, timeout: true, ts: Date.now() });
    setStreak(0);
    setScreen("result");
  }, [difficulty, addResult]);

  const {
    gameState,
    boxVisible,
    boxPos,
    reflex,
    roundNum,
    barPct,
    startRound,
    handleBoxClick: clickBox,
    reset,
  } = useGameLoop({
    difficulty,
    onBoxClick: handleBoxClick,
    onTimeout: handleTimeout,
  });

  const goPlay = useCallback(() => {
    setScreen("game");
    setTimeout(startRound, 80);
  }, [startRound]);

  const goHome = useCallback(() => {
    reset();
    setScreen("home");
  }, [reset]);

  const isNewPersonalBest =
    lastResult !== null &&
    !lastResult.timeout &&
    lastResult.ms !== null &&
    getBest(history) === lastResult.ms;

  return (
    <>
      {screen === "home" && (
        <Home
          difficulty={difficulty}
          theme={theme}
          history={history}
          onDifficultyChange={setDifficulty}
          onPlay={goPlay}
          onViewHistory={() => setScreen("history")}
          onToggleTheme={toggleTheme}
        />
      )}

      {screen === "game" && (
        <GameBoard
          difficulty={difficulty}
          theme={theme}
          gameState={gameState}
          boxVisible={boxVisible}
          boxPos={boxPos}
          reflex={reflex}
          roundNum={roundNum}
          barPct={barPct}
          streak={streak}
          onBoxClick={clickBox}
          onHome={goHome}
          onToggleTheme={toggleTheme}
        />
      )}

      {screen === "result" && lastResult && (
        <ResultScreen
          result={lastResult}
          history={history}
          roundNum={roundNum}
          isPB={isNewPersonalBest}
          theme={theme}
          onNext={goPlay}
          onHome={goHome}
          onToggleTheme={toggleTheme}
        />
      )}

      {screen === "history" && (
        <HistoryScreen
          history={history}
          theme={theme}
          onBack={goHome}
          onToggleTheme={toggleTheme}
        />
      )}
    </>
  );
};

export default AppWrapper;
