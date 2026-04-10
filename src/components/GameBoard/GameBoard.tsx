import { GameHUD } from "../GameHUD/GameHUD";
import { ReflexBox } from "../ReflexBox/ReflexBox";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import type { GameBoardProps } from "./GameBoard.types";
import styles from "./GameBoard.module.css";

export function GameBoard(props: GameBoardProps) {
  const {
    difficulty,
    theme,
    gameState,
    boxVisible,
    boxPos,
    reflex,
    roundNum,
    barPct,
    streak,
    onBoxClick,
    onHome,
    onToggleTheme,
  } = props;

  return (
    <div className={styles.board}>
      <GameHUD
        roundNum={roundNum}
        difficulty={difficulty}
        reflex={reflex}
        barPct={barPct}
        streak={streak}
      />

      <div className={styles.topRight}>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>

      {!boxVisible && gameState === "waiting" && (
        <div className={styles.waiting}>
          <div className={styles.pulseDot} />
          <p className={styles.waitingText}>Get ready…</p>
          <p className={styles.waitingHint}>The box will appear soon</p>
        </div>
      )}

      {boxVisible && (
        <ReflexBox position={boxPos} reflex={reflex} onClick={onBoxClick} />
      )}

      <ProgressBar pct={barPct} />

      <button className={styles.homeBtn} onClick={onHome}>
        ← Home
      </button>
    </div>
  );
}
