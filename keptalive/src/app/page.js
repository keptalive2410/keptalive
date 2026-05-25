import "./globals.css";
import NavbarComponent from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroCarousel from "@/components/ui/HeroSection";
import FeaturesSection from "@/components/ui/Styles";
import CategoryAndStory from "@/components/ui/Category";
import ArchiveGrid from "@/components/ui/Archivesection";

export const metadata = {
  title: "KeptAlive",
  description: "Premium Women's Fashion",
};

export default function HomePage() {
  return (
      <> 
        <NavbarComponent />
        <HeroCarousel/>
        <CategoryAndStory />
        <ArchiveGrid/>
        {/* <FeaturesSection/> */}
        <Footer/>
      </> 
  );
}
