"use client";

import { useRef } from "react";
import type { Variants } from "framer-motion";
import { motion, useScroll, useTransform } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { STATS } from "@/lib/constants";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroParallax = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 lg:px-8 overflow-hidden"
    >
      {/* Atmospheric depth layers */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: overlayOpacity }}
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gold/3 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-gold/2 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-gold/2 blur-2xl" />
      </motion.div>

      {/* Gold light sweep */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="animate-gold-sweep absolute top-0 -left-[50%] w-[50%] h-full bg-gradient-to-r from-transparent via-gold/5 to-transparent skew-x-12" />
      </div>

      {/* Floating gold geometric frame left */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="hidden lg:block absolute left-8 top-1/3 pointer-events-none"
      >
        <div className="float-slow w-[1px] h-32 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
        <div className="float-slow ml-4 w-4 h-4 border border-gold/20 rotate-45" />
      </motion.div>

      {/* Floating gold geometric frame right */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className="hidden lg:block absolute right-12 bottom-1/3 pointer-events-none"
      >
        <div className="w-[1px] h-24 bg-gradient-to-b from-gold/20 to-transparent mx-auto" />
        <div className="w-3 h-3 border border-gold/15 rotate-45 mt-2 mx-auto" />
      </motion.div>

      {/* Corner bracket top-right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="hidden lg:block absolute top-12 right-12 pointer-events-none"
      >
        <div className="w-12 h-[1px] bg-gold/20" />
        <div className="w-[1px] h-12 bg-gold/20 -mt-[1px] ml-auto" />
      </motion.div>

      {/* Corner bracket bottom-left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="hidden lg:block absolute bottom-12 left-12 pointer-events-none"
      >
        <div className="w-12 h-[1px] bg-gold/20 ml-auto" />
        <div className="w-[1px] h-12 bg-gold/20" />
      </motion.div>

      <motion.div
        style={{ y: heroParallax }}
        className="relative z-10 w-full pt-28 lg:pt-32"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto text-center"
        >
          <motion.span
            variants={itemVariants}
            className="inline-block text-xs tracking-[0.3em] uppercase text-gold mb-6 lg:mb-8 overflow-hidden"
          >
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="inline-block"
            >
              Dubai&apos;s Premier Luxury Real Estate
            </motion.span>
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-text leading-[0.95] tracking-tight overflow-hidden"
          >
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="inline-block"
              >
                The Future of
              </motion.span>
            </span>
            <span className="block overflow-hidden mt-2">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                className="inline-block text-gold relative"
              >
                Luxury Living
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                  className="absolute -bottom-2 left-0 right-0 h-[1px] bg-gold/40 origin-left"
                />
              </motion.span>
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 lg:mt-8 text-base lg:text-lg xl:text-xl text-text/60 max-w-2xl mx-auto leading-relaxed"
          >
            Discover extraordinary properties crafted for exceptional lifestyles.
            Where architectural mastery meets unparalleled service.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-10 lg:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <MagneticButton
              href="/#properties"
              className="group relative px-8 py-4 bg-text text-bg text-sm tracking-[0.2em] uppercase overflow-hidden animate-glow-pulse"
            >
              <span className="relative z-10 transition-colors duration-500 group-hover:text-text">
                Explore Properties
              </span>
              <span className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </MagneticButton>
            <MagneticButton
              href="/#contact"
              className="px-8 py-4 border border-text/20 text-text text-sm tracking-[0.2em] uppercase hover:border-gold hover:text-gold animate-glow-subtle transition-all duration-500"
            >
              Schedule a Visit
            </MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Stats with gold separators */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 mt-16 lg:mt-24 w-full max-w-4xl mx-auto"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="relative text-center px-4 py-6">
              {i > 0 && (
                <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-8 bg-gold/20" />
              )}
              <p className="font-heading text-3xl lg:text-4xl text-text">
                {stat.value}
              </p>
              <p className="mt-1 text-xs tracking-[0.15em] uppercase text-text/40">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase text-gold/50">
            Scroll
          </span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-gold/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
