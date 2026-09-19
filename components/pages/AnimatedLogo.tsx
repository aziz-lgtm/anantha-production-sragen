"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Animated owl mandala logo, rendered with three.js.
 *
 * - Texture is the provided owl PNG (white shape + alpha channel),
 *   tinted gold via MeshBasicMaterial.color so it matches the brand palette.
 * - Slow mandala-style spin + gentle breathing scale + soft float.
 * - A radial glow sprite sits behind it, and a ring of drifting gold
 *   sparkle particles orbits around it.
 * - Subtle pointer-parallax tilt (disabled if prefers-reduced-motion).
 * - Fully responsive: sizing is driven by the container's CSS size via
 *   ResizeObserver, so control size/position with className, not props.
 *
 * Usage:
 *   <AnimatedOwlLogo className="w-[240px] lg:w-[420px]" />
 */

const LOGO_SRC = "/owl-logo.png";
const GOLD = "#c6a15b";

export default function AnimatedOwlLogo({
  className = "",
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = container.clientWidth || 320;
    let height = container.clientHeight || 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    let disposed = false;

    // Group holding logo + glow + particles so they move together.
    const group = new THREE.Group();
    scene.add(group);

    // --- soft radial glow behind the mark -----------------------------
    const glowCanvas = document.createElement("canvas");
    glowCanvas.width = 256;
    glowCanvas.height = 256;
    const gctx = glowCanvas.getContext("2d")!;
    const gradient = gctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, "rgba(198,161,91,0.55)");
    gradient.addColorStop(0.5, "rgba(198,161,91,0.16)");
    gradient.addColorStop(1, "rgba(198,161,91,0)");
    gctx.fillStyle = gradient;
    gctx.fillRect(0, 0, 256, 256);
    const glowTexture = new THREE.CanvasTexture(glowCanvas);
    const glowMaterial = new THREE.SpriteMaterial({
      map: glowTexture,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const glowSprite = new THREE.Sprite(glowMaterial);
    glowSprite.scale.set(6.5, 6.5, 1);
    glowSprite.position.z = -0.3;
    group.add(glowSprite);

    // --- orbiting gold sparkle particles -------------------------------
    const PARTICLE_COUNT = 48;
    const particlePositions = new Float32Array(PARTICLE_COUNT * 3);
    const particleAngles: number[] = [];
    const particleRadii: number[] = [];
    const particleSpeeds: number[] = [];
    const particleHeights: number[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.5 + Math.random() * 1.3;
      const heightOffset = (Math.random() - 0.5) * 2.1;
      particleAngles.push(angle);
      particleRadii.push(radius);
      particleSpeeds.push(0.05 + Math.random() * 0.08);
      particleHeights.push(heightOffset);
      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = heightOffset;
      particlePositions[i * 3 + 2] = Math.sin(angle) * radius;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const sparkleCanvas = document.createElement("canvas");
    sparkleCanvas.width = 32;
    sparkleCanvas.height = 32;
    const sctx = sparkleCanvas.getContext("2d")!;
    const sGrad = sctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    sGrad.addColorStop(0, "rgba(243,236,221,1)");
    sGrad.addColorStop(1, "rgba(243,236,221,0)");
    sctx.fillStyle = sGrad;
    sctx.fillRect(0, 0, 32, 32);
    const sparkleTexture = new THREE.CanvasTexture(sparkleCanvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.09,
      map: sparkleTexture,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      opacity: 0.85,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    group.add(particles);

    // --- the owl mark itself --------------------------------------------
    const geometry = new THREE.PlaneGeometry(3.6, 3.6, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      transparent: true,
      color: new THREE.Color(GOLD),
      opacity: 0,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(geometry, material);
    group.add(mesh);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(LOGO_SRC, (tex) => {
      if (disposed) return;
      material.map = tex;
      material.opacity = 1;
      material.needsUpdate = true;
    });

    // --- pointer parallax -------------------------------------------------
    const pointer = { x: 0, y: 0 };
    const tilt = { x: 0, y: 0 };

    function handlePointerMove(e: PointerEvent) {
      const rect = container!.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      pointer.x = px * 2 - 1;
      pointer.y = py * 2 - 1;
    }
    if (!prefersReducedMotion) {
      window.addEventListener("pointermove", handlePointerMove);
    }

    const clock = new THREE.Clock();
    let frameId: number;

    function animate() {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // slow mandala spin
        mesh.rotation.z = t * 0.05;
        glowSprite.material.rotation = -t * 0.03;

        // gentle breathing scale + float
        group.scale.setScalar(1 + Math.sin(t * 0.6) * 0.02);
        group.position.y = Math.sin(t * 0.5) * 0.08;

        // orbiting particles
        const posAttr = particleGeometry.attributes
          .position as THREE.BufferAttribute;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const angle = particleAngles[i] + t * particleSpeeds[i];
          const radius = particleRadii[i];
          posAttr.setXYZ(
            i,
            Math.cos(angle) * radius,
            particleHeights[i] + Math.sin(t * 0.8 + i) * 0.15,
            Math.sin(angle) * radius
          );
        }
        posAttr.needsUpdate = true;

        // pointer parallax tilt, eased
        tilt.x += (pointer.y * 0.18 - tilt.x) * 0.04;
        tilt.y += (pointer.x * 0.22 - tilt.y) * 0.04;
        group.rotation.x = tilt.x;
        group.rotation.y = tilt.y;
      }

      renderer.render(scene, camera);
    }
    animate();

    // --- resize handling ---------------------------------------------------
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      width = entry.contentRect.width;
      height = entry.contentRect.height;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    resizeObserver.observe(container);

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
      resizeObserver.disconnect();

      geometry.dispose();
      material.map?.dispose();
      material.dispose();
      glowMaterial.dispose();
      glowTexture.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      sparkleTexture.dispose();
      renderer.dispose();

      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`aspect-square ${className}`}
      aria-hidden="true"
    />
  );
}