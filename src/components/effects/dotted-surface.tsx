"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

type DottedSurfaceProps = Omit<React.ComponentProps<"div">, "ref">;

function createTopoContour(
  radius: number,
  yBase: number,
  segments: number,
  wobble: number,
): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    const r = radius + Math.sin(theta * 4) * wobble;
    pts.push(
      new THREE.Vector3(
        Math.cos(theta) * r,
        yBase + Math.sin(theta * 3) * wobble * 0.4,
        Math.sin(theta) * r,
      ),
    );
  }
  return pts;
}

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ── Scene ──
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xfaf8f3, 600, 2500);

    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      1,
      4000,
    );
    camera.position.set(180, 260, 780);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xfaf8f3, 1);
    container.appendChild(renderer.domElement);

    const C = { gold: 0xc9a84c, bronze: 0x8b7355, ivory: 0xf5f1ea };

    // ── Mouse ──
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const onMouse = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    // ── 1. Blueprint Grid ──
    const gridGroup = new THREE.Group();
    const gridMat = new THREE.LineBasicMaterial({
      color: C.gold,
      transparent: true,
      opacity: 0.06,
    });

    const half = 500;
    const step = 50;
    for (let i = -half; i <= half; i += step) {
      const ha = [
        new THREE.Vector3(i, -70, -half),
        new THREE.Vector3(i, -70, half),
      ];
      const va = [
        new THREE.Vector3(-half, -70, i),
        new THREE.Vector3(half, -70, i),
      ];
      gridGroup.add(
        new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(ha),
          gridMat,
        ),
      );
      gridGroup.add(
        new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(va),
          gridMat,
        ),
      );
    }

    // Radial blueprint rings
    const ringMat = new THREE.LineBasicMaterial({
      color: C.bronze,
      transparent: true,
      opacity: 0.04,
    });
    for (let r = 1; r <= 4; r++) {
      const pts: THREE.Vector3[] = [];
      const rad = r * 120;
      for (let a = 0; a <= 64; a++) {
        const t = (a / 64) * Math.PI * 2;
        pts.push(
          new THREE.Vector3(
            Math.cos(t) * rad,
            -70,
            Math.sin(t) * rad,
          ),
        );
      }
      gridGroup.add(
        new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(pts),
          ringMat,
        ),
      );
    }

    // Crosshair axes
    const axisMat = new THREE.LineBasicMaterial({
      color: C.gold,
      transparent: true,
      opacity: 0.08,
    });
    const axLen = 80;
    const axPts = [
      new THREE.Vector3(-axLen, -70, 0),
      new THREE.Vector3(axLen, -70, 0),
    ];
    const ayPts = [
      new THREE.Vector3(0, -70, -axLen),
      new THREE.Vector3(0, -70, axLen),
    ];
    gridGroup.add(
      new THREE.Line(new THREE.BufferGeometry().setFromPoints(axPts), axisMat),
    );
    gridGroup.add(
      new THREE.Line(new THREE.BufferGeometry().setFromPoints(ayPts), axisMat),
    );

    scene.add(gridGroup);

    // ── 2. Topographic Contours ──
    const contourGroup = new THREE.Group();
    const contours: {
      line: THREE.Line;
      restPos: Float32Array;
      speed: number;
      phase: number;
    }[] = [];

    for (let r = 0; r < 12; r++) {
      const radius = 100 + r * 60;
      const yBase = -50 + r * 8;
      const pts = createTopoContour(radius, yBase, 64, 12 + r * 2);

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({
        color: r % 3 === 0 ? C.gold : r % 3 === 1 ? C.bronze : C.ivory,
        transparent: true,
        opacity: 0.06 + r * 0.006,
      });
      const line = new THREE.Line(geo, mat);
      contourGroup.add(line);

      const posArr = new Float32Array(geo.attributes.position.array as Float32Array);
      contours.push({
        line,
        restPos: posArr,
        speed: 0.006 + r * 0.0015,
        phase: r * 0.6,
      });
    }
    scene.add(contourGroup);

    // ── 3. Glass Tower Silhouettes ──
    const towerGroup = new THREE.Group();
    const towers = [
      { x: -280, z: -160, w: 36, h: 220, d: 36 },
      { x: -200, z: -220, w: 24, h: 160, d: 24 },
      { x: 220, z: -200, w: 40, h: 280, d: 40 },
      { x: 310, z: -130, w: 28, h: 190, d: 28 },
      { x: -70, z: -280, w: 20, h: 130, d: 20 },
      { x: 120, z: -250, w: 26, h: 170, d: 26 },
      { x: -350, z: -80, w: 22, h: 140, d: 22 },
    ];

    towers.forEach((t) => {
      const geo = new THREE.BoxGeometry(t.w, t.h, t.d);
      const mat = new THREE.MeshPhongMaterial({
        color: C.ivory,
        transparent: true,
        opacity: 0.05,
        specular: C.gold,
        shininess: 80,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(t.x, -70 + t.h / 2, t.z);

      const edges = new THREE.EdgesGeometry(geo);
      const edgeMat = new THREE.LineBasicMaterial({
        color: C.gold,
        transparent: true,
        opacity: 0.06,
      });
      const wire = new THREE.LineSegments(edges, edgeMat);
      wire.position.copy(mesh.position);

      towerGroup.add(mesh);
      towerGroup.add(wire);

      // Horizontal floor lines
      const floorMat = new THREE.LineBasicMaterial({
        color: C.gold,
        transparent: true,
        opacity: 0.04,
      });
      for (let f = 1; f < 6; f++) {
        const fy = -70 + (t.h / 6) * f;
        const fp = [
          new THREE.Vector3(t.x - t.w / 2, fy, t.z),
          new THREE.Vector3(t.x + t.w / 2, fy, t.z),
        ];
        towerGroup.add(
          new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(fp),
            floorMat,
          ),
        );
      }
    });
    scene.add(towerGroup);

    // ── 4. Floating Glass Surfaces ──
    const glassGroup = new THREE.Group();
    const glassSurfaces: {
      mesh: THREE.Mesh;
      floatSpeed: number;
      floatAmp: number;
      phase: number;
      rotY: number;
      baseY: number;
    }[] = [];

    for (let i = 0; i < 18; i++) {
      const w = 50 + Math.random() * 120;
      const h = 30 + Math.random() * 80;
      const geo = new THREE.PlaneGeometry(w, h);
      const mat = new THREE.MeshBasicMaterial({
        color: C.gold,
        transparent: true,
        opacity: 0.02,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(geo, mat);

      const angle = Math.random() * Math.PI * 2;
      const radius = 200 + Math.random() * 400;
      const baseY = -30 + Math.random() * 180;
      mesh.position.set(
        Math.cos(angle) * radius,
        baseY,
        Math.sin(angle) * radius,
      );
      mesh.rotation.x = (Math.random() - 0.5) * 0.4;
      mesh.rotation.z = (Math.random() - 0.5) * 0.3;
      mesh.rotation.y = Math.random() * Math.PI * 2;

      glassGroup.add(mesh);
      glassSurfaces.push({
        mesh,
        floatSpeed: 0.002 + Math.random() * 0.004,
        floatAmp: 2 + Math.random() * 4,
        phase: Math.random() * Math.PI * 2,
        rotY: (Math.random() - 0.5) * 0.0004,
        baseY,
      });
    }
    scene.add(glassGroup);

    // ── 5. Measurement / Dimension Lines ──
    const measGroup = new THREE.Group();
    const measMat = new THREE.LineBasicMaterial({
      color: C.bronze,
      transparent: true,
      opacity: 0.03,
    });
    for (let i = -3; i <= 3; i++) {
      if (i === 0) continue;
      const xPos = i * 150;
      const pts = [
        new THREE.Vector3(xPos, -70, 0),
        new THREE.Vector3(xPos, -60, 0),
      ];
      measGroup.add(
        new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(pts),
          measMat,
        ),
      );
    }
    scene.add(measGroup);

    // ── Lights ──
    const ambient = new THREE.AmbientLight(0xfaf8f3, 0.6);
    scene.add(ambient);
    const d1 = new THREE.DirectionalLight(0xc9a84c, 0.25);
    d1.position.set(150, 300, 200);
    scene.add(d1);
    const d2 = new THREE.DirectionalLight(0xf5f1ea, 0.15);
    d2.position.set(-100, 150, -200);
    scene.add(d2);

    // ── Animation ──
    let time = 0;
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 0.002;

      target.x += (mouse.x - target.x) * 0.012;
      target.y += (mouse.y - target.y) * 0.012;

      camera.position.x = 180 + target.x * 50;
      camera.position.y = 260 - target.y * 35;
      camera.lookAt(0, 0, 0);

      // Contour waves
      contours.forEach(({ line, restPos, speed, phase }) => {
        const pos = line.geometry.attributes.position;
        const arr = pos.array as Float32Array;
        for (let i = 0; i < arr.length; i += 3) {
          const bx = restPos[i];
          const bz = restPos[i + 2];
          const dist = Math.sqrt(bx * bx + bz * bz);
          arr[i + 1] =
            restPos[i + 1] +
            Math.sin(dist * 0.015 + time * speed * 8 + phase) * (8 + dist * 0.01);
        }
        pos.needsUpdate = true;
      });

      // Float glass
      glassSurfaces.forEach(({ mesh, floatSpeed, floatAmp, phase, rotY, baseY }) => {
        mesh.position.y =
          baseY + Math.sin(time * floatSpeed * 10 + phase) * floatAmp;
        mesh.rotation.y += rotY;
      });

      gridGroup.rotation.y = Math.sin(time * 0.04) * 0.03;
      towerGroup.rotation.y = Math.sin(time * 0.035) * 0.04;
      contourGroup.rotation.y = time * 0.005;
      glassGroup.rotation.y = time * 0.003;

      renderer.render(scene, camera);
    };

    animate();

    // ── Resize ──
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("pointer-events-none fixed inset-0", className)}
      style={{ zIndex: 0 }}
      {...props}
    />
  );
}
