import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[hsl(var(--deep-purple))]/70 backdrop-blur-sm py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="font-display font-bold text-xl mb-4 gradient-text">Matchbox~Fusion</h3>
            <p className="text-gray-300 mb-6">
              Creating extraordinary events and unforgettable experiences for every occasion.
            </p>
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Matchbox~Fusion. All rights reserved.
            </p>
          </div>
          
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-[hsl(var(--accent-purple))] transition-colors">Home</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-[hsl(var(--accent-purple))] transition-colors">Services</a></li>
              <li><a href="#portfolio" className="text-gray-300 hover:text-[hsl(var(--accent-purple))] transition-colors">Portfolio</a></li>
              <li><a href="#testimonials" className="text-gray-300 hover:text-[hsl(var(--accent-purple))] transition-colors">Testimonials</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-[hsl(var(--accent-purple))] transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#services" className="text-gray-300 hover:text-[hsl(var(--accent-purple))] transition-colors">Wedding Planning</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-[hsl(var(--accent-purple))] transition-colors">Corporate Events</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-[hsl(var(--accent-purple))] transition-colors">Social Celebrations</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-[hsl(var(--accent-purple))] transition-colors">Destination Events</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-[hsl(var(--accent-purple))] transition-colors">Decor & Design</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Newsletter</h4>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for event planning tips and inspiration.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-white/10 border border-white/20 rounded-l-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent-purple))] focus:border-transparent transition-all flex-grow"
              />
              <button 
                type="submit" 
                className="bg-[hsl(var(--accent-purple))] hover:bg-[hsl(var(--accent-purple))]/80 text-white px-4 py-2 rounded-r-lg transition-colors"
                aria-label="Subscribe"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
            
            <div className="flex mt-6 space-x-3">
              <a href="#" className="text-gray-400 hover:text-[hsl(var(--accent-purple))] transition-colors" aria-label="Facebook">
                <FaFacebookF className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[hsl(var(--accent-blue))] transition-colors" aria-label="Twitter">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[hsl(var(--accent-purple))] transition-colors" aria-label="Instagram">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[hsl(var(--accent-teal))] transition-colors" aria-label="LinkedIn">
                <FaLinkedinIn className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
