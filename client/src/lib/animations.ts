import { Variants } from "framer-motion";

// Fade in animation variant
export const fadeIn = (
  direction: "up" | "down" | "left" | "right" | "none" = "up",
  delay: number = 0,
  duration: number = 0.5
): Variants => {
  return {
    hidden: {
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
      opacity: 0,
    },
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        delay,
        duration,
        ease: "easeOut",
      },
    },
  };
};

// Stagger children animation
export const staggerContainer = (
  staggerChildren: number = 0.1,
  delayChildren: number = 0
): Variants => {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
};

// Zoom in animation
export const zoomIn = (delay: number = 0, duration: number = 0.5): Variants => {
  return {
    hidden: {
      scale: 0.8,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay,
        duration,
        ease: "easeOut",
      },
    },
  };
};

// Float animation
export const float = (
  duration: number = 6,
  y: number = 15,
  delay: number = 0
): Variants => {
  return {
    initial: {
      y: 0,
    },
    animate: {
      y: [-y, 0, -y],
      transition: {
        duration,
        ease: "easeInOut",
        repeat: Infinity,
        delay,
      },
    },
  };
};

// Glassmorphism card hover effect
export const glassCardHover: Variants = {
  hover: {
    y: -10,
    boxShadow: "0 15px 30px rgba(59, 130, 246, 0.15)",
    borderColor: "rgba(255, 255, 255, 0.3)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
};
