import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Globe, Briefcase, PartyPopper } from "lucide-react";
import GlassCard from "./GlassCard";

const services = [
  {
    id: 1,
    icon: <Globe className="h-8 w-8" />,
    title: "Wedding Planning",
    description: "Create your dream wedding with our comprehensive planning services. From intimate gatherings to grand celebrations, we handle every detail with precision and elegance.",
    link: "#contact"
  },
  {
    id: 2,
    icon: <Briefcase className="h-8 w-8" />,
    title: "Corporate Events",
    description: "Elevate your corporate gatherings with our professional event management. From conferences and product launches to team building events and galas, we deliver excellence.",
    link: "#contact"
  },
  {
    id: 3,
    icon: <PartyPopper className="h-8 w-8" />,
    title: "Social Celebrations",
    description: "Turn your special moments into extraordinary memories. Whether it's birthdays, anniversaries, or milestone celebrations, our creative team will make it unforgettable.",
    link: "#contact"
  }
];

// Company partners data
const partners = [
  {
    id: "skoda",
    name: "Skoda",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/SKODA_AUTO_wordmark.svg/1280px-SKODA_AUTO_wordmark.svg.png",
    accentColor: "accent-green"
  },
  {
    id: "loreal",
    name: "L'Oreal Paris",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/L%27Or%C3%A9al_logo.svg/1280px-L%27Or%C3%A9al_logo.svg.png",
    accentColor: "accent-purple"
  },
  {
    id: "pepsi",
    name: "Pepsi",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pepsi_logo_2014.svg/1280px-Pepsi_logo_2014.svg.png",
    accentColor: "accent-blue"
  },
  {
    id: "axis",
    name: "Axis Bank",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Axis_Bank_logo.svg/1280px-Axis_Bank_logo.svg.png",
    accentColor: "accent-teal"
  },
  {
    id: "zoom",
    name: "Zoom",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Zoom_logo.svg/1280px-Zoom_logo.svg.png",
    accentColor: "accent-blue"
  }
];

const ServicesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <section id="services" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            className="font-display font-bold text-3xl md:text-5xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="gradient-text">Our Premium Services</span>
          </motion.h2>
          <motion.p 
            className="text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We offer a comprehensive range of event management services tailored to create memorable experiences for any occasion.
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={itemVariants}>
              <GlassCard>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[hsl(var(--accent-purple))] to-[hsl(var(--accent-blue))] flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-display font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-300 mb-6">{service.description}</p>
                <a href={service.link} className="text-[hsl(var(--accent-purple))] hover:text-[hsl(var(--accent-blue))] transition-colors inline-flex items-center">
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Partners Section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <motion.h2 
              className="font-display font-bold text-3xl md:text-4xl mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="gradient-text">Our Trusted Partners</span>
            </motion.h2>
            <motion.p 
              className="text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              We have worked with some of the world's most renowned brands to create unforgettable events.
            </motion.p>
          </div>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {partners.map((partner) => (
              <motion.div 
                key={partner.id}
                className="glass partner-logo rounded-xl p-4 flex items-center justify-center h-40 relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`absolute top-0 right-0 bg-gradient-to-bl from-[hsl(var(--${partner.accentColor}))]/20 to-transparent w-24 h-24 rounded-bl-full`}></div>
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="max-w-[80%] max-h-[80%] object-contain filter brightness-0 invert" 
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
