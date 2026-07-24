export function initClock(): void {
  const el = document.querySelector("[data-clock]");
  if (!el) return;

  const formatter = new Intl.DateTimeFormat("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  function tick(): void {
    el.textContent = formatter.format(new Date());
  }

  tick();
  window.setInterval(tick, 1000);
}
