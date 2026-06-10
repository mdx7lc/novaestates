"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { PropertyCard } from "@/components/ui/property-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { properties } from "@/lib/data";

export function FeaturedProperties() {
  const featured = properties.filter((p) => p.featured);

  return (
    <section id="properties" className="relative py-24 lg:py-32 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Curated Collection"
          title="Featured Properties"
          description="A hand-selected portfolio of the world's most extraordinary residences, each chosen for its architectural significance and unparalleled lifestyle."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featured.map((property, index) => (
            <PropertyCard
              key={property.id}
              property={property}
              index={index}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <MagneticButton
            href="/#explorer"
            className="inline-block px-8 py-4 border border-text/20 text-text text-sm tracking-[0.2em] uppercase hover:border-gold hover:text-gold transition-all duration-500"
          >
            View All Properties
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
