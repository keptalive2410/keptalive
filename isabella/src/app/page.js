import "./globals.css";
import NavbarComponent from "@/components/layout/Navbar";
import Footer from "@/Components/Layout/Footer";
import HeroCarousel from "@/Components/UI/HeroSection";
import CollectionsSection from "@/Components/UI/Collection";
import FeaturedCollection from "@/Components/UI/NewIn";
import EditorialSection from "@/Components/UI/EditorialSection";
import ProductShowcaseSection from "@/Components/UI/SingleCarousel";
import FeaturesSection from "@/Components/UI/Styles";

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
