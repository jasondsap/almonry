import { ImageResponse } from "next/og";

export const alt = "Almonry — Where generosity is kept";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Pull Fraunces (the brand display serif) for the wordmark. Best-effort: if the
// fetch fails at build time we fall back to the platform serif so the image
// still renders.
async function loadFraunces(
  weight: number
): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Fraunces:wght@${weight}`,
      { headers: { "User-Agent": "Mozilla/5.0" } }
    ).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function Image() {
  const [medium, regular] = await Promise.all([loadFraunces(600), loadFraunces(400)]);
  const fonts = [
    medium && { name: "Fraunces", data: medium, weight: 600 as const, style: "normal" as const },
    regular && { name: "Fraunces", data: regular, weight: 400 as const, style: "normal" as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 400 | 600; style: "normal" }[];

  const serif = fonts.length ? "Fraunces" : "Georgia, serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: "#F2EBDC",
          fontFamily: serif,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28, marginBottom: 40 }}>
          <svg width="107" height="120" viewBox="0 0 48 54" fill="none">
            <g fill="#6E2A2A">
              <path d="M15.5,47 L15.5,34 Q15.5,26 23,26 L23,47 Z" />
              <path d="M32.5,47 L32.5,34 Q32.5,26 25,26 L25,47 Z" />
            </g>
            <g fill="#A9854B">
              <path d="M15.00,26.59 L9.01,26.46 L9.28,23.37 L15.21,24.28 Z" />
              <path d="M15.35,23.47 L9.47,22.30 L10.27,19.31 L15.95,21.23 Z" />
              <path d="M16.23,20.46 L10.64,18.28 L11.95,15.47 L17.21,18.36 Z" />
              <path d="M17.62,17.65 L12.49,14.53 L14.27,11.99 L18.95,15.75 Z" />
              <path d="M19.48,15.12 L14.97,11.16 L17.16,8.97 L21.12,13.48 Z" />
              <path d="M21.75,12.95 L17.99,8.27 L20.53,6.49 L23.65,11.62 Z" />
              <path d="M24.35,11.62 L27.47,6.49 L30.01,8.27 L26.25,12.95 Z" />
              <path d="M26.88,13.48 L30.84,8.97 L33.03,11.16 L28.52,15.12 Z" />
              <path d="M29.05,15.75 L33.73,11.99 L35.51,14.53 L30.38,17.65 Z" />
              <path d="M30.79,18.36 L36.05,15.47 L37.36,18.28 L31.77,20.46 Z" />
              <path d="M32.05,21.23 L37.73,19.31 L38.53,22.30 L32.65,23.47 Z" />
              <path d="M32.79,24.28 L38.72,23.37 L38.99,26.46 L33.00,26.59 Z" />
              <path d="M20.5,7.5 L27.5,7.5 L25.3,12.8 L22.7,12.8 Z" />
              <path d="M9.00,27.00 h6.00 v9.50 h-6.00 Z" />
              <path d="M9.00,37.50 h6.00 v9.50 h-6.00 Z" />
              <path d="M33.00,27.00 h6.00 v9.50 h-6.00 Z" />
              <path d="M33.00,37.50 h6.00 v9.50 h-6.00 Z" />
              <path d="M8.5,47 h7 v2 h1.5 v3 h-10 v-3 h1.5 Z" />
              <path d="M32.5,47 h7 v2 h1.5 v3 h-10 v-3 h1.5 Z" />
            </g>
          </svg>
          <div style={{ fontSize: 60, fontWeight: 600, color: "#2B2620", letterSpacing: 1 }}>
            Almonry
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
            fontSize: 92,
            fontWeight: 400,
            color: "#2B2620",
            lineHeight: 1.05,
          }}
        >
          <span>Where generosity is&nbsp;</span>
          <span style={{ color: "#6E2A2A", fontStyle: "italic" }}>kept</span>
          <span>.</span>
        </div>
        <div style={{ fontSize: 34, color: "#5A5246", marginTop: 36, maxWidth: 900, lineHeight: 1.35 }}>
          Donor management, online giving, and stewardship — built for community nonprofits.
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
