"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  label,
  title,
  description,
  className,
  align = "center",
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  });

  const labelOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0, 1]);
  const labelY = useTransform(scrollYProgress, [0, 0.3, 1], [30, 30, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 1], [0, 0, 0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.2, 0.5, 1], [40, 40, 40, 0]);
  const descOpacity = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [0, 0, 0, 1]);
  const descY = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [20, 20, 20, 0]);
  const lineScale = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, 1]);

  return (
    <div
      ref={ref}
      className={cn(
        "max-w-2xl mb-16 lg:mb-20",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <motion.span
        style={{ opacity: labelOpacity, y: labelY }}
        className="inline-block text-xs tracking-[0.25em] uppercase text-gold mb-4 overflow-hidden"
      >
        <motion.span
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="inline-block"
        >
          {label}
        </motion.span>
      </motion.span>

      <motion.h2
        style={{ opacity: titleOpacity, y: titleY }}
        className="font-heading text-4xl lg:text-5xl xl:text-6xl text-text leading-tight overflow-hidden"
      >
        {title.split(" ").map((word, i) => (
          <motion.span
            key={i}
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.15 + i * 0.08,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="inline-block mr-[0.3em]"
          >
            {word}
          </motion.span>
        ))}
      </motion.h2>

      {description && (
        <motion.p
          style={{ opacity: descOpacity, y: descY }}
          className="mt-6 text-base lg:text-lg text-text/60 leading-relaxed"
        >
          {description}
        </motion.p>
      )}

      <motion.div
        style={{ scaleX: lineScale }}
        className={cn(
          "h-[1px] bg-gold mt-6 origin-left",
          align === "center" && "mx-auto",
        )}
      />
    </div>
  );
}
