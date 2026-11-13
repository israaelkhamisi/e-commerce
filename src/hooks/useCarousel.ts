"use client";

import { useCallback, useEffect, useState } from "react";

// Slide index with autoplay; autoplay pauses while paused is true and restarts on every change
export function useCarousel(count: number, intervalMs = 5000) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || count < 2) return;
    const id = setTimeout(() => setActive((i) => (i + 1) % count), intervalMs);
    return () => clearTimeout(id);
  }, [active, paused, count, intervalMs]);

  const go = useCallback((step: number) => setActive((i) => (i + step + count) % count), [count]);

  return {
    active,
    goTo: setActive,
    next: () => go(1),
    prev: () => go(-1),
    pause: () => setPaused(true),
    resume: () => setPaused(false),
  };
}
