"use client";

import { fragmentShaderCode } from "@/components/shaders/smoke.glsl";
import { fragmentShaderCode2 } from "@/components/shaders/smoke2.glsl";
import { useApp } from "@/hooks/app";
import { useEffect, useRef } from "react";
import * as THREE from "three";

interface BackgroundAnimatedProps {
  color1?: string;
  color2?: string;
  vort_speed?: string;
}

export default function BackgroundAnimated({
  color1,
  color2,
  vort_speed,
}: BackgroundAnimatedProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { gameStarted } = useApp();

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const uniforms = {
      iTime: { value: 0 },
      iResolution: {
        value: new THREE.Vector3(window.innerWidth, window.innerHeight, 1),
      },
    };

    console.log({ gameStarted });

    const material = new THREE.ShaderMaterial({
      uniforms,
      fragmentShader: !gameStarted
        ? fragmentShaderCode({
            color1,
            color2,
            vort_speed,
          })
        : fragmentShaderCode2({
            color1: "71./255.,139./255., 110./255., 1",
            color2: "55./255.,112./255., 88./255., 1",
            vort_speed: "0.08",
          }),
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      uniforms.iTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };

    animate();

    // Clean up on unmount
    return () => {
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [gameStarted]);

  return <div className="absolute -z-10" ref={containerRef} />;
}
