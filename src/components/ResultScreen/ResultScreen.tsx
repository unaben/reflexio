import cn from "classnames";
import {
  getReflexMessage,
  getBest,
  computeStreak,
  getAvg,
} from "../../utils/gameUtils";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import type { ResultScreenProps } from "./ResultScreen.types";
import ResultScreenTimeout from "./ResultScreenTimeout";
import styles from "./ResultScreen.module.css";

export function ResultScreen(props: ResultScreenProps) {
  const {
    result,
    history,
    roundNum,
    isNewPersonalBest,
    theme,
    onNext,
    onHome,
    onToggleTheme,
  } = props;

  const { ms, difficulty, timeout } = result;
  const best = getBest(history);
  const avg = getAvg(history);
  const streak = computeStreak(history);

  const { emoji, msg } = getReflexMessage(ms!, difficulty);

  return (
    <>
      {timeout ? (
        <ResultScreenTimeout {...props} />
      ) : (
        <div className={styles.page}>
          <div className={styles.topBar}>
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>
          <div className={styles.emoji}>{emoji}</div>
          <h2 className={styles.time}>{ms}ms</h2>
          <p className={styles.msg}>{msg}</p>
          {isNewPersonalBest ? (
            <div className={styles.pbBadge}>🏆 New personal best!</div>
          ) : (
            <div className={styles.spacer} />
          )}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Best ever</span>
              <span className={styles.statValue}>
                {best != null ? `${best}ms` : "—"}
              </span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Round</span>
              <span className={styles.statValue}>#{roundNum}</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Session avg</span>
              <span className={styles.statValue}>
                {avg != null ? `${avg}ms` : "—"}
              </span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Streak</span>
              <span
                className={cn(styles.statValue, {
                  [styles.statAmber]: streak > 2,
                })}
              >
                {streak > 0 ? `🔥 ${streak}` : streak}
              </span>
            </div>
          </div>
          <div className={styles.actions}>
            <button className={styles.btnPrimary} onClick={onNext}>
              Next Round
            </button>
            <button className={styles.btnSecondary} onClick={onHome}>
              Home
            </button>
          </div>
        </div>
      )}
    </>
  );
}
