import "./globals.css";
import NavbarComponent from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroCarousel from "@/components/ui/HeroSection";
import CollectionsSection from "@/components/ui/Collection";
import FeaturedCollection from "@/components/ui/NewIn";
import EditorialSection from "@/components/ui/EditorialSection";
import ProductShowcaseSection from "@/components/ui/SingleCarousel";
import FeaturesSection from "@/components/ui/Styles";

export const metadata = {
  title: "Isabella",
  description: "Premium Women's Fashion",
};

export default function RootLayout({ children }) {
  return (
      <> 
        <NavbarComponent />
        <HeroCarousel/>
        <CollectionsSection/>
        <FeaturedCollection/>
        <ProductShowcaseSection/>
        <EditorialSection/>
        <FeaturesSection/>
        <Footer/>
        {children} 
      </> 
  );
}
