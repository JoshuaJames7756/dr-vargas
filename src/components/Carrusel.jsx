import { useEffect, useRef, useState } from 'react';

/**
 * Carrusel simple, accesible, con auto-play y dots.
 * `children` = array de nodos, uno por slide.
 * `autoPlayMs` = 0 para desactivar auto-play.
 */
export default function Carrusel({ children, autoPlayMs = 5500, className = '' }) {
  const slides = Array.isArray(children) ? children : [children];
  const [activo, setActivo] = useState(0);
  const [pausado, setPausado] = useState(false);
  const trackRef = useRef(null);

  useEffect(() => {
    if (!autoPlayMs || pausado || slides.length <= 1) return;
    const id = setInterval(() => {
      setActivo((prev) => (prev + 1) % slides.length);
    }, autoPlayMs);
    return () => clearInterval(id);
  }, [autoPlayMs, pausado, slides.length]);

  function irA(i) {
    setActivo(i);
  }

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
    >
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${activo * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div key={i} className="w-full flex-shrink-0">
              {slide}
            </div>
          ))}
        </div>
      </div>

      {slides.length > 1 && (
        <div className="mt-7 flex items-center justify-center gap-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => irA(i)}
              aria-label={`Ir al slide ${i + 1}`}
              className={
                'h-1.5 rounded-full transition-all duration-300 ' +
                (activo === i ? 'w-7 bg-copper' : 'w-1.5 bg-line hover:bg-teal-light')
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
