"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";

const values = [
  {
    number: "01",
    title: "Curated Excellence",
    description:
      "Every property in our portfolio is hand-selected for its architectural significance, location, and potential. We represent only the finest residences Dubai has to offer.",
  },
  {
    number: "02",
    title: "Discerning Service",
    description:
      "Our white-glove approach ensures absolute discretion and personalized attention for every client. We understand that privacy is the ultimate luxury.",
  },
  {
    number: "03",
    title: "Market Intelligence",
    description:
      "With deep roots in Dubai's luxury market, we provide insights that go beyond data. Our network opens doors to opportunities before they reach the market.",
  },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageParallax = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const contentParallax = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 lg:py-32 px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.01] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          label="About"
          title="Redefining Luxury Real Estate"
          description="NOVA ESTATES was founded with a singular vision: to create the world's most exceptional real estate experience for the world's most discerning clients."
          align="left"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 lg:mb-28">
          <motion.div
            style={{ y: imageParallax }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative aspect-[4/3]"
          >
            <Image
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=90"
              alt="Luxury Dubai property"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b border-r border-gold/30" />
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t border-l border-gold/30" />
          </motion.div>

          <motion.div
            style={{ y: contentParallax }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="font-heading text-lg lg:text-xl text-text/80 leading-relaxed">
              Based in the heart of Dubai, we bring together a team of
              industry veterans, market analysts, and luxury service
              professionals dedicated to one purpose: delivering the
              extraordinary.
            </p>
            <p className="mt-6 text-base text-text/60 leading-relaxed">
              Our clients are not just buying property — they are investing in a
              lifestyle, securing a legacy, and joining an exclusive community
              of individuals who demand nothing less than perfection. From
              initial consultation to final handover, every interaction is
              designed to exceed expectations.
            </p>
            <p className="mt-4 text-base text-text/60 leading-relaxed">
              With a portfolio spanning AED 12M to AED 500M+, we have
              facilitated over AED 12 billion in transactions, earning the trust
              of royal families, Fortune 500 executives, and international
              investors.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {values.map((value, i) => (
            <motion.div
              key={value.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="border-t border-gold/30 pt-6 group"
            >
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className="font-heading text-5xl text-gold/20 group-hover:text-gold/30 transition-colors duration-500"
              >
                {value.number}
              </motion.p>
              <h3 className="mt-4 font-heading text-xl text-text group-hover:text-gold transition-colors duration-500">
                {value.title}
              </h3>
              <p className="mt-3 text-sm text-text/60 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
