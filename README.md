# OBS — Escenas para directo (Astro)

## El problema de aspecto

| Fuente | Resolución | Ratio |
|--------|------------|-------|
| Mac | 1800×1169 | ~1.54 (más “alta” que 16:9) |
| Full HD / Twitch / YT | 1920×1080 | 1.78 (16:9) |

No puedes meter 1800×1169 en 1920×1080 a tamaño nativo sin **recortar**, **deformar** o **dejar huecos**.

## Recomendación (ya aplicada)

**Canvas OBS: 1920×1080**

```
┌────────────────────────────┬──────────┐
│ ░ letterbox (~53px) ░░░░░░ │          │
│┌──────────────────────────┐│  Chat    │
││   Pantalla Mac           │├──────────┤
││   1500 × 974             ││ Webcam   │
││   (1800×1169 sin crop)   ││ 420×315  │
│└──────────────────────────┘│          │
│ ░ letterbox (~53px) ░░░░░░ │          │
└────────────────────────────┴──────────┘
              1920 × 1080
```

1. **Mac a la izquierda**, escalada a **1500×974** (mismo aspecto, sin crop ni stretch).  
2. **Huecos arriba/abajo** (~53px): no son “barras negras feas” de la plataforma — son el void del overlay (`#0b0c0e`), mismo color de marca.  
3. **Rail derecho 420px** (chat + webcam): aquí va el “hueco a lo ancho” útil, no vacío.

### Qué evitar

- Estirar el Mac a 1500×1080 → se deforma.  
- Forzar Mac a altura 1080 (~1663 de ancho) → solo ~257px para la cam (demasiado estrecho).  
- Canvas 2340×1169 → mal soporte en Twitch/YT (pillarbox o downscale raro en el cliente).

## Desarrollo

```bash
npm install
npm run dev
```

http://localhost:4321

## Deploy (Cloudflare Workers)

```bash
npm run deploy
```

Worker: `https://obs.alex03marcos.workers.dev`

## OBS

1. Settings → Video → Base & Output: **1920 × 1080**  
2. Display Capture: escala a **1500×974**, céntrala en vertical en la columna izquierda  
3. Webcam + chat en el rail derecho (pegado al borde)  
4. Browser Source overlay: 1920×1080  
