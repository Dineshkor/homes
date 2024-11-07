import HeroSection from "@/components/home/HeroSection";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import ListingCTA from "@/components/home/ListingCTA";
import PopularAreas from "@/components/home/PopularAreas";
import ExploreTypes from "@/components/home/ExploreTypes";
import Testimonial from "@/components/home/Testimonial";
import Newsletter from "@/components/home/NewsLetterSection";


export default function Home() {
  return (
    <>
      <HeroSection />
      <ExploreTypes />
      <FeaturedProperties />
      <ListingCTA />
      <PopularAreas  />
      <Testimonial />
      <Newsletter />
    </>
  );
}
