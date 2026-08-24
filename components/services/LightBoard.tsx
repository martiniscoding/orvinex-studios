"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

/**
 * Lights every `[data-card]` beneath it from a single cursor-tracked source.
 *
 * One listener for the whole board rather than one per card: each card is
 * handed the cursor in its own coordinates, so the glow reads as a single
 * sheet of light moving underneath them instead of separate per-card effects.
 */
export function LightBoard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const point = useRef({ x: 0, y: 0 });

  const handleMove = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    point.current = { x: e.clientX, y: e.clientY };
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const cards =
        rootRef.current?.querySelectorAll<HTMLElement>("[data-card]");
      cards?.forEach((card) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--x", `${point.current.x - rect.left}px`);
        card.style.setProperty("--y", `${point.current.y - rect.top}px`);
      });
    });
  }, []);

  const setActive = useCallback((on: boolean) => {
    rootRef.current?.style.setProperty("--active", on ? "1" : "0");
  }, []);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  return (
    <div
      ref={rootRef}
      onPointerMove={handleMove}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
      className={className}
    >
      {children}
    </div>
  );
}
