import { cn } from "@/lib/utils";
import React from "react";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: "light" | "medium" | "dark";
  hoverEffect?: boolean;
  borderEffect?: boolean;
}

const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, intensity = "medium", hoverEffect = false, borderEffect = true, ...props }, ref) => {
    const intensityClasses = {
      light: "bg-white/5 backdrop-blur-md",
      medium: "bg-white/10 backdrop-blur-md",
      dark: "bg-white/20 backdrop-blur-md",
    };

    return (
      <div
        ref={ref}
        className={cn(
          intensityClasses[intensity],
          borderEffect && "border border-white/[0.15]",
          hoverEffect && "transition-all hover:border-white/30 hover:shadow-lg",
          "rounded-xl shadow-lg",
          className
        )}
        {...props}
      />
    );
  }
);
GlassPanel.displayName = "GlassPanel";

interface GlassCardProps extends GlassPanelProps {
  interactive?: boolean;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, interactive = true, ...props }, ref) => {
    return (
      <GlassPanel
        ref={ref}
        className={cn(
          "p-6",
          interactive && "transition-all duration-300 hover:-translate-y-2",
          className
        )}
        hoverEffect={interactive}
        {...props}
      />
    );
  }
);
GlassCard.displayName = "GlassCard";

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
}

const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    const variantClasses = {
      primary: "bg-gradient-to-r from-[hsl(var(--accent-purple))] to-[hsl(var(--accent-blue))]",
      secondary: "bg-white/10 hover:bg-white/20",
      outline: "bg-transparent border border-white/20 hover:border-white/40",
    };

    return (
      <button
        ref={ref}
        className={cn(
          variantClasses[variant],
          "relative overflow-hidden rounded-lg px-4 py-2 font-medium text-white transition-all",
          "before:absolute before:-top-2 before:-left-2 before:-right-2 before:-bottom-2 before:bg-gradient-to-r before:from-[hsl(var(--accent-purple))] before:to-[hsl(var(--accent-blue))]",
          "before:rounded-lg before:z-[-1] before:opacity-0 before:transition-opacity before:duration-300 before:filter before:blur-md",
          "hover:before:opacity-70",
          className
        )}
        {...props}
      />
    );
  }
);
GlassButton.displayName = "GlassButton";

export { GlassPanel, GlassCard, GlassButton };
