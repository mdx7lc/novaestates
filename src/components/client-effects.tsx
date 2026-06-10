"use client";

import dynamic from "next/dynamic";

const CustomCursor = dynamic(
  () => import("@/components/ui/custom-cursor").then((m) => m.CustomCursor),
  { ssr: false }
);

const DottedSurface = dynamic(
  () => import("@/components/effects/dotted-surface").then((m) => m.DottedSurface),
  { ssr: false }
);

const LuxuryLoader = dynamic(
  () => import("@/components/ui/luxury-loader").then((m) => m.LuxuryLoader),
  { ssr: false }
);

export function ClientEffects() {
  return (
    <>
      <LuxuryLoader />
      <DottedSurface />
      <CustomCursor />
    </>
  );
}
