import React, { FC, ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const GlassCard: FC<GlassCardProps> = ({ 
  children, 
  className = "",
  hoverEffect = true
}) => {
  return (
    <motion.div 
      className={`glass glass-card rounded-xl p-6 md:p-8 h-full flex flex-col justify-between ${className} ${hoverEffect ? 'hover:-translate-y-2 hover:shadow-lg' : ''}`}
      whileHover={hoverEffect ? { scale: 1.02, y: -8 } : {}}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
