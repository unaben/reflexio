import cn from "classnames";
import type { GameHUDProps } from "./GameHUD.types";
import styles from "./GameHUD.module.css";

export function GameHUD(props: GameHUDProps) {
  const { roundNum, difficulty, reflex, barPct, streak } = props;

  return (
    <div className={styles.hud}>
      <div className={styles.item}>
        <span className={styles.label}>Round</span>
        <span className={styles.value}>#{roundNum}</span>
      </div>

      <div className={styles.divider} />

      <div className={styles.item}>
        <span className={styles.label}>Mode</span>
        <span
          className={cn(styles.value, styles.diffValue, {
            [styles.easy]: difficulty === "easy",
            [styles.medium]: difficulty === "medium",
            [styles.hard]: difficulty === "hard",
          })}
        >
          {difficulty}
        </span>
      </div>

      <div className={styles.divider} />

      <div className={styles.item}>
        <span className={styles.label}>Time</span>
        <span
          className={cn(styles.value, {
            [styles.timeRed]: barPct > 70,
            [styles.timeAmber]: barPct > 45 && barPct <= 70,
          })}
        >
          {reflex}ms
        </span>
      </div>

      {streak > 1 && (
        <>
          <div className={styles.divider} />
          <div className={styles.item}>
            <span className={styles.label}>Streak</span>
            <span className={cn(styles.value, styles.streak)}>🔥 {streak}</span>
          </div>
        </>
      )}
    </div>
  );
}
