import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__col">
        <span className="footer__name">Dr. Rolando Vargas Calvetty</span>
        <span className="footer__specialty">Ginecólogo — Oncólogo — Mastólogo</span>
        <span className="footer__reg">R.B.S.P.B. San Pablo, Brasil</span>
      </div>

      <div className="footer__col">
        <span className="footer__label">Consultorio</span>
        <span>Parque Fidel Anze #200, Esq. Av. Pando</span>
        <span>Edif. VyV NUR, Primer piso, Cochabamba</span>
      </div>

      <div className="footer__col">
        <span className="footer__label">Contacto</span>
        <a href="https://wa.me/59170344225" target="_blank" rel="noreferrer">WhatsApp: +591 70344225</a>
        <span>Tel: 4011030 · 4011040</span>
      </div>

      <div className="footer__col">
        <span className="footer__label">Navegación</span>
        <Link to="/agendar-cita">Agendar cita</Link>
        <Link to="/contacto">Contacto</Link>
        <a href="https://www.facebook.com/ginecologocochabamba" target="_blank" rel="noreferrer">Facebook</a>
      </div>
    </footer>
  );
}
