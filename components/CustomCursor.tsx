"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor for pointer devices: replaces the system arrow with a soft
 * warm orb, like a hand-carried lantern drifting through the venue. The
 * glow trails slightly behind the real pointer with easing (a gentle
 * swing), while a small bright core stays pinned exactly on the pointer
 * for precision. Both flicker faintly, like a live flame, and brighten on
 * hover over links and buttons.
 *
 * Mount this once at the layout level, alongside InteractiveBackground —
 * it's designed to sit on the same dark, gold-lit background. It does
 * nothing on touch/coarse-pointer devices, where there is no cursor to
 * replace.
 */
export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const hoverScale = useRef(1);
  const raf = useRef(0);

  useEffect(() => {
    const isFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    if (!isFinePointer) return;

    document.documentElement.classList.add("custom-cursor-active");

    const showCursor = () => {
      outerRef.current?.style.setProperty("opacity", "1");
      coreRef.current?.style.setProperty("opacity", "1");
    };
    const hideCursor = () => {
      outerRef.current?.style.setProperty("opacity", "0");
      coreRef.current?.style.setProperty("opacity", "0");
    };

    const handleMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      showCursor();
    };

    // document-level mouseleave fires only when the pointer actually
    // exits the viewport, unlike bubbling "mouseout" on individual elements
    document.addEventListener("mouseleave", hideCursor);

    const interactiveSelector = "a, button, [role='button'], input, textarea, select";
    const handleOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(interactiveSelector)) {
        hoverScale.current = 1.7;
      }
    };
    const handleOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(interactiveSelector)) {
        hoverScale.current = 1;
      }
    };

    let time = 0;
    const loop = () => {
      time += 1;
      // ease the glow toward the real pointer for a gentle lantern-swing lag
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;

      // subtle flicker, like a live flame, layered from two sine waves
      const flicker =
        1 + 0.06 * Math.sin(time * 0.18) + 0.03 * Math.sin(time * 0.5 + 1.3);
      const outerScale = flicker * hoverScale.current;

      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%) scale(${outerScale})`;
      }
      if (coreRef.current) {
        coreRef.current.style.transform = `translate(${target.current.x}px, ${target.current.y}px) translate(-50%, -50%) scale(${flicker})`;
      }

      raf.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    raf.current = requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", hideCursor);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, []);

  return (
    <>
      {/* hides the system cursor site-wide while this component is mounted,
          only applied on fine-pointer devices via the class toggle above */}
      <style>{`
        .custom-cursor-active, .custom-cursor-active * {
          cursor: none !important;
        }
      `}</style>

      <div
        ref={outerRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-10 w-10 rounded-full opacity-0 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(circle, rgba(232,199,122,0.55) 0%, rgba(232,199,122,0.18) 45%, rgba(232,199,122,0) 75%)",
          mixBlendMode: "screen",
          filter: "blur(2px)",
        }}
      />
      <div
        ref={coreRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 rounded-full opacity-0 transition-opacity duration-300"
        style={{
          background: "#f8ecd2",
          boxShadow: "0 0 8px 2px rgba(248,236,210,0.9)",
        }}
      />
    </>
  );
}