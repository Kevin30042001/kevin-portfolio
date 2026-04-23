// Hook para detectar si un elemento es visible en el viewport
// Usado para activar animaciones de fade-in al hacer scroll

import { useEffect, useRef, useState } from "react";

/**
 * @param {Object} options - IntersectionObserver options
 * @param {number} options.threshold - Porcentaje visible para activar (0-1)
 * @param {string} options.rootMargin - Margen del viewport
 * @returns {{ ref, isInView }}
 */
export function useInView({ threshold = 0.15, rootMargin = "0px" } = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Una vez visible, no vuelve a ocultarse (animación de entrada sólo una vez)
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isInView };
}
