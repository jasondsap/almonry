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
        <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 40 }}>
          <svg width="84" height="88" viewBox="0 0 36 38" fill="none">
            <path d="M18 8C13 4 7 4 4 6v26c3-2 9-2 14 2" stroke="#6E2A2A" strokeWidth="2.2" strokeLinejoin="round" />
            <path d="M18 8c5-4 11-4 14-2v26c-3-2-9-2-14 2" stroke="#A9854B" strokeWidth="2.2" strokeLinejoin="round" />
            <path d="M18 8v26" stroke="#2B2620" strokeWidth="1.3" opacity="0.5" />
            <circle cx="18" cy="6" r="2.4" fill="#A9854B" />
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
