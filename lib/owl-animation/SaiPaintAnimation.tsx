"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = {
  /** path to the owl PNG under /public, e.g. "/owl-new.png" */
  src?: string;
  className?: string;
  /** owl height as a fraction of ITS OWN container's height (this
   * component now fills whatever box its parent gives it, and centers
   * the owl inside that box -- see usage in Hero.tsx) */
  heightFraction?: number;
};

/**
 * Fully visible, hovering owl -- centered inside whatever box its parent
 * places it in. This component no longer tries to guess where the empty
 * space in the hero is; instead Hero.tsx gives it a dedicated container
 * that flexes: beside the text on large screens, below the text (full
 * width) on small screens. That's what makes it responsive and tidy on
 * every device -- real layout, not estimated coordinates.
 */
export default function FlyingOwl({
  src = "/owl-new.png",
  className,
  heightFraction = 0.82,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // world-space height visible at this camera distance -- constant
    // regardless of the container's pixel size, used to size the owl as
    // a fraction of the container rather than a fixed number
    const vFov = THREE.MathUtils.degToRad(camera.fov);
    const visibleHeight = 2 * Math.tan(vFov / 2) * camera.position.z;
    const owlWorldHeight = heightFraction * visibleHeight;

    const loader = new THREE.TextureLoader();
    const owlMaterial = new THREE.SpriteMaterial({ transparent: true });
    const owlSprite = new THREE.Sprite(owlMaterial);
    owlSprite.scale.set(owlWorldHeight, owlWorldHeight, 1);
    owlSprite.position.set(0, 0, 0); // dead center of its own container
    scene.add(owlSprite);

    loader.load(src, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      owlMaterial.map = texture;
      owlMaterial.needsUpdate = true;
      const aspect = texture.image.width / texture.image.height;
      owlSprite.scale.set(owlWorldHeight * aspect, owlWorldHeight, 1);
    });

    let raf = 0;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = (now - start) / 1000;
      const bob = Math.sin(elapsed * 0.9) * owlWorldHeight * 0.06;
      const sway = Math.sin(elapsed * 0.6) * owlWorldHeight * 0.025;
      const wobble = Math.sin(elapsed * 0.7) * 0.04;

      owlSprite.position.set(sway, bob, 0);
      owlMaterial.rotation = wobble;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const resizeObserver = new ResizeObserver(() => {
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      owlMaterial.map?.dispose();
      owlMaterial.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [src, heightFraction]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 ${className ?? ""}`}
      aria-hidden="true"
    />
  );
}