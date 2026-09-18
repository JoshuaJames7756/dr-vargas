import { useEffect, useRef, useState } from 'react';

/**
 * Carrusel con auto-play, dots, navegación por teclado (flechas izquierda/derecha
 * con foco en el track), swipe táctil en mobile, pausa al hover Y al foco de teclado,
 * y un live region para que lectores de pantalla anuncien el cambio de slide.
 * `children` = array de nodos, uno por slide.
 * `autoPlayMs` = 0 para desactivar auto-play.
 */
export default function Carrusel({ children, autoPlayMs = 5500, className = '' }) {
  const slides = Array.isArray(children) ? children : [children];
  const [activo, setActivo] = useState(0);
  const [pausado, setPausado] = useState(false);
  const trackRef = useRef(null);
  const touchStartX = useRef(null);

  useEffect(() => {
    if (!autoPlayMs || pausado || slides.length <= 1) return;
    const id = setInterval(() => {
      setActivo((prev) => (prev + 1) % slides.length);
    }, autoPlayMs);
    return () => clearInterval(id);
  }, [autoPlayMs, pausado, slides.length]);

  function irA(i) {
    setActivo(((i % slides.length) + slides.length) % slides.length);
  }

  function handleKeyDown(e) {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      irA(activo + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      irA(activo - 1);
    }
  }

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    const UMBRAL = 40; // px mínimos para contar como swipe intencional
    if (delta > UMBRAL) irA(activo - 1);
    else if (delta < -UMBRAL) irA(activo + 1);
    touchStartX.current = null;
  }

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={() => setPausado(false)}
    >
      <div
        className="overflow-hidden rounded outline-none focus-visible:ring-2 focus-visible:ring-teal-light"
        role="region"
        aria-roledescription="carrusel"
        aria-label="Testimonios de pacientes"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={trackRef}
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${activo * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className="w-full flex-shrink-0"
              aria-hidden={activo !== i}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {/* Anuncio silencioso para lectores de pantalla al cambiar de slide */}
      <span className="sr-only" role="status" aria-live="polite">
        Mostrando {activo + 1} de {slides.length}
      </span>

      {slides.length > 1 && (
        <div className="mt-7 flex items-center justify-center gap-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => irA(i)}
              aria-label={`Ir al testimonio ${i + 1} de ${slides.length}`}
              aria-current={activo === i}
              className={
                'h-1.5 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-light ' +
                (activo === i ? 'w-7 bg-copper' : 'w-1.5 bg-line hover:bg-teal-light')
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
