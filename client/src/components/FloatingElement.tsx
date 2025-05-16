import { FC } from "react";
import { motion } from "framer-motion";

interface FloatingElementProps {
  className?: string;
  animationDuration?: number; // in seconds
  animationDelay?: number; // in seconds
}

const FloatingElement: FC<FloatingElementProps> = ({ 
  className = "", 
  animationDuration = 6,
  animationDelay = 0
}) => {
  return (
    <motion.div
      className={className}
      animate={{ 
        y: ["0%", "-20%", "0%"] 
      }}
      transition={{ 
        duration: animationDuration, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay: animationDelay
      }}
    />
  );
};

export default FloatingElement;
