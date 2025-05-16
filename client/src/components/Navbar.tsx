import { useState, useEffect } from "react";
import { Menu } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`glass fixed w-full z-50 px-6 py-4 transition-all duration-300 ${isScrolled ? "py-3 shadow-lg" : "py-4"}`}>
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-2xl font-display font-bold tracking-wider">
          <span className="gradient-text">Matchbox~Fusion</span>
        </a>
        
        <div className="hidden md:flex space-x-8 items-center">
          <a href="#home" className="relative hover:text-[hsl(var(--accent-purple))] transition-colors group">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[hsl(var(--accent-purple))] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#services" className="relative hover:text-[hsl(var(--accent-purple))] transition-colors group">
            Services
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[hsl(var(--accent-purple))] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#portfolio" className="relative hover:text-[hsl(var(--accent-purple))] transition-colors group">
            Portfolio
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[hsl(var(--accent-purple))] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#testimonials" className="relative hover:text-[hsl(var(--accent-purple))] transition-colors group">
            Testimonials
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[hsl(var(--accent-purple))] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#contact" className="btn-glow bg-gradient-to-r from-[hsl(var(--accent-purple))] to-[hsl(var(--accent-blue))] px-5 py-2 rounded-lg font-medium hover:shadow-lg transition-all">
            Contact Us
          </a>
        </div>
        
        <button 
          className="md:hidden text-white focus:outline-none" 
          onClick={toggleMenu}
          aria-label="Open mobile menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden glass-darker mt-4 rounded-lg p-4 absolute left-0 right-0 mx-6 transition-all duration-300 ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
        <div className="flex flex-col space-y-4">
          <a href="#home" className="py-2 hover:text-[hsl(var(--accent-purple))] transition-colors" onClick={closeMenu}>Home</a>
          <a href="#services" className="py-2 hover:text-[hsl(var(--accent-purple))] transition-colors" onClick={closeMenu}>Services</a>
          <a href="#portfolio" className="py-2 hover:text-[hsl(var(--accent-purple))] transition-colors" onClick={closeMenu}>Portfolio</a>
          <a href="#testimonials" className="py-2 hover:text-[hsl(var(--accent-purple))] transition-colors" onClick={closeMenu}>Testimonials</a>
          <a href="#contact" className="bg-gradient-to-r from-[hsl(var(--accent-purple))] to-[hsl(var(--accent-blue))] px-5 py-3 rounded-lg font-medium text-center" onClick={closeMenu}>Contact Us</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
