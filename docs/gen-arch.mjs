import { writeFileSync } from "node:fs";
import sharp from "../node_modules/sharp/lib/index.js";

const BRASS = "#A9854B";
const OX = "#6E2A2A";

// geometry (viewBox 48 x 54)
const springY = 27, jambBottom = 47;
const Ri = 18, Ro = 24;            // inner / outer arch radius
const BL = [15, springY];          // left inner springer  (center of RIGHT arc)
const BR = [33, springY];          // right inner springer (center of LEFT arc)

const d2r = (d) => (d * Math.PI) / 180;
const pt = (c, r, deg) => [c[0] + r * Math.cos(d2r(deg)), c[1] + r * Math.sin(d2r(deg))];
const f = (n) => n.toFixed(2);
const quad = (p) => `M${f(p[0][0])},${f(p[0][1])} L${f(p[1][0])},${f(p[1][1])} L${f(p[2][0])},${f(p[2][1])} L${f(p[3][0])},${f(p[3][1])} Z`;

const stones = [];

// curved voussoirs, stopping short of the apex to leave room for the keystone
function arcStones(center, startDeg, endDeg, count, gapDeg) {
  const step = (endDeg - startDeg) / count;
  for (let i = 0; i < count; i++) {
    const a0 = startDeg + i * step + gapDeg / 2;
    const a1 = startDeg + (i + 1) * step - gapDeg / 2;
    stones.push(quad([pt(center, Ri, a0), pt(center, Ro, a0), pt(center, Ro, a1), pt(center, Ri, a1)]));
  }
}
arcStones(BR, 180, 240, 6, 2.6); // left half (to the apex)
arcStones(BL, -60, 0, 6, 2.6);   // right half (to the apex)

// keystone — a moderately-flared stone seated at the top center
stones.push(`M20.5,7.5 L27.5,7.5 L25.3,12.8 L22.7,12.8 Z`);

// jamb (leg) stones: two per side
function jamb(xOuter, xInner) {
  const x0 = Math.min(xOuter, xInner), w = Math.abs(xInner - xOuter);
  const n = 2, gap = 1.0;
  const h = (jambBottom - springY - gap * (n - 1)) / n;
  for (let i = 0; i < n; i++) {
    const y = springY + i * (h + gap);
    stones.push(`M${f(x0)},${f(y)} h${f(w)} v${f(h)} h${f(-w)} Z`);
  }
}
jamb(9, 15);
jamb(39, 33);

// stepped / molded plinth bases
const plinths = [
  `M8.5,47 h7 v2 h1.5 v3 h-10 v-3 h1.5 Z`,   // left  (riser + wider footing)
  `M32.5,47 h7 v2 h1.5 v3 h-10 v-3 h1.5 Z`,  // right
];

// two oxblood doors: outer edge short, curving up to a tall inner edge; a
// narrow central pillar of background shows between them
const doors = [
  `M15.5,47 L15.5,34 Q15.5,26 23,26 L23,47 Z`,
  `M32.5,47 L32.5,34 Q32.5,26 25,26 L25,47 Z`,
];

const body = `
  <g fill="${OX}">${doors.map((d) => `<path d="${d}"/>`).join("")}</g>
  <g fill="${BRASS}">${[...stones, ...plinths].map((d) => `<path d="${d}"/>`).join("")}</g>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="54" viewBox="0 0 48 54" fill="none">${body}</svg>`;

writeFileSync(new URL("./_arch_gen.svg", import.meta.url), svg);
const out = (p) => new URL(p, import.meta.url).pathname.slice(1);
await sharp(Buffer.from(svg)).resize(260).png().toFile(out("./_arch_260.png"));
await sharp(Buffer.from(svg)).resize(40).png().toFile(out("./_arch_40.png"));
console.log("ok");
