"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { agents } from "@/lib/data";

export function AgentShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgParallax = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section
      ref={sectionRef}
      id="agents"
      className="relative py-24 lg:py-32 px-6 lg:px-8 overflow-hidden"
    >
      <motion.div
        style={{ y: bgParallax }}
        className="absolute inset-0 bg-gradient-to-b from-bg via-gold/[0.015] to-bg pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeading
          label="Our Team"
          title="Meet the Experts Behind the Excellence"
          description="A carefully assembled team of Dubai's most accomplished real estate professionals, each bringing decades of experience and unparalleled market knowledge."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="group text-center"
            >
              <div className="relative w-48 h-48 mx-auto mb-6 overflow-hidden rounded-full">
                <Image
                  src={agent.avatar}
                  alt={agent.name}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                  sizes="192px"
                />
                <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-all duration-700 rounded-full" />
                <div className="absolute inset-0 rounded-full ring-1 ring-gold/0 group-hover:ring-gold/30 transition-all duration-700" />
              </div>

              <h3 className="font-heading text-xl text-text group-hover:text-gold transition-colors duration-500">
                {agent.name}
              </h3>
              <p className="mt-1 text-sm tracking-wider text-gold uppercase">
                {agent.title}
              </p>
              <p className="mt-3 text-sm text-text/60 leading-relaxed line-clamp-3">
                {agent.bio}
              </p>

              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {agent.specialties.map((s) => (
                  <span
                    key={s}
                    className="text-[10px] tracking-[0.15em] uppercase text-text/40 border border-border/50 px-2.5 py-1 group-hover:border-gold/30 transition-colors duration-500"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
