"use client";

import { useEffect } from "react";

/**
 * Scroll-reveal observer — ported from the reference HTML's inline script.
 * Adds the `in` class to `.reveal` elements as they enter the viewport.
 * The reduced-motion case is handled in CSS (the .reveal elements are shown
 * with no transition), so this is purely progressive enhancement.
 */
export default function Reveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal:not(.in)");
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
