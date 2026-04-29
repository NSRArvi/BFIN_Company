import { useRef } from "react";
import Hero from "./Hero/Hero";
import Features from "./Features/Features";
// import Pricing from "./Pricing/Pricing";
import FreeWebBuilderHero from "./FreeWebBuilderHero/FreeWebBuilderHero";
import DesignShowCase from "./DesignShowCase/DesignShowCase";
import LaunchFeatures from "./LaunchFeatures/LaunchFeatures";
import Container from "../../shared/Container";
import Pricing from "../Home3/Pricing/Pricing";
import NewPricing from "../Home3/NewPricing/NewPricing";

export default function ECommerceDetails() {
  const sectionRef = useRef();
  const pricingSection = useRef();

  const handleScrollToSection = () => {
    sectionRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleScrollToPricing = () => {
    pricingSection.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <main className="mx-5 py-10 font-roboto md:container md:mx-auto">
      <Container>
        <Hero handleScrollToSection={handleScrollToSection} />
        {/* <Pricing pricingSection={pricingSection} /> */}
        {/* <Pricing pricingSection={pricingSection} /> */}
        <NewPricing pricingSection={pricingSection} />
        <Features sectionRef={sectionRef} />
        <FreeWebBuilderHero handleScrollToPricing={handleScrollToPricing} />
        <DesignShowCase />
        <LaunchFeatures handleScrollToPricing={handleScrollToPricing} />
      </Container>
    </main>
  );
}
