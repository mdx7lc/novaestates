"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Property } from "@/types/property";

interface PropertyCardProps {
  property: Property;
  index: number;
}

export function PropertyCard({ property, index }: PropertyCardProps) {
  const priceFormatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.9,
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="group relative bg-surface"
    >
      {/* Image container — editorial scale */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className="object-cover transition-all duration-[800ms] group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-text/80 via-text/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Labels */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="text-xs tracking-[0.15em] uppercase bg-surface/90 backdrop-blur-sm text-text px-3 py-1.5">
            {property.type}
          </span>
          <span className="text-xs tracking-[0.15em] uppercase bg-gold/90 backdrop-blur-sm text-bg px-3 py-1.5 font-medium">
            For {property.status}
          </span>
        </div>

        {/* Hover overlay details */}
        <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="flex items-center gap-3 text-xs text-white/80 tracking-wide">
            <span className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="1.5" y="3" width="9" height="7.5" rx="1" />
                <path d="M3 3V2a1 1 0 011-1h4a1 1 0 011 1v1" />
              </svg>
              {property.bedrooms} Bed
            </span>
            <span className="w-[1px] h-3 bg-white/30" />
            <span className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1.5 7.5l1-2h7l1 2" />
                <rect x="1.5" y="3" width="9" height="7.5" rx="1" />
              </svg>
              {property.bathrooms} Bath
            </span>
            <span className="w-[1px] h-3 bg-white/30" />
            <span>{property.area.toLocaleString()} {property.areaUnit}</span>
          </div>
        </div>
      </div>

      {/* Editorial content */}
      <div className="p-6 lg:p-8">
        <p className="text-xs tracking-[0.2em] uppercase text-gold mb-1">
          {property.location}
        </p>
        <h3 className="font-heading text-xl lg:text-2xl text-text group-hover:text-gold transition-colors duration-500">
          {property.title}
        </h3>
        <p className="font-heading text-lg lg:text-xl text-gold mt-3">
          {priceFormatted}
        </p>
      </div>
    </motion.article>
  );
}
