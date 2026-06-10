import { Hero } from "@/components/sections/hero";
import { FeaturedProperties } from "@/components/sections/featured-properties";
import { InvestmentOpportunities } from "@/components/sections/investment-opportunities";
import { PropertyExplorer } from "@/components/sections/property-explorer";
import { AgentShowcase } from "@/components/sections/agent-showcase";
import { Testimonials } from "@/components/sections/testimonials";
import { AboutSection } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <InvestmentOpportunities />
      <PropertyExplorer />
      <AgentShowcase />
      <Testimonials />
      <AboutSection />
      <ContactSection />
    </>
  );
}
