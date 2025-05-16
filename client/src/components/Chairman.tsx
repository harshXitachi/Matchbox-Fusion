import { motion } from "framer-motion";

const Chairman = () => {
  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-6">
        <div className="glass rounded-xl p-8 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.div 
              className="w-full md:w-1/3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="rounded-full overflow-hidden border-4 border-[hsl(var(--accent-purple))]/30 shadow-lg">
                <img 
                  src="/chairman.jpg" 
                  alt="Swati Choudhary - Chairman" 
                  className="w-full aspect-square object-cover"
                />
              </div>
            </motion.div>
            
            <motion.div 
              className="w-full md:w-2/3 text-center md:text-left"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="font-display font-bold text-2xl md:text-3xl mb-4 gradient-text">Swati Choudhary</h3>
              <h4 className="text-xl text-gray-300 mb-6">Chairman</h4>
              <p className="text-gray-300 leading-relaxed">
                With her visionary leadership and passion for creating exceptional events, 
                Swati Choudhary has established Matchbox~Fusion as a premier event management company. 
                Her attention to detail and commitment to excellence ensures that every event exceeds expectations 
                and creates unforgettable memories for our clients.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chairman;