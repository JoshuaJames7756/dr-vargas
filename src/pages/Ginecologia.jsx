import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../lib/useReveal.js';
import { SEO } from '../lib/seo.js';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import ServicioAcordeon from '../components/ServicioAcordeon.jsx';
import Seo from '../components/Seo.jsx';

const SERVICIOS = [
  {
    nombre: 'Embarazo, cesárea y control obstétrico',
    descripcion:
      'Seguimiento del embarazo desde el primer trimestre, con acompañamiento en el parto o la cesárea según cada caso.',
  },
  {
    nombre: 'Control prenatal — embarazo de alto y bajo riesgo',
    descripcion:
      'Controles periódicos para monitorear el desarrollo del embarazo, con manejo especializado cuando existen factores de riesgo.',
  },
  {
    nombre: 'Colposcopia',
    descripcion:
      'Examen que permite observar el cuello uterino con mayor detalle, usado para detectar lesiones tempranas.',
  },
  {
    nombre: 'Toma de Papanicolau',
    descripcion:
      'Prueba de detección temprana de cáncer de cuello uterino, recomendada como parte del control ginecológico anual.',
  },
  {
    nombre: 'Vulvoscopia',
    descripcion:
      'Evaluación detallada de la vulva para identificar lesiones o alteraciones que no siempre son visibles a simple vista.',
  },
  {
    nombre: 'Diagnóstico de VPH',
    descripcion:
      'Detección del virus del papiloma humano, clave para prevenir complicaciones y dar seguimiento oportuno.',
  },
  {
    nombre: 'Cirugía ginecológica',
    descripcion:
      'Procedimientos quirúrgicos para tratar distintas condiciones ginecológicas, evaluados según cada diagnóstico.',
  },
  {
    nombre: 'Cirugía mamaria',
    descripcion:
      'Intervenciones relacionadas con la salud de la mama, desde biopsias hasta procedimientos mayores.',
  },
  {
    nombre: 'Sexualidad',
    descripcion:
      'Espacio de consulta abierta para resolver dudas o dificultades relacionadas con la salud sexual femenina.',
  },
  {
    nombre: 'Planificación familiar',
    descripcion:
      'Orientación sobre métodos anticonceptivos y decisiones reproductivas, adaptada a cada etapa de vida.',
  },
  {
    nombre: 'Climaterio, menopausia y osteoporosis',
    descripcion:
      'Manejo de los cambios hormonales de la menopausia y prevención de la pérdida de densidad ósea asociada.',
  },
];

export default function Ginecologia() {
  const [abiertoIdx, setAbiertoIdx] = useState(0);
  const containerRef = useReveal();

  return (
    <div ref={containerRef} className="animate-page-in">
      <Seo title={SEO.ginecologia.title} description={SEO.ginecologia.description} />
      <Navbar />

      <main>
        <header className="border-b border-line px-6 py-20 md:px-10 md:py-28">
          <div className="reveal mx-auto max-w-[1180px]">
            <p className="mb-5 text-[13px] text-teal-light">Consulta habitual</p>
            <h1 className="max-w-[14ch] font-serif text-[36px] font-normal leading-[1.12] tracking-tight md:text-[50px]">
              Ginecología
            </h1>
            <p className="mt-6 max-w-[56ch] text-[17px] leading-[1.7] text-muted">
              Atención integral en cada etapa: desde el control anual de rutina
              hasta el acompañamiento durante el embarazo y la menopausia.
            </p>
          </div>
        </header>

        <section className="px-6 py-16 md:px-10">
          <div className="mx-auto max-w-[820px]">
            {SERVICIOS.map((s, i) => (
              <div
                key={s.nombre}
                className="reveal"
                style={{ transitionDelay: `${Math.min(i * 0.06, 0.4)}s` }}
              >
                <ServicioAcordeon
                  servicio={s}
                  abierto={abiertoIdx === i}
                  onToggle={() => setAbiertoIdx(abiertoIdx === i ? -1 : i)}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="bg-bg-alt px-6 py-16 text-center md:px-10">
          <div className="reveal mx-auto max-w-[52ch]">
            <h2 className="font-serif text-[26px] font-normal leading-snug">
              ¿No sabes con cuál servicio empezar?
            </h2>
            <p className="mt-3 text-[15px] text-muted">
              Agenda una consulta y el Dr. Vargas te orientará según tu
              situación.
            </p>
            <Link
              to="/agendar-cita"
              className="mt-7 inline-block rounded bg-copper px-8 py-4 text-[15px] font-medium text-[#23140A] transition-colors hover:bg-copper-hover"
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
