import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo-transparent.png';

const LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/sobre-el-doctor', label: 'Sobre el Dr. Vargas' },
  { to: '/ginecologia', label: 'Ginecología' },
  { to: '/oncologia-mastologia', label: 'Oncología y Mastología' },
  { to: '/contenido', label: 'Contenido' },
  { to: '/contacto', label: 'Contacto' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    setAbierto(false);
  }, [pathname]);

  useEffect(() => {
    if (!abierto) return;
    function handleEscape(e) {
      if (e.key === 'Escape') setAbierto(false);
    }
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [abierto]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur-md">
      <div className="flex h-[88px] items-center justify-between px-6 md:px-10">
        <Link to="/" className="group flex items-center gap-3" onClick={() => setAbierto(false)}>
          <img src={logo} alt="Logo Dr. Rolando Vargas Calvetty" className="h-11 w-11 object-contain" />
          <div className="flex flex-col leading-tight">
            <span className="font-serif text-[17px] font-medium tracking-tight transition-colors group-hover:text-teal-light">
              Dr. Rolando Vargas Calvetty
            </span>
            <span className="text-[11px] text-teal-light">
              Ginecólogo, oncólogo y mastólogo
            </span>
          </div>
        </Link>

        <nav className="hidden gap-8 text-[14.5px] text-muted lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={
                'group relative pb-1 transition-colors hover:text-paper' +
                (pathname === l.to ? ' text-paper' : '')
              }
            >
              {l.label}
              <span
                className={
                  'absolute bottom-0 left-0 h-px bg-copper transition-all duration-300 ease-out ' +
                  (pathname === l.to ? 'w-full' : 'w-0 group-hover:w-full')
                }
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/agendar-cita"
            className="hidden rounded bg-copper px-5 py-2.5 text-sm font-medium text-[#23140A] transition-all duration-300 hover:-translate-y-0.5 hover:bg-copper-hover hover:shadow-md hover:shadow-copper/20 sm:inline-block"
          >
            Agendar cita
          </Link>

          <button
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
            onClick={() => setAbierto((v) => !v)}
            aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={abierto}
            aria-controls="menu-mobile"
          >
            <span
              className={
                'h-px w-6 bg-paper transition-all duration-300 ' +
                (abierto ? 'translate-y-[3.5px] rotate-45' : '')
              }
            />
            <span
              className={
                'h-px w-6 bg-paper transition-all duration-300 ' +
                (abierto ? '-translate-y-[3.5px] -rotate-45' : '')
              }
            />
          </button>
        </div>
      </div>

      {/* Menú mobile desplegable */}
      <div
        id="menu-mobile"
        className={
          'overflow-hidden transition-[max-height,opacity] duration-400 ease-out lg:hidden ' +
          (abierto ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0')
        }
      >
        <nav className="flex flex-col gap-1 border-t border-line px-6 py-4">
          {LINKS.map((l, i) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setAbierto(false)}
              className={
                'animate-slide-in-left rounded px-2 py-3 text-[15px] transition-colors ' +
                (pathname === l.to ? 'text-paper' : 'text-muted hover:text-paper')
              }
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/agendar-cita"
            onClick={() => setAbierto(false)}
            className="mt-2 rounded bg-copper px-5 py-3 text-center text-sm font-medium text-[#23140A] transition-colors hover:bg-copper-hover sm:hidden"
          >
            Agendar cita
          </Link>
        </nav>
      </div>
    </header>
  );
}
