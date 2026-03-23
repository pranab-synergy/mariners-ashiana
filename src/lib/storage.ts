import { DrawState } from "@/types";

const STORAGE_KEYS = {
  full: "mariners-ashiana-draw-full",
  partial: "mariners-ashiana-draw-partial",
} as const;

export type DrawMode = "full" | "partial";

export function saveDrawState(mode: DrawMode, state: DrawState): void {
  try {
    localStorage.setItem(STORAGE_KEYS[mode], JSON.stringify(state));
  } catch {
    // localStorage unavailable
  }
}

export function loadDrawState(mode: DrawMode): DrawState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS[mode]);
    if (!raw) return null;
    return JSON.parse(raw) as DrawState;
  } catch {
    return null;
  }
}

export function clearDrawState(mode: DrawMode): void {
  try {
    localStorage.removeItem(STORAGE_KEYS[mode]);
  } catch {
    // localStorage unavailable
  }
}
