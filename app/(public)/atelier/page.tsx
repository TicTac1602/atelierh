import type { Metadata } from "next";
import AtelierHero from "@/components/atelier/AtelierHero";
import AtelierPresentation from "@/components/atelier/AtelierPresentation";
import AtelierLocation from "@/components/atelier/AtelierLocation";
import AtelierPricing from "@/components/atelier/AtelierPricing";
import AtelierValues from "@/components/atelier/AtelierValues";

export const metadata: Metadata = {
  title: "L'Atelier",
  description:
    "Découvrez l'Atelier H : notre histoire, philosophie, localisation, tarifs.",
};

export default function AtelierPage() {
  return (
    <>
      <AtelierHero />
      <AtelierPresentation />
      <AtelierPricing />
      <AtelierValues />
      <AtelierLocation />
    </>
  );
}
