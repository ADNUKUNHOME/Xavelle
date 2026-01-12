import BestSellers from "@/components/home/bestSellers";
import BrandEssence from "@/components/home/brandEssence";
import CraftPromise from "@/components/home/craftPromise";
import FinalCTA from "@/components/home/finalCTA";
import Hero from "@/components/home/hero";
import SignatureCollections from "@/components/home/signatureCollections";
import Testimonials from "@/components/home/testimonials";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (token) {
    const decoded = verifyToken(token);

    if (decoded.role === "admin") {
      redirect("/admin");
    }
  }

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