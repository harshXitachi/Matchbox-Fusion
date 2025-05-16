import { useEffect, useState } from "react";

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isGlow, setIsGlow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [trailPositions, setTrailPositions] = useState<{ x: number; y: number }[]>(
    Array(5).fill({ x: 0, y: 0 })
  );

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const updateTrail = () => {
      setTrailPositions((prev) => {
        const newPositions = [...prev];
        newPositions.pop();
        newPositions.unshift({ x: position.x, y: position.y });
        return newPositions;
      });
    };

    const trailInterval = setInterval(updateTrail, 50);

    const addGlowEffect = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.tagName === "SELECT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsGlow(true);
      }
    };

    const removeGlowEffect = () => {
      setIsGlow(false);
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseover", addGlowEffect);
    window.addEventListener("mouseout", removeGlowEffect);
    document.addEventListener("mouseleave", () => setIsVisible(false));
    document.addEventListener("mouseenter", () => setIsVisible(true));

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", addGlowEffect);
      window.removeEventListener("mouseout", removeGlowEffect);
      document.removeEventListener("mouseleave", () => setIsVisible(false));
      document.removeEventListener("mouseenter", () => setIsVisible(true));
      clearInterval(trailInterval);
    };
  }, [position]);

  // Don't show custom cursor on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <div
        className={`custom-cursor ${isGlow ? "cursor-glow" : ""} ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ left: position.x, top: position.y }}
      />
      {trailPositions.map((pos, index) => (
        <div
          key={index}
          className={`cursor-trail ${isVisible ? "opacity-100" : "opacity-0"}`}
          style={{
            left: pos.x,
            top: pos.y,
            opacity: 1 - index / 5,
            width: (6 - index) + "px",
            height: (6 - index) + "px",
          }}
        />
      ))}
    </>
  );
};

export default Cursor;
