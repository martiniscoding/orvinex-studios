"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  alpha: number;
  /** 0 = white mote, 1 = violet mote */
  tint: number;
};

/** One mote per this many CSS px² of hero. Lower = denser. */
const DENSITY = 1500;
const MIN_COUNT = 350;
const MAX_COUNT = 1600;

function makeSprite(color: string) {
  const size = 64;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.12, "rgba(255,255,255,0.85)");
  grad.addColorStop(0.3, color.replace("ALPHA", "0.32"));
  grad.addColorStop(0.6, color.replace("ALPHA", "0.07"));
  grad.addColorStop(1, color.replace("ALPHA", "0"));
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  return c;
}

/**
 * The still starfield behind the hero.
 *
 * The motes used to drift, twinkle, and scatter away from the cursor. That is
 * gone: the field is painted once and then left alone, so there is no
 * requestAnimationFrame loop running for as long as the page is open. Nothing
 * competes with the page for main-thread time, and a laptop does not spin up
 * to render decoration.
 *
 * Canvas rather than a few hundred DOM nodes: at this count the browser is
 * being asked to lay out and composite a thousand elements otherwise, which is
 * expensive even when none of them move.
 */
export function DustField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const whiteSprite = makeSprite("rgba(226,232,255,ALPHA)");
    const violetSprite = makeSprite("rgba(139,92,246,ALPHA)");

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];

    const spawn = (): Particle => {
      const r = 0.45 + Math.pow(Math.random(), 1.7) * 1.6;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r,
        // Bigger motes read as closer, so they burn a little brighter. The
        // second factor is a fixed per-mote offset — what the twinkle used to
        // cycle through — so the field keeps its uneven, scattered look
        // instead of every dot sitting at the same brightness.
        alpha:
          (0.3 + (r / 2.05) * 0.62) * (0.45 + 0.55 * Math.random()),
        tint: Math.random() < 0.32 ? 1 : 0,
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        const sprite = p.tint ? violetSprite : whiteSprite;
        const size = p.r * 7;
        ctx.globalAlpha = Math.min(1, p.alpha);
        ctx.drawImage(sprite, p.x - size / 2, p.y - size / 2, size, size);
      }
      ctx.globalAlpha = 1;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const prevW = width;
      const prevH = height;

      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.round(
        Math.min(MAX_COUNT, Math.max(MIN_COUNT, (width * height) / DENSITY))
      );

      if (!particles.length) {
        particles = Array.from({ length: target }, () => spawn());
      } else {
        // Rescale the existing field into the new box rather than respawning,
        // so a window resize does not visibly rearrange the sky.
        const sx = prevW ? width / prevW : 1;
        const sy = prevH ? height / prevH : 1;
        for (const p of particles) {
          p.x *= sx;
          p.y *= sy;
        }
        while (particles.length < target) particles.push(spawn());
        if (particles.length > target) particles.length = target;
      }

      draw();
    };

    // Repaint on resize only; there is nothing else to react to.
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    return () => ro.disconnect();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{
        maskImage:
          "radial-gradient(ellipse 105% 95% at 50% 45%, #000 62%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 105% 95% at 50% 45%, #000 62%, transparent 100%)",
      }}
    />
  );
}
