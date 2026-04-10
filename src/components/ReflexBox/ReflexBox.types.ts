import type { BoxPosition } from "../../types/game.types";

export interface ReflexBoxProps {
  position: BoxPosition;
  reflex: number;
  onClick: () => void;
}
