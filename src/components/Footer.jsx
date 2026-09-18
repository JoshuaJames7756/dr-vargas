import { Link } from 'react-router-dom';
import logo from '../assets/logo-transparent.png';

export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-14 md:px-10">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-1.5">
          <div className="mb-1 flex items-center gap-2.5">
            <img src={logo} alt="Logo Dr. Rolando Vargas Calvetty" className="h-9 w-9 object-contain" />
            <span className="font-serif text-base font-medium">
              Dr. Rolando Vargas Calvetty
            </span>
          </div>
          <span className="text-sm text-muted">
            Ginecólogo, oncólogo y mastólogo
          </span>
          <span className="text-sm text-muted">R.B.S.P.B. San Pablo, Brasil</span>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="mb-1 text-[12.5px] text-teal-light">Consultorio</span>
          <span className="text-sm text-muted">
            Parque Fidel Anze #200, Esq. Av. Pando
          </span>
          <span className="text-sm text-muted">
            Edif. VyV NUR, Primer piso, Cochabamba
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="mb-1 text-[12.5px] text-teal-light">Contacto</span>
          <a
            href="https://wa.me/59170344225"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted transition-colors hover:text-paper"
          >
            WhatsApp: +591 70344225
          </a>
          <span className="text-sm text-muted">Tel: 4011030 · 4011040</span>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="mb-1 text-[12.5px] text-teal-light">Navegación</span>
          <Link
            to="/agendar-cita"
            className="text-sm text-muted transition-colors hover:text-paper"
          >
            Agendar cita
          </Link>
          <Link
            to="/contacto"
            className="text-sm text-muted transition-colors hover:text-paper"
          >
            Contacto
          </Link>
          <a
            href="https://www.facebook.com/ginecologocochabamba"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted transition-colors hover:text-paper"
          >
            Facebook
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-[1180px] border-t border-line pt-6 text-center">
        <a
          href="https://xiontech-seven.vercel.app"
          target="_blank"
          rel="noreferrer"
          className="text-[12.5px] text-muted transition-colors hover:text-teal-light"
        >
          Sitio desarrollado por <span className="font-medium">Xion Technology</span>
        </a>
      </div>
    </footer>
  );
}
