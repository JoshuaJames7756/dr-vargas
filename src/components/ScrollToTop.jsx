import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Sube el scroll al inicio en cada cambio de ruta.
// React Router no hace esto automático — sin este componente,
// al navegar a una página nueva el usuario sigue viendo el scroll
// donde se quedó en la página anterior.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
