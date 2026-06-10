"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 60, filter: "blur(4px)" }),
    center: { opacity: 1, x: 0, filter: "blur(0px)" },
    exit: (dir: number) => ({ opacity: 0, x: dir * -60, filter: "blur(4px)" }),
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 px-6 lg:px-8 overflow-hidden"
    >
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-gradient-to-b from-bg via-gold/[0.02] to-bg pointer-events-none"
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <SectionHeading
          label="Client Voices"
          title="Trusted by the World's Most Discerning Clients"
          description="Hear from those who have entrusted us with their most significant investments."
        />

        <div className="relative min-h-[320px] lg:min-h-[260px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-center"
            >
              {/* Gold decorative quote mark */}
              <div className="flex justify-center mb-4">
                <svg width="40" height="32" viewBox="0 0 40 32" fill="none" className="text-gold/30">
                  <path d="M12 0C5.4 0 0 5.4 0 12v12h12V12H6c0-3.3 2.7-6 6-6V0zm22 0c-6.6 0-12 5.4-12 12v12h12V12h-6c0-3.3 2.7-6 6-6V0z" fill="currentColor" />
                </svg>
              </div>

              <div className="flex justify-center mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg
                    key={i}
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="mx-0.5 text-gold"
                  >
                    <path d="M8 0l2.5 5.1L16 5.9l-4 3.9.9 5.4L8 12.4l-4.9 2.8.9-5.4L0 5.9l5.5-.8L8 0z" />
                  </svg>
                ))}
              </div>

              <blockquote className="mt-4 font-heading text-xl lg:text-2xl text-text leading-relaxed italic">
                &ldquo;{t.content}&rdquo;
              </blockquote>

              <div className="mt-8 flex flex-col items-center gap-3">
                <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-gold/20">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-text">{t.name}</p>
                  <p className="text-xs text-text/50">
                    {t.title}, {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="group w-10 h-10 border border-border/50 flex items-center justify-center hover:border-gold transition-colors duration-300 text-text/50 hover:text-gold"
            aria-label="Previous testimonial"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M10 12L6 8l4-4" />
            </svg>
          </button>

          <div className="flex gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className={`h-[2px] transition-all duration-700 ${
                  i === current ? "w-8 bg-gold" : "w-4 bg-border hover:bg-gold/50"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="group w-10 h-10 border border-border/50 flex items-center justify-center hover:border-gold transition-colors duration-300 text-text/50 hover:text-gold"
            aria-label="Next testimonial"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 4l4 4-4 4" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
