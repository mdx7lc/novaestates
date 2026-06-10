export const SITE = {
  name: "NOVA ESTATES",
  tagline: "The Future of Luxury Living",
  description:
    "Discover extraordinary properties crafted for exceptional lifestyles. Dubai's premier luxury real estate experience.",
  url: "https://novaestates.com",
  email: "hello@novaestates.com",
  phone: "+971 XX XXX XXXX",
  whatsapp: "+971XX XXXXXX",
  location: "Dubai, United Arab Emirates",
  social: {
    instagram: "https://instagram.com/novaestates",
    twitter: "https://twitter.com/novaestates",
    linkedin: "https://linkedin.com/company/novaestates",
  },
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/#properties" },
  { label: "Investments", href: "/#investments" },
  { label: "Agents", href: "/#agents" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;

export const STATS = [
  { value: "$2.8B+", label: "Portfolio Value" },
  { value: "1,200+", label: "Properties Sold" },
  { value: "45+", label: "Luxury Partners" },
  { value: "15+", label: "Years Excellence" },
] as const;

export const WHATSAPP_MESSAGE =
  "Hello! I'm interested in learning more about NOVA ESTATES luxury properties.";
