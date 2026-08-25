"use client";

import { useEffect } from "react";

/**
 * Fades `.reveal` blocks in as they scroll into view.
 *
 * The hidden state lives behind an `html.js` class that this component adds on
 * mount, so with scripting off — or if this never runs — the CSS leaves every
 * block fully visible rather than blanking the page.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");

    const targets = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const showAll = () => targets.forEach((el) => el.classList.add("is-in"));

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      showAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          obs.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0.05 },
    );

    targets.forEach((el) => observer.observe(el));

    // Safety net for tabs that never composite, so nothing stays invisible.
    const fallback = window.setTimeout(showAll, 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return null;
}
