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

const pricingOptions = [
  {
    id: "basic",
    title: "Basic",
    price: "$100",
    period: "/event",
    features: [
      "Initial consultation",
      "Basic event planning",
      "Day-of coordination"
    ],
    recommended: false,
    accentColor: "accent-purple"
  },
  {
    id: "advanced",
    title: "Advanced",
    price: "$249",
    period: "/event",
    features: [
      "Everything in Basic",
      "Vendor management",
      "Design consultation",
      "Full timeline creation"
    ],
    recommended: true,
    accentColor: "accent-blue"
  },
  {
    id: "pro",
    title: "Premium",
    price: "$449",
    period: "/event",
    features: [
      "Everything in Advanced",
      "Full-service planning",
      "Custom event design",
      "VIP experience"
    ],
    recommended: false,
    accentColor: "accent-teal"
  }
];

const ServicesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [selectedPlan, setSelectedPlan] = useState<string>("advanced");

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };

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
        
        {/* Pricing Section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <motion.h2 
              className="font-display font-bold text-3xl md:text-4xl mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="gradient-text">Choose Your Experience Level</span>
            </motion.h2>
            <motion.p 
              className="text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Select the perfect package that suits your event needs and budget. All packages can be customized to your requirements.
            </motion.p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {pricingOptions.map((option) => (
              <div 
                key={option.id}
                className={`glass pricing-option rounded-xl p-6 relative overflow-hidden ${selectedPlan === option.id ? 'selected' : ''}`}
                id={`pricing-${option.id}`}
                data-price={option.id}
              >
                <div className={`absolute top-0 right-0 bg-gradient-to-bl from-[hsl(var(--${option.accentColor}))]/30 to-transparent w-36 h-36 rounded-bl-full`}></div>
                {option.id === "advanced" && (
                  <div className="absolute -top-16 -right-16 bg-gradient-to-bl from-[hsl(var(--accent-blue))]/40 to-transparent w-48 h-48 rounded-bl-full"></div>
                )}
                {option.id === "advanced" && (
                  <div className="absolute top-0 left-0 bg-gradient-to-br from-[hsl(var(--accent-purple))]/30 to-transparent w-16 h-16 rounded-br-full"></div>
                )}
                <h3 className="text-xl font-display font-semibold mb-2">{option.title}</h3>
                <div className="text-3xl font-display font-bold mb-4">
                  <span className="text-white">{option.price}</span>
                  <span className="text-sm text-gray-400 font-normal">{option.period}</span>
                </div>
                <div className="h-px bg-white/20 mb-4"></div>
                <ul className="space-y-3 mb-8">
                  {option.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-[hsl(var(--${option.accentColor}))] mr-2 flex-shrink-0 mt-0.5`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`w-full block text-center ${
                    selectedPlan === option.id 
                      ? "bg-gradient-to-r from-[hsl(var(--accent-purple))]/80 to-[hsl(var(--accent-blue))]/80 hover:from-[hsl(var(--accent-purple))] hover:to-[hsl(var(--accent-blue))]" 
                      : "bg-white/10 hover:bg-white/20"
                  } transition-colors py-3 rounded-lg text-white font-medium`}
                  onClick={() => handleSelectPlan(option.id)}
                >
                  Select Plan
                </a>
              </div>
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a href="#contact" className="text-[hsl(var(--accent-purple))] hover:text-[hsl(var(--accent-blue))] transition-colors inline-flex items-center text-lg">
              See the full list of services
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
