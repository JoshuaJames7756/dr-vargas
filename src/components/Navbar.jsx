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
    <header className="navbar">
      <Link to="/" className="navbar__brand">
        <span className="navbar__brand-name">Dr. Rolando Vargas Calvetty</span>
        <span className="navbar__brand-specialty">Ginecólogo — Oncólogo — Mastólogo</span>
      </Link>

      <nav className="navbar__links">
        {LINKS.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className={'navbar__link' + (pathname === l.to ? ' is-active' : '')}
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <Link to="/agendar-cita" className="btn-cta navbar__cta">Agendar cita</Link>
    </header>
  );
}
