
import { useEffect, useState } from 'react';

// Hook for fade-in animation on mount
export const useFadeIn = (delay = 0, duration = 300) => {
  const [style, setStyle] = useState<React.CSSProperties>({
    opacity: 0,
    transition: `opacity ${duration}ms ease-in-out ${delay}ms`
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setStyle({
        opacity: 1,
        transition: `opacity ${duration}ms ease-in-out ${delay}ms`
      });
    }, 10);

    return () => clearTimeout(timeoutId);
  }, [delay, duration]);

  return style;
};

// Hook for slide-in animation on mount
export const useSlideIn = (delay = 0, duration = 300, direction = 'up') => {
  const [style, setStyle] = useState<React.CSSProperties>({
    opacity: 0,
    transform: getInitialTransform(direction),
    transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setStyle({
        opacity: 1,
        transform: 'translate(0, 0)',
        transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`
      });
    }, 10);

    return () => clearTimeout(timeoutId);
  }, [delay, duration, direction]);

  return style;
};

// Helper for getting initial transform based on direction
function getInitialTransform(direction: string): string {
  switch (direction) {
    case 'up':
      return 'translate(0, 20px)';
    case 'down':
      return 'translate(0, -20px)';
    case 'left':
      return 'translate(20px, 0)';
    case 'right':
      return 'translate(-20px, 0)';
    default:
      return 'translate(0, 20px)';
  }
}

// Staggered animation for lists
export const useStaggered = (totalItems: number, baseDelay = 50, duration = 300) => {
  return (index: number) => {
    return {
      opacity: 0,
      transform: 'translateY(10px)',
      animation: `fadeSlideIn ${duration}ms ease-out ${baseDelay * index}ms forwards`
    };
  };
};

// Function to generate the typing animation CSS class name
// Instead of a React component in a .ts file
export const getTypingAnimationClass = () => {
  return "typing-dot-animation";
};

// Hook for detecting when element is in viewport
export const useInView = (threshold = 0.1) => {
  const [isInView, setIsInView] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold]);

  return [setRef, isInView] as const;
};
