
import { CtaSection } from "@/features/landing/cta-section";
import { FeatureSection } from "@/features/landing/feature-section";
import { HeroSection } from "@/features/landing/hero-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeatureSection />
      <CtaSection />
    </>
  );
}
