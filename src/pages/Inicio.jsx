import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import '../assets/css/inicio.css';

export default function Inicio() {
  return (
    <>
      <Navbar />

      <main className="inicio">
        {/* HERO */}
        <section className="hero">
          <div className="hero__texto">
            <p className="hero__especialidad">Ginecología · Oncología · Mastología</p>
            <h1 className="hero__nombre">Dr. Rolando Vargas Calvetty</h1>
            <p className="hero__desc">
              Atención ginecológica y oncológica en Cochabamba, con un enfoque que combina
              rigor clínico y trato cercano en cada etapa del cuidado de tu salud.
            </p>
            <div className="hero__acciones">
              <Link to="/agendar-cita" className="btn-cta">Agendar cita</Link>
              <a href="https://wa.me/59170344225" target="_blank" rel="noreferrer" className="hero__whatsapp">
                Escribir por WhatsApp
              </a>
            </div>
          </div>

          <div className="hero__imagen">
            <img src="/img/dr-vargas-retrato.jpg" alt="Dr. Rolando Vargas Calvetty" />
            <div className="hero__loto" aria-hidden="true" />
          </div>
        </section>

        {/* BLOQUE DE CONFIANZA */}
        <section className="confianza">
          <div className="confianza__item">
            <span className="confianza__cifra">R.B.S.P.B.</span>
            <span className="confianza__label">Registro profesional — San Pablo, Brasil</span>
          </div>
          <div className="confianza__item">
            <span className="confianza__cifra">2</span>
            <span className="confianza__label">Áreas de especialidad bajo un mismo consultorio</span>
          </div>
          <div className="confianza__item">
            <span className="confianza__cifra">Cochabamba</span>
            <span className="confianza__label">Consultorio en Parque Fidel Anze, zona central</span>
          </div>
        </section>

        {/* DOS ÁREAS — tratamiento visual distinto entre sí, no cards idénticas */}
        <section className="areas">
          <Link to="/ginecologia" className="areas__gineco">
            <span className="areas__eyebrow">Consulta habitual</span>
            <h2>Ginecología</h2>
            <p>
              Control prenatal, colposcopia, Papanicolau, planificación familiar y manejo
              del climaterio y la menopausia — el cuidado ginecológico integral en cada etapa.
            </p>
            <span className="areas__link">Ver servicios de ginecología →</span>
          </Link>

          <Link to="/oncologia-mastologia" className="areas__onco">
            <span className="areas__eyebrow">Atención especializada</span>
            <h2>Oncología y Mastología</h2>
            <p>
              Diagnóstico, quimioterapia, hormonoterapia y medicina paliativa, con
              acompañamiento cercano en cada decisión del tratamiento.
            </p>
            <span className="areas__link">Ver servicios de oncología →</span>
          </Link>
        </section>

        {/* CTA FINAL + UBICACIÓN */}
        <section className="cta-final">
          <div className="cta-final__texto">
            <h2>Reserva tu consulta</h2>
            <p>
              Elige el día y la hora que mejor te acomoden. Confirmamos tu cita por
              WhatsApp o correo electrónico.
            </p>
            <Link to="/agendar-cita" className="btn-cta">Agendar cita</Link>
          </div>
          <div className="cta-final__mapa">
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
