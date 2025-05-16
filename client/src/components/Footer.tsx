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
            <h4 className="font-display font-semibold text-lg mb-4">Follow Us</h4>
            <p className="text-gray-300 mb-4">
              Follow us on social media for event inspiration and updates on our latest projects.
            </p>
            
            <div className="flex mt-6 space-x-5">
              <a href="https://x.com/swatitandon101?s=21" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[hsl(var(--accent-blue))] transition-colors flex items-center" aria-label="Twitter">
                <FaTwitter className="h-6 w-6 mr-2" />
                <span>@swatitandon101</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-[hsl(var(--accent-purple))] transition-colors flex items-center" aria-label="Instagram">
                <FaInstagram className="h-6 w-6 mr-2" />
                <span>@matchboxfusion</span>
              </a>
            </div>
            
            <div className="mt-8 p-4 glass rounded-lg">
              <h5 className="font-medium mb-2 text-lg">Event Planning Tips</h5>
              <p className="text-gray-300 text-sm">
                "The key to a successful event is attention to detail and creating moments that surprise and delight your guests."
              </p>
              <p className="text-right text-sm text-gray-400 mt-2">- Swati Choudhary</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
