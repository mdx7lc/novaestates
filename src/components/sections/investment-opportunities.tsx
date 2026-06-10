"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { STATS } from "@/lib/constants";

const highlights = [
  {
    title: "Prime Locations",
    description:
      "Strategic investments in Dubai's most coveted districts, from Downtown to Palm Jumeirah.",
    metric: "15+",
    metricLabel: "Exclusive Districts",
  },
  {
    title: "Premium Returns",
    description:
      "Average ROI of 8-12% annually on luxury residential properties across our portfolio.",
    metric: "8-12%",
    metricLabel: "Average ROI",
  },
  {
    title: "Global Network",
    description:
      "Access to off-market opportunities and exclusive pre-launch developments.",
    metric: "45+",
    metricLabel: "Partner Developers",
  },
];

export function InvestmentOpportunities() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgParallax = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section
      ref={sectionRef}
      id="investments"
      className="relative py-24 lg:py-32 px-6 lg:px-8 overflow-hidden"
    >
      <motion.div
        style={{ y: bgParallax }}
        className="absolute inset-0 bg-gradient-to-b from-sand via-gold/[0.02] to-sand pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          label="Investment Intelligence"
          title="Opportunities That Define Wealth"
          description="Backed by data, powered by insight. We provide our clients with unparalleled access to Dubai's most promising real estate investments."
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-20 lg:mb-28">
          {STATS.map((stat, i) => (
            <AnimatedCounter
              key={stat.label}
              value={stat.value}
              label={stat.label}
              delay={i * 0.1}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <GlassCard className="h-full flex flex-col">
                <p className="font-heading text-4xl text-gold mb-4">
                  {item.metric}
                </p>
                <p className="text-xs tracking-[0.15em] uppercase text-text/40 mb-4">
                  {item.metricLabel}
                </p>
                <h3 className="font-heading text-xl text-text mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-text/60 leading-relaxed flex-1">
                  {item.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.4,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="mt-12 text-center"
        >
          <MagneticButton
            href="/#contact"
            className="group relative px-8 py-4 bg-text text-bg text-sm tracking-[0.2em] uppercase overflow-hidden"
          >
            <span className="relative z-10 transition-colors duration-500 group-hover:text-text">
              Speak to an Advisor
            </span>
            <span className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
