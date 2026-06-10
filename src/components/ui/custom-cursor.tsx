"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!cursorVisible) setCursorVisible(true);
    };

    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);

    document.addEventListener("mousemove", handleMouseMove);

    const updateElements = () => {
      const elements = document.querySelectorAll(
        "a, button, [data-cursor-hover], select, input, textarea",
      );
      elements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    };

    updateElements();

    const observer = new MutationObserver(updateElements);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
      const elements = document.querySelectorAll(
        "a, button, [data-cursor-hover], select, input, textarea",
      );
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [mouseX, mouseY, cursorVisible]);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed z-[9999]"
        style={{
          left: springX,
          top: springY,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          width: hovered ? 56 : 32,
          height: hovered ? 56 : 32,
          opacity: cursorVisible ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div
          className="w-full h-full rounded-full border"
          style={{
            borderColor: hovered
              ? "rgb(201, 168, 76)"
              : "rgba(201, 168, 76, 0.3)",
            transition: "border-color 0.3s ease",
          }}
        />
      </motion.div>
      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed z-[9999]"
        style={{
          left: springX,
          top: springY,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          width: hovered ? 4 : 6,
          height: hovered ? 4 : 6,
          opacity: cursorVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      >
        <div className="w-full h-full rounded-full bg-gold" />
      </motion.div>
    </>
  );
}
