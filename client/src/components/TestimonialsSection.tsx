import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Corporate Client",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    rating: 5,
    text: "Matchbox~Fusion transformed our annual corporate event into an unforgettable experience. Their attention to detail and creative solutions exceeded our expectations. Highly recommended!",
    highlight: "Their team was professional, responsive, and truly understood our vision.",
    ringColor: "accent-purple"
  },
  {
    id: 2,
    name: "Michael Thomas",
    role: "Wedding Client",
    image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    rating: 5,
    text: "Our wedding day was absolute perfection thanks to Matchbox~Fusion. They handled every detail with care and created a magical experience that we and our guests will never forget.",
    highlight: "From planning to execution, they made our dream wedding a reality.",
    ringColor: "accent-blue"
  },
  {
    id: 3,
    name: "Jennifer Davis",
    role: "Birthday Client",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    rating: 5,
    text: "I hired Matchbox~Fusion for my milestone birthday celebration and was blown away by their creativity and professionalism. The custom theme they created was exactly what I envisioned.",
    highlight: "My guests are still talking about how amazing the event was!",
    ringColor: "accent-teal"
  }
];

const TestimonialsSection = () => {
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
    <section id="testimonials" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            className="font-display font-bold text-3xl md:text-5xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="gradient-text">Client Testimonials</span>
          </motion.h2>
          <motion.p 
            className="text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Don't just take our word for it. Here's what our clients have to say about their experience with Matchbox~Fusion.
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {testimonials.map((testimonial) => (
            <motion.div 
              key={testimonial.id} 
              className="glass testimonial-card rounded-xl p-6"
              variants={itemVariants}
            >
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-full overflow-hidden mr-4 ring-2 ring-[hsl(var(--${testimonial.ringColor}))]`}>
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-display font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <div className="mb-4 flex">
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <svg key={index} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300">
                "{testimonial.text}"
              </p>
              <div className="h-px bg-white/10 my-4"></div>
              <p className="text-sm text-gray-400 italic font-serif">
                "{testimonial.highlight}"
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
