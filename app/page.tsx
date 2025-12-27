import BestSellers from "@/components/home/bestSellers";
import BrandEssence from "@/components/home/brandEssence";
import CraftPromise from "@/components/home/craftPromise";
import FinalCTA from "@/components/home/finalCTA";
import Hero from "@/components/home/hero";
import SignatureCollections from "@/components/home/signatureCollections";
import Testimonials from "@/components/home/testimonials";

export default function Home() {

  return (
    <div>
      <Hero />
      <BrandEssence />
      <SignatureCollections />
      <CraftPromise />
      <BestSellers />
      <Testimonials />
      <FinalCTA />
    </div>
  );
}