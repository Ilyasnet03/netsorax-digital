"use client";

import { useEffect, useRef, type ReactNode } from "react";

type AmbientGlowProps = {
  children: ReactNode;
  className: string;
};

export function AmbientGlow({ children, className }: AmbientGlowProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frame = 0;
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = element.getBoundingClientRect();
        element.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
        element.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
      });
    };

    element.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      element.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} className={className}>{children}</div>;
}
