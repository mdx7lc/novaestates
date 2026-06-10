export interface Property {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  currency: string;
  location: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  areaUnit: string;
  type: "apartment" | "villa" | "penthouse" | "palace";
  status: "sale" | "rent";
  images: string[];
  featured: boolean;
  amenities: string[];
  yearBuilt: number;
}
