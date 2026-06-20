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
              <path d="M14.5,46 L14.5,30 Q14.5,22 18.75,22 Q23,22 23,30 L23,46 Z" />
              <path d="M25,46 L25,30 Q25,22 29.25,22 Q33.5,22 33.5,30 L33.5,46 Z" />
            </g>
            <g fill="#A9854B">
              <path d="M13.01,25.35 L7.51,25.18 L7.85,21.65 L13.28,22.52 Z" />
              <path d="M13.52,21.24 L8.15,20.05 L9.14,16.64 L14.31,18.51 Z" />
              <path d="M14.79,17.30 L9.74,15.12 L11.35,11.96 L16.08,14.77 Z" />
              <path d="M16.78,13.67 L12.23,10.58 L14.40,7.78 L18.52,11.42 Z" />
              <path d="M19.42,10.47 L15.52,6.59 L18.18,4.24 L21.55,8.59 Z" />
              <path d="M26.45,8.59 L29.82,4.24 L32.48,6.59 L28.58,10.47 Z" />
              <path d="M29.48,11.42 L33.60,7.78 L35.77,10.58 L31.22,13.67 Z" />
              <path d="M31.92,14.77 L36.65,11.96 L38.26,15.12 L33.21,17.30 Z" />
              <path d="M33.69,18.51 L38.86,16.64 L39.85,20.05 L34.48,21.24 Z" />
              <path d="M34.72,22.52 L40.15,21.65 L40.49,25.18 L34.99,25.35 Z" />
              <path d="M22.57,7.85 L19.46,3.31 L28.54,3.31 L25.43,7.85 Z" />
              <path d="M10.25,26.00 h2.75 v6.00 h-2.75 Z" />
              <path d="M10.25,33.00 h2.75 v6.00 h-2.75 Z" />
              <path d="M10.25,40.00 h2.75 v6.00 h-2.75 Z" />
              <path d="M35.00,26.00 h2.75 v6.00 h-2.75 Z" />
              <path d="M35.00,33.00 h2.75 v6.00 h-2.75 Z" />
              <path d="M35.00,40.00 h2.75 v6.00 h-2.75 Z" />
              <path d="M8.75,46 h5.75 v4 h-5.75 Z" />
              <path d="M33.50,46 h5.75 v4 h-5.75 Z" />
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
