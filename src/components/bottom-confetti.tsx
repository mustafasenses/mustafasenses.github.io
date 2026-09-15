"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

export function BottomConfetti() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const firedRef = useRef(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const fire = () => {
      const defaults = {
        origin: { x: 0.5, y: 0.75 },
        disableForReducedMotion: true,
      } as const;

      confetti({
        ...defaults,
        particleCount: 100,
        spread: 80,
        startVelocity: 35,
        scalar: 1,
      });
      confetti({
        ...defaults,
        particleCount: 60,
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 0.85,
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        if (entry.isIntersecting) {
          if (!firedRef.current) {
            firedRef.current = true;
            fire();
          }
          return;
        }

        firedRef.current = false;
      },
      { threshold: 0.6 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return <div ref={sentinelRef} aria-hidden className="h-px w-full" />;
}
