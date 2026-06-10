"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  label: string;
  delay?: number;
}

export function AnimatedCounter({ value, label, delay = 0 }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayed, setDisplayed] = useState("0");
  const [done, setDone] = useState(false);

  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
  const isCurrency = value.startsWith("$");

  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      const duration = 2200;
      const steps = 60;
      const increment = numericValue / steps;
      let current = 0;
      let step = 0;

      const interval = setInterval(() => {
        step++;
        current = Math.min(increment * step, numericValue);
        const formatted = isCurrency
          ? `$${(current / 1e6).toFixed(1)}B+`
          : `${Math.round(current)}+`;
        setDisplayed(formatted);

        if (step >= steps) {
          setDisplayed(value);
          setDone(true);
          clearInterval(interval);
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [isInView, numericValue, value, delay, isCurrency]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <p className="font-heading text-4xl lg:text-5xl text-gold">{displayed}</p>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={done ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="h-[1px] bg-gold/30 w-8 mx-auto mt-2"
      />
      <p className="mt-3 text-sm tracking-[0.15em] uppercase text-text/50">
        {label}
      </p>
    </motion.div>
  );
}
