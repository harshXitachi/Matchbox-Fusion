import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    eventType: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.eventType || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/contact", formData);
      
      toast({
        title: "Message Sent",
        description: "Thank you for your message! We will get back to you soon.",
      });
      
      setFormData({
        name: "",
        email: "",
        eventType: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      {/* A cosmic nebula background with purple and blue hues */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1539321908154-04927596764d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Cosmic nebula background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--darker-purple))]/80 to-[hsl(var(--deep-purple))]/90"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="font-display font-bold text-3xl md:text-5xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="gradient-text">Let's Create Magic Together</span>
          </motion.h2>
          <motion.p 
            className="text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Ready to elevate your next event? Get in touch with our team and let's start planning your unforgettable experience.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div 
            className="glass rounded-xl p-8 h-full"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-display font-semibold mb-6">Get in Touch</h3>
            
            <form id="contact-form" className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent-purple))] focus:border-transparent transition-all" 
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent-purple))] focus:border-transparent transition-all" 
                  required
                />
              </div>
              
              <div>
                <label htmlFor="eventType" className="block text-gray-300 mb-2">Event Type</label>
                <select 
                  id="eventType" 
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent-purple))] focus:border-transparent transition-all" 
                  required
                >
                  <option value="" disabled>Select Event Type</option>
                  <option value="wedding">Wedding</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="birthday">Birthday</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                <textarea 
                  id="message" 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4} 
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent-purple))] focus:border-transparent transition-all" 
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="btn-glow w-full bg-gradient-to-r from-[hsl(var(--accent-purple))] to-[hsl(var(--accent-blue))] py-4 rounded-lg text-white font-medium hover:shadow-lg transition-all disabled:opacity-70"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>
          
          <div className="flex flex-col justify-between">
            <motion.div 
              className="glass rounded-xl p-8 mb-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-display font-semibold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-[hsl(var(--accent-purple))]/20 flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="h-5 w-5 text-[hsl(var(--accent-purple))]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Email</h4>
                    <a href="mailto:Matchboxfusion@gmail.com" className="text-gray-300 hover:text-[hsl(var(--accent-purple))] transition-colors">Matchboxfusion@gmail.com</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-[hsl(var(--accent-blue))]/20 flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="h-5 w-5 text-[hsl(var(--accent-blue))]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Phone</h4>
                    <a href="tel:+1234567890" className="text-gray-300 hover:text-[hsl(var(--accent-blue))] transition-colors">+1 (234) 567-890</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-[hsl(var(--accent-teal))]/20 flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin className="h-5 w-5 text-[hsl(var(--accent-teal))]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Location</h4>
                    <p className="text-gray-300">123 Event Avenue, Suite 500<br/>New York, NY 10001</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="glass rounded-xl p-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-display font-semibold mb-6">Follow Us</h3>
              
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-[hsl(var(--accent-purple))]/20 transition-colors group">
                  <FaFacebookF className="h-5 w-5 text-white group-hover:text-[hsl(var(--accent-purple))] transition-colors" />
                </a>
                
                <a href="#" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-[hsl(var(--accent-blue))]/20 transition-colors group">
                  <FaTwitter className="h-5 w-5 text-white group-hover:text-[hsl(var(--accent-blue))] transition-colors" />
                </a>
                
                <a href="#" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-[hsl(var(--accent-purple))]/20 transition-colors group">
                  <FaInstagram className="h-5 w-5 text-white group-hover:text-[hsl(var(--accent-purple))] transition-colors" />
                </a>
                
                <a href="#" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-[hsl(var(--accent-teal))]/20 transition-colors group">
                  <FaLinkedinIn className="h-5 w-5 text-white group-hover:text-[hsl(var(--accent-teal))] transition-colors" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
