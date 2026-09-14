import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../lib/useReveal.js';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import ServicioAcordeon from '../components/ServicioAcordeon.jsx';

const SERVICIOS = [
  {
    nombre: 'Tratamiento de cáncer',
    descripcion:
      'Diagnóstico y plan de tratamiento personalizado, definido junto contigo según el tipo y la etapa de la enfermedad.',
  },
  {
    nombre: 'Quimioterapia',
    descripcion:
      'Aplicación de medicamentos para tratar el cáncer, con seguimiento cercano de la respuesta y los efectos del tratamiento.',
  },
  {
    nombre: 'Hormonoterapia',
    descripcion:
      'Tratamiento que actúa sobre las hormonas para frenar el crecimiento de ciertos tipos de cáncer sensibles a ellas.',
  },
  {
    nombre: 'Terapia molecular',
    descripcion:
      'Tratamiento dirigido a características específicas de las células cancerosas, buscando mayor precisión y menos efectos secundarios.',
  },
  {
    nombre: 'Medicina paliativa',
    descripcion:
      'Cuidado enfocado en el bienestar y la calidad de vida, acompañando síntomas y decisiones en cualquier etapa del tratamiento.',
  },
];

export default function Oncologia() {
  const [abiertoIdx, setAbiertoIdx] = useState(0);
  const containerRef = useReveal();

  return (
    <div ref={containerRef}>
      <Navbar />

      <main>
        {/* Hero con más aire vertical que Ginecología — tono calmado, sin urgencia */}
        <header className="border-b border-line px-6 py-24 md:px-10 md:py-32">
          <div className="reveal mx-auto max-w-[1180px]">
            <p className="mb-5 text-[13px] text-teal-light">
              Atención especializada
            </p>
            <h1 className="max-w-[18ch] font-serif text-[32px] font-normal leading-[1.22] tracking-tight md:text-[46px]">
              Oncología y Mastología
            </h1>
            <p className="mt-7 max-w-[54ch] text-[17px] leading-[1.75] text-muted">
              Un diagnóstico oncológico trae muchas preguntas. Aquí encuentras
              información clara sobre cada tratamiento, y un espacio para
              resolver tus dudas con calma, a tu ritmo.
            </p>
          </div>
        </header>

        {/* Lista con más espacio entre ítems que Ginecología */}
        <section className="bg-bg-alt px-6 py-20 md:px-10">
          <div className="reveal mx-auto max-w-[760px]">
            {SERVICIOS.map((s, i) => (
              <ServicioAcordeon
                key={s.nombre}
                servicio={s}
                abierto={abiertoIdx === i}
                onToggle={() => setAbiertoIdx(abiertoIdx === i ? -1 : i)}
              />
            ))}
          </div>
        </section>

        {/* CTA contenido, no urgente */}
        <section className="px-6 py-20 md:px-10">
          <div className="reveal mx-auto max-w-[720px] rounded border border-line bg-bg-alt p-12 text-center md:p-16">
            <h2 className="mx-auto max-w-[28ch] font-serif text-[24px] font-normal leading-snug md:text-[30px]">
              Habla directamente con el Dr. Vargas
            </h2>
            <p className="mx-auto mt-4 max-w-[44ch] text-[15px] text-muted">
              Si tienes un diagnóstico reciente o buscas una segunda opinión,
              agenda una consulta y conversemos sobre los siguientes pasos.
            </p>
            <Link
              to="/agendar-cita"
              className="mt-8 inline-block rounded bg-copper px-8 py-4 text-[15px] font-medium text-[#23140A] transition-colors hover:bg-copper-hover"
            >
              Agendar cita
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
