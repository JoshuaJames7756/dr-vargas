import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-14 md:px-10">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-1.5">
          <span className="font-serif text-base font-medium">
            Dr. Rolando Vargas Calvetty
          </span>
          <span className="text-sm text-muted">
            Ginecólogo — Oncólogo — Mastólogo
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
    </footer>
  );
}
