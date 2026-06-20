import { writeFileSync } from "node:fs";
import sharp from "../node_modules/sharp/lib/index.js";

const BRASS = "#A9854B";
const OX = "#6E2A2A";

const cx = 24, springY = 26, jambBottom = 46;
const Ri = 22, t = 5.5, Ro = Ri + t; // inner span / thickness
const apexY = springY - Ri * Math.sin((60 * Math.PI) / 180); // ~7

const d2r = (d) => (d * Math.PI) / 180;
const pt = (c, r, deg) => [c[0] + r * Math.cos(d2r(deg)), c[1] + r * Math.sin(d2r(deg))];
const B = [cx + Ri / 2, springY]; // right inner springer = center of LEFT arc
const A = [cx - Ri / 2, springY]; // left inner springer  = center of RIGHT arc
const f = (n) => n.toFixed(2);

// --- voussoir stones around the two arcs ---
// left arc: center B, deg 180->240 ; right arc: center A, deg -60->0
const stones = [];
function arcStones(center, startDeg, endDeg, count, gapDeg) {
  const step = (endDeg - startDeg) / count;
  for (let i = 0; i < count; i++) {
    const a0 = startDeg + i * step + gapDeg / 2;
    const a1 = startDeg + (i + 1) * step - gapDeg / 2;
    const p1 = pt(center, Ri, a0);
    const p2 = pt(center, Ro, a0);
    const p3 = pt(center, Ro, a1);
    const p4 = pt(center, Ri, a1);
    stones.push(`M${f(p1[0])},${f(p1[1])} L${f(p2[0])},${f(p2[1])} L${f(p3[0])},${f(p3[1])} L${f(p4[0])},${f(p4[1])} Z`);
  }
}
arcStones(B, 180, 234, 5, 3.4); // left arc, stops short of apex
arcStones(A, -54, 0, 5, 3.4);   // right arc, stops short of apex

// keystone: one chunky stone bridging the apex between the two arcs
(function keystone() {
  const g = 1.6;
  const il = pt(B, Ri, 234 + g), ol = pt(B, Ro, 234 + g);
  const ir = pt(A, Ri, -54 - g), or = pt(A, Ro, -54 - g);
  stones.push(`M${f(il[0])},${f(il[1])} L${f(ol[0])},${f(ol[1])} L${f(or[0])},${f(or[1])} L${f(ir[0])},${f(ir[1])} Z`);
})();

// --- jamb (leg) stones: stacked rectangles below the spring line ---
function jamb(xOuter, xInner) {
  const x0 = Math.min(xOuter, xInner), w = Math.abs(xInner - xOuter);
  const n = 3, gap = 1.0;
  const total = jambBottom - springY;
  const h = (total - gap * (n - 1)) / n;
  for (let i = 0; i < n; i++) {
    const y = springY + i * (h + gap);
    stones.push(`M${f(x0)},${f(y)} h${f(w)} v${f(h)} h${f(-w)} Z`);
  }
}
jamb(cx - Ro / 2, cx - Ri / 2); // left leg  (outer 7.5 .. inner 13)
jamb(cx + Ro / 2, cx + Ri / 2); // right leg (inner 35 .. outer 40.5)

// --- base plinths (flared brass blocks) ---
const plinths = [
  `M${f(cx - Ro / 2 - 1.5)},46 h${f(w(cx - Ro / 2, cx - Ri / 2) + 3)} v4 h${f(-(w(cx - Ro / 2, cx - Ri / 2) + 3))} Z`,
  `M${f(cx + Ri / 2 - 1.5)},46 h${f(w(cx + Ri / 2, cx + Ro / 2) + 3)} v4 h${f(-(w(cx + Ri / 2, cx + Ro / 2) + 3))} Z`,
];
function w(a, b) { return Math.abs(b - a); }

// --- two oxblood lancet doors with a central pillar gap ---
const doors = [
  `M14.5,46 L14.5,30 Q14.5,22 18.75,22 Q23,22 23,30 L23,46 Z`,
  `M25,46 L25,30 Q25,22 29.25,22 Q33.5,22 33.5,30 L33.5,46 Z`,
];

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="54" viewBox="0 0 48 54" fill="none" role="img" aria-label="Almonry">
  <g fill="${OX}">${doors.map((d) => `<path d="${d}"/>`).join("")}</g>
  <g fill="${BRASS}">${[...stones, ...plinths].map((d) => `<path d="${d}"/>`).join("")}</g>
</svg>`;

writeFileSync(new URL("./_arch_gen.svg", import.meta.url), svg);
await sharp(Buffer.from(svg)).resize(240).png().toFile(new URL("./_arch_240.png", import.meta.url).pathname.slice(1));
await sharp(Buffer.from(svg)).resize(40).png().toFile(new URL("./_arch_40.png", import.meta.url).pathname.slice(1));
console.log("ok");
