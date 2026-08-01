"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  /** current velocity, px per 60fps-frame */
  vx: number;
  vy: number;
  /** the slow ambient drift it always settles back into */
  dx: number;
  dy: number;
  r: number;
  alpha: number;
  /** twinkle phase + speed */
  tw: number;
  tws: number;
  /** 0 = white mote, 1 = violet mote */
  tint: number;
};

/** One mote per this many CSS px² of hero. Lower = denser. */
const DENSITY = 1500;
const MIN_COUNT = 350;
const MAX_COUNT = 1600;

/** How far the cursor reaches, in CSS px. */
const CURSOR_RADIUS = 170;
/** Strength of the push away from the cursor. */
const PUSH = 1.9;
/** How much the cursor's own speed drags motes along in its wake. */
const WAKE = 0.1;
/** How quickly a disturbed mote eases back into its ambient drift. */
const SETTLE = 0.04;

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

export function DustField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const whiteSprite = makeSprite("rgba(226,232,255,ALPHA)");
    const violetSprite = makeSprite("rgba(139,92,246,ALPHA)");

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];

    // Cursor state, in CSS px relative to the canvas.
    const pointer = { x: -9999, y: -9999, vx: 0, vy: 0, active: false };

    const spawn = (p: Partial<Particle> = {}): Particle => {
      const r = 0.45 + Math.pow(Math.random(), 1.7) * 1.6;
      const drift = 0.018 + Math.random() * 0.055;
      const angle = Math.random() * Math.PI * 2;
      return {
        x: p.x ?? Math.random() * width,
        y: p.y ?? Math.random() * height,
        dx: Math.cos(angle) * drift,
        dy: Math.sin(angle) * drift - 0.012, // a faint upward bias
        vx: 0,
        vy: 0,
        r,
        // bigger motes read as closer, so they burn a little brighter
        alpha: 0.3 + (r / 2.05) * 0.62,
        tw: Math.random() * Math.PI * 2,
        tws: 0.008 + Math.random() * 0.026,
        tint: Math.random() < 0.32 ? 1 : 0,
      };
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
        // Keep the existing field, just rescale it into the new box.
        const sx = prevW ? width / prevW : 1;
        const sy = prevH ? height / prevH : 1;
        for (const p of particles) {
          p.x *= sx;
          p.y *= sy;
        }
        while (particles.length < target) particles.push(spawn());
        if (particles.length > target) particles.length = target;
      }
    };

    resize();

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        const speed = Math.hypot(p.vx, p.vy);
        // Motes flare a touch while they're being shoved around.
        const flare = Math.min(1, speed * 0.5);
        const a =
          p.alpha *
          (0.45 + 0.55 * (0.5 + 0.5 * Math.sin(p.tw))) *
          (1 + flare * 0.9);

        const sprite = p.tint ? violetSprite : whiteSprite;
        const size = p.r * 7 * (1 + flare * 0.25);
        ctx.globalAlpha = Math.min(1, a);
        ctx.drawImage(sprite, p.x - size / 2, p.y - size / 2, size, size);
      }
      ctx.globalAlpha = 1;
    };

    let raf = 0;
    let last = performance.now();

    const step = (now: number) => {
      // Normalised to a 60fps frame, clamped so a backgrounded tab
      // doesn't blow the field apart on return.
      const k = Math.min(3, (now - last) / 16.667);
      last = now;

      const r2 = CURSOR_RADIUS * CURSOR_RADIUS;

      for (const p of particles) {
        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < r2) {
            const d = Math.sqrt(d2) || 0.0001;
            const falloff = 1 - d / CURSOR_RADIUS;
            const f = falloff * falloff;
            // Push out of the way…
            p.vx += (dx / d) * f * PUSH * k;
            p.vy += (dy / d) * f * PUSH * k;
            // …and get dragged along in the cursor's wake.
            p.vx += pointer.vx * falloff * WAKE * k;
            p.vy += pointer.vy * falloff * WAKE * k;
          }
        }

        // Ease back toward the ambient drift.
        p.vx += (p.dx - p.vx) * SETTLE * k;
        p.vy += (p.dy - p.vy) * SETTLE * k;

        p.x += p.vx * k;
        p.y += p.vy * k;
        p.tw += p.tws * k;

        // Wrap around the edges so the field never empties out.
        const m = 24;
        if (p.x < -m) p.x = width + m;
        else if (p.x > width + m) p.x = -m;
        if (p.y < -m) p.y = height + m;
        else if (p.y > height + m) p.y = -m;
      }

      // Bleed off the pointer's velocity so a parked cursor stops stirring.
      pointer.vx *= 0.86;
      pointer.vy *= 0.86;

      draw();
      raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(step);
    };
    const stop = () => {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (pointer.active) {
        pointer.vx = x - pointer.x;
        pointer.vy = y - pointer.y;
      }
      pointer.x = x;
      pointer.y = y;
      // Only stir while the cursor is actually over the hero.
      pointer.active =
        x >= -CURSOR_RADIUS &&
        y >= -CURSOR_RADIUS &&
        x <= rect.width + CURSOR_RADIUS &&
        y <= rect.height + CURSOR_RADIUS;
    };

    const onPointerLeave = () => {
      pointer.active = false;
      pointer.vx = 0;
      pointer.vy = 0;
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (!reduced) start();
    };

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw();
    });
    ro.observe(canvas);

    // Don't burn frames while the hero is scrolled out of view.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (reduced) return;
        if (entry.isIntersecting && !document.hidden) start();
        else stop();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    if (reduced) {
      draw();
    } else {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerdown", onPointerMove, { passive: true });
      document.addEventListener("pointerleave", onPointerLeave);
      document.addEventListener("visibilitychange", onVisibility);
      start();
    }

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
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
