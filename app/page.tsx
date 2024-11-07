import HeroSection from "@/components/home/HeroSection";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import PopularAreas from "@/components/home/PopularAreas";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProperties />
      <PopularAreas  />
    </>
    
  );
}
