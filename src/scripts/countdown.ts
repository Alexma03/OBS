import type { ObsConfig } from "./config";

export function initCountdown(): void {
  const el = document.querySelector("[data-countdown]");
  if (!el) return;

  const config = (window.OBS_CONFIG || {}) as Partial<ObsConfig>;
  let remaining = Number.isFinite(config.duration)
    ? Math.max(0, config.duration as number)
    : 300;

  function format(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  function tick(): void {
    el.textContent = format(remaining);
    if (remaining <= 0) {
      el.textContent = "0:00";
      document.body.dataset.ready = "1";
      return;
    }
    remaining -= 1;
    window.setTimeout(tick, 1000);
  }

  tick();
}
