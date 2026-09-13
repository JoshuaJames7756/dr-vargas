import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import '../assets/css/contacto.css';

export default function Contacto() {
  return (
    <>
      <Navbar />

      <main className="contacto">
        <header className="contacto__header">
          <h1>Contacto</h1>
          <p>Escríbenos o visítanos en el consultorio. También puedes agendar tu cita en línea.</p>
        </header>

        <section className="contacto__grid">
          <div className="contacto__info">
            <div className="contacto__item">
              <span className="contacto__label">Dirección</span>
              <p>Parque Fidel Anze #200, Esq. Av. Pando</p>
              <p>Edif. VyV NUR, Primer piso, Cochabamba, Bolivia</p>
            </div>

            <div className="contacto__item">
              <span className="contacto__label">WhatsApp</span>
              <a href="https://wa.me/59170344225" target="_blank" rel="noreferrer">+591 70344225</a>
            </div>

            <div className="contacto__item">
              <span className="contacto__label">Teléfonos fijos</span>
              <p>4011030 · 4011040</p>
            </div>

            <div className="contacto__item">
              <span className="contacto__label">Redes sociales</span>
              <div className="contacto__redes">
                <a href="#" target="_blank" rel="noreferrer">Instagram</a>
                <a href="https://www.facebook.com/ginecologocochabamba" target="_blank" rel="noreferrer">Facebook</a>
              </div>
            </div>

            <div className="contacto__item">
              <span className="contacto__label">Horario de atención</span>
              <p className="contacto__pendiente">Pendiente de confirmar días y bloques exactos</p>
            </div>
          </div>

          <div className="contacto__mapa">
            <iframe
              title="Ubicación del consultorio"
              src="https://www.google.com/maps?q=Parque+Fidel+Anze+200+Cochabamba+Bolivia&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
