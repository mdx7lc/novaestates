"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { PropertyCard } from "@/components/ui/property-card";
import { properties } from "@/lib/data";

const locations = [...new Set(properties.map((p) => p.location))];
const types = [...new Set(properties.map((p) => p.type))];
const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under 15M", min: 0, max: 15000000 },
  { label: "15M - 50M", min: 15000000, max: 50000000 },
  { label: "50M - 100M", min: 50000000, max: 100000000 },
  { label: "100M+", min: 100000000, max: Infinity },
];

export function PropertyExplorer() {
  const [location, setLocation] = useState("All");
  const [propertyType, setPropertyType] = useState("All");
  const [priceRange, setPriceRange] = useState(0);
  const [bedrooms, setBedrooms] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (location !== "All" && p.location !== location) return false;
      if (propertyType !== "All" && p.type !== propertyType) return false;
      const range = priceRanges[priceRange];
      if (range && (p.price < range.min || p.price > range.max)) return false;
      if (bedrooms !== "All") {
        const bedCount = parseInt(bedrooms);
        if (bedCount === 5 && p.bedrooms < 5) return false;
        if (bedCount < 5 && p.bedrooms !== bedCount) return false;
      }
      if (
        searchQuery &&
        !p.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;
      return true;
    });
  }, [location, propertyType, priceRange, bedrooms, searchQuery]);

  const selectClass =
    "bg-surface border border-border/50 text-text text-sm px-4 py-3 appearance-none cursor-pointer focus:outline-none focus:border-gold transition-colors duration-300 rounded-none";
  const selectWrapperClass = "relative after:content-['▾'] after:absolute after:right-3 after:top-1/2 after:-translate-y-1/2 after:text-gold after:pointer-events-none after:text-xs";

  return (
    <section id="explorer" className="relative py-24 lg:py-32 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Property Explorer"
          title="Find Your Extraordinary Home"
          description="Search our curated portfolio of the finest residences across Dubai's most prestigious addresses."
        />

        <div className="mb-10 lg:mb-12 bg-surface border border-border/50 p-6 lg:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className={selectWrapperClass}>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={selectClass + " w-full"}
                aria-label="Filter by location"
              >
                <option value="All">All Locations</option>
                {locations.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            <div className={selectWrapperClass}>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className={selectClass + " w-full"}
                aria-label="Filter by property type"
              >
                <option value="All">All Types</option>
                {types.map((t) => (
                  <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                ))}
              </select>
            </div>

            <div className={selectWrapperClass}>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className={selectClass + " w-full"}
                aria-label="Filter by price range"
              >
                {priceRanges.map((range, i) => (
                  <option key={i} value={i}>{range.label}</option>
                ))}
              </select>
            </div>

            <div className={selectWrapperClass}>
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className={selectClass + " w-full"}
                aria-label="Filter by bedrooms"
              >
                <option value="All">All Bedrooms</option>
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4">4 Bedrooms</option>
                <option value="5">5+ Bedrooms</option>
              </select>
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search properties..."
              className={selectClass + " w-full placeholder:text-text/30"}
              aria-label="Search properties"
            />
          </div>
        </div>

        <p className="text-sm text-text/40 mb-6 tracking-wide">
          {filtered.length}{" "}
          {filtered.length === 1 ? "property" : "properties"} found
        </p>

        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {filtered.map((property, index) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  index={index}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-text/40 text-lg">
                No properties match your criteria.
              </p>
              <button
                onClick={() => {
                  setLocation("All");
                  setPropertyType("All");
                  setPriceRange(0);
                  setBedrooms("All");
                  setSearchQuery("");
                }}
                className="mt-4 text-sm tracking-[0.15em] uppercase text-gold hover:text-gold-dark transition-colors"
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
