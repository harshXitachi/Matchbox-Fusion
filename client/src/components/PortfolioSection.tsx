import { motion } from "framer-motion";

const portfolioItems = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Luxury Garden Wedding",
    description: "An exquisite garden wedding featuring elegant floral arrangements and custom lighting design.",
    tags: ["Wedding", "Outdoor", "Luxury"]
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Tech Summit 2023",
    description: "A high-profile technology conference featuring custom staging, integrated AV, and interactive exhibitions.",
    tags: ["Corporate", "Conference", "Tech"]
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Annual Charity Gala",
    description: "A sophisticated fundraising event with custom décor, entertainment, and gourmet catering.",
    tags: ["Gala", "Charity", "Evening"]
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "VIP Birthday Celebration",
    description: "An exclusive birthday event featuring custom themes, entertainment, and personalized experiences.",
    tags: ["Birthday", "Private", "VIP"]
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Luxury Product Launch",
    description: "A sophisticated product unveiling event with custom staging, lighting design, and interactive displays.",
    tags: ["Corporate", "Launch", "Luxury"]
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Destination Beach Wedding",
    description: "A breathtaking beachfront wedding featuring custom structures, lighting, and personalized details.",
    tags: ["Wedding", "Destination", "Beach"]
  }
];

const PortfolioSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="portfolio" className="py-20 relative">
      {/* A cosmic nebula background with blue and purple hues */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1539321908154-04927596764d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Cosmic background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--darker-purple))]/90 via-[hsl(var(--darker-purple))]/70 to-[hsl(var(--darker-purple))]/90"></div>
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
            <span className="gradient-text">Our Event Portfolio</span>
          </motion.h2>
          <motion.p 
            className="text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Browse through our collection of stunning events that showcase our creativity, attention to detail, and passion for excellence.
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {portfolioItems.map((item) => (
            <motion.div 
              key={item.id}
              className="glass portfolio-item rounded-xl overflow-hidden group"
              variants={itemVariants}
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-60 object-cover transition-transform duration-500"
              />
              <div className="p-6">
                <h3 className="text-xl font-display font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-300 mb-4">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-white/10 rounded-full text-sm">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a 
            href="#contact" 
            className="btn-glow inline-block bg-gradient-to-r from-[hsl(var(--accent-purple))] to-[hsl(var(--accent-blue))] px-8 py-4 rounded-lg text-lg font-medium hover:shadow-lg transition-all transform hover:scale-105"
          >
            Plan Your Event
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
