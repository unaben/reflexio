import cn from "classnames";
import { getBest, getAvg, getReflexMessage } from "../../utils/gameUtils";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import type { HistoryScreenProps } from "./HistoryScreen.types";
import type { Difficulty } from "../../types/game.types";
import styles from "./HistoryScreen.module.css";

export function HistoryScreen(props: HistoryScreenProps) {
  const { history, theme, onBack, onToggleTheme } = props;
  const best = getBest(history);
  const avg = getAvg(history);
  const failed = history.filter((r) => r.timeout).length;

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>

      <div className={styles.inner}>
        <button className={styles.backBtn} onClick={onBack}>
          ← Back
        </button>
        <h2 className={styles.heading}>Your History</h2>

        <div className={styles.summaryRow}>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Best</span>
            <span className={styles.summaryValue}>
              {best != null ? `${best}ms` : "—"}
            </span>
          </div>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Average</span>
            <span className={styles.summaryValue}>
              {avg != null ? `${avg}ms` : "—"}
            </span>
          </div>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Failed</span>
            <span className={cn(styles.summaryValue, styles.red)}>
              {failed}
            </span>
          </div>
        </div>

        <div className={styles.list}>
          {history.length === 0 && (
            <p className={styles.empty}>
              No rounds played yet. Hit Play to get started!
            </p>
          )}
          {[...history].reverse().map((round, i) => {
            const num = history.length - i;
            if (round.timeout) {
              return (
                <div
                  key={round.ts}
                  className={cn(styles.row, styles.rowFailed)}
                >
                  <span className={styles.rowNum}>#{num}</span>
                  <span className={cn(styles.rowTime, styles.miss)}>
                    MISSED
                  </span>
                  <span
                    className={cn(styles.badge, {
                      [styles.easy]: round.difficulty === "easy",
                      [styles.medium]: round.difficulty === "medium",
                      [styles.hard]: round.difficulty === "hard",
                    })}
                  >
                    {round.difficulty}
                  </span>
                </div>
              );
            }
            const { grade } = getReflexMessage(
              round.ms!,
              round.difficulty as Difficulty
            );
            return (
              <div key={round.ts} className={styles.row}>
                <span className={styles.rowNum}>#{num}</span>
                <span
                  className={cn(styles.rowTime, {
                    [styles.good]: grade === "great",
                    [styles.okTime]: grade === "ok",
                    [styles.slow]: grade === "slow",
                  })}
                >
                  {round.ms}ms
                </span>
                <span
                  className={cn(styles.badge, {
                    [styles.easy]: round.difficulty === "easy",
                    [styles.medium]: round.difficulty === "medium",
                    [styles.hard]: round.difficulty === "hard",
                  })}
                >
                  {round.difficulty}
                </span>
                {round.ms === best && (
                  <span className={styles.pbMark}>🏆 PB</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
