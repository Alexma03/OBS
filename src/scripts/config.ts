export type ObsConfig = {
  name: string;
  handle: string;
  duration: number;
  cam: string;
  preview: boolean;
  title: string | null;
  subtitle: string | null;
};

declare global {
  interface Window {
    OBS_CONFIG?: ObsConfig;
  }
}

export function initConfig(options: { defaultDuration?: number } = {}): ObsConfig {
  const params = new URLSearchParams(window.location.search);
  const defaultDuration = options.defaultDuration ?? 300;

  const config: ObsConfig = {
    name: params.get("name") || "Alex",
    handle: params.get("handle") || "alexma0305",
    duration: params.has("duration")
      ? Number(params.get("duration"))
      : defaultDuration,
    cam: params.get("cam") || "right",
    preview: params.get("preview") === "1",
    title: params.get("title"),
    subtitle: params.get("subtitle"),
  };

  window.OBS_CONFIG = config;

  document.querySelectorAll("[data-bind]").forEach((el) => {
    const key = el.getAttribute("data-bind") as keyof ObsConfig | null;
    if (key && config[key] != null) {
      el.textContent = String(config[key]);
    }
  });

  if (config.preview) {
    document.body.dataset.preview = "1";
  }

  document.body.dataset.cam = config.cam;

  const stack = document.querySelector("[data-cam-stack]");
  const map: Record<string, string> = {
    right: "cam-stack--right",
    left: "cam-stack--left",
    // aliases antiguos
    br: "cam-stack--right",
    bl: "cam-stack--left",
    bc: "cam-stack--right",
  };
  const pos = map[config.cam] || "cam-stack--right";

  if (stack) {
    stack.classList.remove("cam-stack--right", "cam-stack--left", "cam-stack--br", "cam-stack--bl", "cam-stack--bc");
    stack.classList.add(pos);
  }

  return config;
}
