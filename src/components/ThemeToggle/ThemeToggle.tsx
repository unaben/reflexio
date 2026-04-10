import type { ThemeToggleProps } from "./ThemeToggle.types";
import styles from "./ThemeToggle.module.css";

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      className={styles.toggle}
      onClick={onToggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <span className={styles.icon}>{theme === "light" ? "🌙" : "☀️"}</span>
      <span className={styles.label}>
        {theme === "light" ? "Dark" : "Light"}
      </span>
    </button>
  );
}
