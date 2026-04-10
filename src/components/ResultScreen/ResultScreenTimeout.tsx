import cn from "classnames";
import { getAvg, getBest } from "../../utils/gameUtils";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import type { ResultScreenProps } from "./ResultScreen.types";
import styles from "./ResultScreen.module.css";

const ResultScreenTimeout = (props: ResultScreenProps) => {
  const { history, roundNum, theme, onNext, onHome, onToggleTheme } = props;
  const avg = getAvg(history);
  const best = getBest(history);
  const failed = history.filter((r) => r.timeout).length;

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
      <div className={styles.emoji}>🏃</div>
      <h2 className={cn(styles.time, styles.timeTimeout)}>MISSED</h2>
      <p className={styles.msg}>The box escaped! Too slow this time.</p>
      <div className={styles.spacer} />
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
          <span className={styles.statLabel}>Failed</span>
          <span className={cn(styles.statValue, styles.statRed)}>{failed}</span>
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
  );
};

export default ResultScreenTimeout;
