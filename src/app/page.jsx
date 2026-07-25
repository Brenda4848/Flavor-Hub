import Categories from "@/components/Categories";
import FAQ from "@/components/FAQ";
import FeaturedChefs from "@/components/FeaturedChefs";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Ratings from "@/components/Ratings";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Categories/>
      <FeaturedChefs/>
      <Ratings/>
      <FAQ/>
      <Footer/>
    </div>
  )
}