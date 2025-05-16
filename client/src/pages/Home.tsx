import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

const Home = () => {
  // Set dark theme on first render
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <>
      <Helmet>
        <title>Matchbox~Fusion | Premium Event Management</title>
        <meta name="description" content="Creating unforgettable experiences through premium event management services that exceed expectations. Weddings, corporate events, and social celebrations." />
        <meta property="og:title" content="Matchbox~Fusion | Premium Event Management" />
        <meta property="og:description" content="Creating unforgettable experiences through premium event management services that exceed expectations." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <PortfolioSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default Home;
