"use client";

import { useEffect, useRef } from "react";

// A single point of light in the field. Each one drifts slowly upward like
// a floating lantern and warms up when the cursor passes near it.
type Light = {
  x: number;
  y: number;
  vy: number;
  radius: number;
  phase: number;
  twinkleSpeed: number;
};

/**
 * Fixed, full-viewport interactive light field. Mount this ONCE — in
 * app/layout.tsx, above {children} — and every section that sits on top
 * of it with a transparent (or semi-transparent dark) background will
 * share the same continuous field as the page scrolls.
 *
 * Do not render this inside individual sections: each instance opens its
 * own animation loop and mouse listener, so mounting it more than once
 * wastes cycles and desyncs the light positions between sections.
 */
export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let lights: Light[] = [];
    let animationFrame = 0;
    let time = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const buildLights = () => {
      const area = width * height;
      const count = Math.min(220, Math.round(area / 9000));
      lights = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vy: 0.08 + Math.random() * 0.18,
        radius: 0.8 + Math.random() * 1.8,
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.4 + Math.random() * 0.6,
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      buildLights();
    };

    const draw = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      const glowA = {
        x: width * 0.22 + Math.sin(time * 0.0016) * 60,
        y: height * 0.3 + Math.cos(time * 0.0013) * 40,
      };
      const glowB = {
        x: width * 0.78 + Math.cos(time * 0.0011) * 70,
        y: height * 0.7 + Math.sin(time * 0.0017) * 50,
      };
      for (const g of [
        { ...glowA, color: "199, 164, 90", r: Math.max(width, height) * 0.4 },
        { ...glowB, color: "122, 140, 118", r: Math.max(width, height) * 0.35 },
      ]) {
        const grad = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, g.r);
        grad.addColorStop(0, `rgba(${g.color}, 0.10)`);
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      const mx = mouse.current.x;
      const my = mouse.current.y;
      const reach = 170;

      for (const light of lights) {
        light.y -= light.vy;
        if (light.y < -10) {
          light.y = height + 10;
          light.x = Math.random() * width;
        }

        const dx = light.x - mx;
        const dy = light.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - dist / reach);

        const twinkle =
          0.35 + 0.25 * Math.sin(time * 0.02 * light.twinkleSpeed + light.phase);
        const alpha = Math.min(1, twinkle + proximity * 0.8);
        const radius = light.radius + proximity * 2.4;

        ctx.beginPath();
        const glow = ctx.createRadialGradient(
          light.x,
          light.y,
          0,
          light.x,
          light.y,
          radius * 4
        );
        glow.addColorStop(0, `rgba(232, 199, 122, ${alpha})`);
        glow.addColorStop(1, "rgba(232, 199, 122, 0)");
        ctx.fillStyle = glow;
        ctx.arc(light.x, light.y, radius * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = `rgba(245, 236, 214, ${Math.min(1, alpha + 0.2)})`;
        ctx.arc(light.x, light.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      if (mx > -1000) {
        const near = lights.filter((l) => {
          const dx = l.x - mx;
          const dy = l.y - my;
          return dx * dx + dy * dy < reach * reach;
        });
        for (let i = 0; i < near.length; i++) {
          for (let j = i + 1; j < near.length; j++) {
            const a = near[i];
            const b = near[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 90) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(198, 161, 91, ${0.25 * (1 - d / 90)})`;
              ctx.lineWidth = 1;
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }

      animationFrame = requestAnimationFrame(draw);
    };

    // Track the mouse across the whole window, not just the canvas — the
    // canvas is pointer-events-none so clicks pass through to content.
    const handleMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    const handleLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };
    const handleTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        mouse.current = { x: touch.clientX, y: touch.clientY };
      }
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    window.addEventListener("touchmove", handleTouch);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("touchmove", handleTouch);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen bg-[#0b1410]"
      aria-hidden="true"
    />
  );
}