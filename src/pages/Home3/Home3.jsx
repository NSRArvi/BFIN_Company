import Compare from "./Compare/Compare";
import Dashboard from "./Dashboard/Dashboard";
import Features from "./Features/Features";
import FreeGift from "./FreeGift/FreeGift";
import Hero from "./Hero/Hero";
import Overview from "./Overview/Overview";
import PremiumPricing from "./PremiumPricing/PremiumPricing";
import Pricing from "./Pricing/Pricing";
import SiteShowCase from "./SiteShowcase/SiteShowcase";
import SosayPromo from "./SosayPromo/SosayPromo";
import FreeGifts from "./FreeGifts/FreeGifts";
import BfiniteWeb3Hero from "./Scottypumpkin/Bfiniteweb3hero";
import NewPricing from "./NewPricing/NewPricing";

export default function Home3() {
  return (
    <div className="font-inter">
      <BfiniteWeb3Hero />
      {/* <Hero /> */}
      {/* <Dashboard /> */}
      <SiteShowCase />
      {/* <Pricing /> */}
      <NewPricing />
      <FreeGifts />
      <PremiumPricing />
      <Overview />
      <Features />
      <Compare />
      {/* <FreeGift /> */}
      <SosayPromo />
    </div>
  );
}
