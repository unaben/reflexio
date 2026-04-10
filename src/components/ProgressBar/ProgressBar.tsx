import cn from "classnames";
import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  pct: number;
}

export function ProgressBar({ pct }: ProgressBarProps) {
  return (
    <div className={styles.wrap}>
      <div
        className={cn(styles.bar, {
          [styles.barGreen]: pct <= 45,
          [styles.barAmber]: pct > 45 && pct <= 70,
          [styles.barRed]: pct > 70,
        })}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
