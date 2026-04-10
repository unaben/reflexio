import type { ReflexBoxProps } from "./ReflexBox.types";
import styles from "./ReflexBox.module.css";

export function ReflexBox({ position, reflex, onClick }: ReflexBoxProps) {
  return (
    <button
      className={styles.box}
      style={{ left: position.left, top: position.top }}
      onClick={onClick}
      aria-label="Click me!"
    >
      <span className={styles.label}>CLICK ME</span>
      <span className={styles.ms}>{reflex}ms</span>
    </button>
  );
}
