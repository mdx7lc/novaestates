import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <div
      className={cn(
        "bg-surface/60 backdrop-blur-xl border border-border/50 rounded-sm p-8",
        hover &&
          "transition-all duration-500 hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5 hover:-translate-y-1",
        className
      )}
    >
      {children}
    </div>
  );
}
