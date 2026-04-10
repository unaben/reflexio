import cn from "classnames";
import { DIFF_CONFIG } from "../../utils/config";
import { getBest, computeStreak } from "../../utils/gameUtils";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import type { HomeProps } from "./Home.types";
import type { Difficulty } from "../../types/game.types";
import styles from "./Home.module.css";

export function Home(props: HomeProps) {
  const {
    difficulty,
    theme,
    history,
    onDifficultyChange,
    onPlay,
    onViewHistory,
    onToggleTheme,
  } = props;

  const best = getBest(history);
  const streak = computeStreak(history);
  const total = history.length;

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>

      <div className={styles.hero}>
        <h1 className={styles.logo}>Reflex.io</h1>
        <p className={styles.tagline}>How fast are your reflexes?</p>
      </div>

      <div className={styles.card}>
        <h3 className={styles.cardTitle}>How to play</h3>
        <p className={styles.cardText}>
          Hit <strong>Play</strong>, then wait. A box will appear somewhere on
          screen after a random delay.
        </p>
        <p className={styles.cardText}>
          Tap it as fast as you can — your reaction time is measured from the
          moment it appears.
        </p>
        <p className={styles.cardText}>
          Miss it or run out of time? Failed round. Build streaks for bragging
          rights.
        </p>
      </div>

      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Personal best</span>
          <span className={styles.statValue}>
            {best != null ? `${best}ms` : "—"}
          </span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Rounds played</span>
          <span className={styles.statValue}>{total || "—"}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Streak</span>
          <span className={styles.statValue}>
            {streak > 0 ? `🔥${streak}` : "—"}
          </span>
        </div>
      </div>

      <div className={styles.diffRow}>
        {(Object.keys(DIFF_CONFIG) as Difficulty[]).map((key) => (
          <button
            key={key}
            className={cn(styles.diffBtn, {
              [styles.diffActive]: difficulty === key,
            })}
            onClick={() => onDifficultyChange(key)}
          >
            {DIFF_CONFIG[key].label}
          </button>
        ))}
      </div>

      <button className={styles.playBtn} onClick={onPlay}>
        Play
      </button>

      {history.length > 0 && (
        <button className={styles.historyLink} onClick={onViewHistory}>
          View history ({history.length} rounds)
        </button>
      )}
    </div>
  );
}
