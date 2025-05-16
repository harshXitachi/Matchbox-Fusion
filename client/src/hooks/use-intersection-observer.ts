import { useEffect, useState, RefObject } from "react";

interface UseIntersectionObserverProps {
  elementRef: RefObject<Element>;
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

export const useIntersectionObserver = ({
  elementRef,
  threshold = 0,
  root = null,
  rootMargin = "0%",
  freezeOnceVisible = true,
}: UseIntersectionObserverProps): boolean => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const element = elementRef?.current;
    
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        const isIntersecting = entry.isIntersecting;
        
        if (isIntersecting) {
          setIsVisible(true);
          
          if (freezeOnceVisible) {
            // If we want to track only the first time the element becomes visible
            observer.unobserve(element);
          }
        } else {
          if (!freezeOnceVisible) {
            setIsVisible(false);
          }
        }
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [elementRef, threshold, root, rootMargin, freezeOnceVisible]);

  return isVisible;
};
