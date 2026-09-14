import { Link, useLocation } from 'react-router-dom';

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

  return (
    <header className="sticky top-0 z-50 flex h-[88px] items-center justify-between border-b border-line bg-bg/90 px-6 backdrop-blur-md md:px-10">
      <Link to="/" className="flex flex-col leading-tight">
        <span className="font-serif text-[17px] font-medium tracking-tight">
          Dr. Rolando Vargas Calvetty
        </span>
        <span className="text-[11px] text-teal-light">
          Ginecólogo — Oncólogo — Mastólogo
        </span>
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

      <Link
        to="/agendar-cita"
        className="rounded bg-copper px-5 py-2.5 text-sm font-medium text-[#23140A] transition-colors hover:bg-copper-hover"
      >
        Agendar cita
      </Link>
    </header>
  );
}
