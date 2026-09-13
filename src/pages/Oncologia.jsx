import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import ServicioAcordeon from '../components/ServicioAcordeon.jsx';
import '../assets/css/servicios.css';

const SERVICIOS = [
  {
    nombre: 'Tratamiento de cáncer',
    descripcion: 'Diagnóstico y plan de tratamiento personalizado, definido junto contigo según el tipo y la etapa de la enfermedad.',
  },
  {
    nombre: 'Quimioterapia',
    descripcion: 'Aplicación de medicamentos para tratar el cáncer, con seguimiento cercano de la respuesta y los efectos del tratamiento.',
  },
  {
    nombre: 'Hormonoterapia',
    descripcion: 'Tratamiento que actúa sobre las hormonas para frenar el crecimiento de ciertos tipos de cáncer sensibles a ellas.',
  },
  {
    nombre: 'Terapia molecular',
    descripcion: 'Tratamiento dirigido a características específicas de las células cancerosas, buscando mayor precisión y menos efectos secundarios.',
  },
  {
    nombre: 'Medicina paliativa',
    descripcion: 'Cuidado enfocado en el bienestar y la calidad de vida, acompañando síntomas y decisiones en cualquier etapa del tratamiento.',
  },
];

export default function Oncologia() {
  const [abiertoIdx, setAbiertoIdx] = useState(0);

  return (
    <>
      <Navbar />

      <main className="servicios servicios--onco">
        <header className="servicios__header servicios__header--onco">
          <p className="servicios__eyebrow">Atención especializada</p>
          <h1>Oncología y Mastología</h1>
          <p className="servicios__intro">
            Un diagnóstico oncológico trae muchas preguntas. Aquí encuentras información
            clara sobre cada tratamiento, y un espacio para resolver tus dudas con calma,
            a tu ritmo.
          </p>
        </header>

        <section className="servicios__lista">
          {SERVICIOS.map((s, i) => (
            <ServicioAcordeon
              key={s.nombre}
              servicio={s}
              abierto={abiertoIdx === i}
              onToggle={() => setAbiertoIdx(abiertoIdx === i ? -1 : i)}
            />
          ))}
        </section>

        <section className="servicios__cta servicios__cta--onco">
          <h2>Habla directamente con el Dr. Vargas</h2>
          <p>
            Si tienes un diagnóstico reciente o buscas una segunda opinión, agenda una
            consulta y conversemos sobre los siguientes pasos.
          </p>
          <Link to="/agendar-cita" className="btn-cta">Agendar cita</Link>
        </section>
      </main>

      <Footer />
    </>
  );
}
