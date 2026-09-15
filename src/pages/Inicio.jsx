import { Link } from 'react-router-dom';
import { useReveal } from '../lib/useReveal.js';
import { useCountUp } from '../lib/useCountUp.js';
import { SEO, JSON_LD_PHYSICIAN } from '../lib/seo.js';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Carrusel from '../components/Carrusel.jsx';
import Seo from '../components/Seo.jsx';
import retratoPlaceholder from '../assets/illustrations/retrato-placeholder.svg';

const TESTIMONIOS = [
  {
    texto:
      'Me explicó cada paso del tratamiento con mucha claridad. Me sentí acompañada en todo momento.',
    autor: 'Paciente de control prenatal',
  },
  {
    texto: 'Profesionalismo y calidez. Explica todo en términos que se entienden, sin apuro.',
    autor: 'Paciente de consulta ginecológica',
  },
  {
    texto: 'Agendar la cita fue muy fácil y la atención en el consultorio excelente.',
    autor: 'Paciente de seguimiento oncológico',
  },
];

function CifraAnimada({ target, suffix = '', label }) {
  const { ref, value } = useCountUp(target);
  return (
    <div>
      <span ref={ref} className="block font-serif text-[26px] tabular-nums">
        {value.toLocaleString('es-BO')}
        {suffix}
      </span>
      <span className="mt-1.5 block text-[12.5px] text-muted">{label}</span>
    </div>
  );
}

export default function Inicio() {
  const containerRef = useReveal();

  return (
    <div ref={containerRef} className="animate-page-in">
      <Seo title={SEO.inicio.title} description={SEO.inicio.description} jsonLd={JSON_LD_PHYSICIAN} />
      <Navbar />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden px-6 py-20 md:px-10 md:py-28">
          <div className="pointer-events-none absolute -right-40 -top-32 h-[560px] w-[560px] animate-drift rounded-full bg-[radial-gradient(circle,rgba(55,166,147,0.16)_0%,transparent_70%)]" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-[380px] w-[380px] animate-drift rounded-full bg-[radial-gradient(circle,rgba(201,123,74,0.09)_0%,transparent_70%)] [animation-delay:3s]" />

          <div className="relative mx-auto grid max-w-[1180px] grid-cols-1 gap-14 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="reveal">
              <p className="mb-4 animate-fade-in text-[13px] text-teal-light [animation-delay:0.1s]">
                Ginecología · Oncología · Mastología
              </p>
              <h1 className="max-w-[14ch] animate-slide-in-left font-serif text-[38px] font-normal leading-[1.12] tracking-tight md:text-[54px] [animation-delay:0.2s]">
                Dr. Rolando Vargas Calvetty
              </h1>
              <p className="mt-6 max-w-[46ch] animate-fade-in text-[17px] leading-[1.7] text-muted [animation-delay:0.4s]">
                Atención ginecológica y oncológica en Cochabamba, con un enfoque que
                combina rigor clínico y trato cercano en cada etapa del cuidado de
                tu salud.
              </p>
              <div className="mt-9 flex animate-fade-in flex-wrap items-center gap-7 [animation-delay:0.55s]">
                <Link
                  to="/agendar-cita"
                  className="group relative overflow-hidden rounded bg-copper px-8 py-4 text-[15px] font-medium text-[#23140A] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-copper/20"
                >
                  <span className="relative z-10">Agendar cita</span>
                  <span className="absolute inset-0 -translate-x-full bg-copper-hover transition-transform duration-300 group-hover:translate-x-0" />
                </Link>
                <a
                  href="https://wa.me/59170344225"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-1.5 border-b border-line pb-1 text-[14.5px] text-paper transition-colors hover:border-paper"
                >
                  Escribir por WhatsApp
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </div>

            <div className="reveal reveal-delay-2 group relative aspect-[3/4] overflow-hidden rounded">
              <img
                src={retratoPlaceholder}
                alt="Ilustración referencial — retrato del Dr. Vargas pendiente"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="pointer-events-none absolute -inset-2.5 -z-10 rounded border border-teal opacity-50 transition-opacity duration-500 group-hover:opacity-80" />
            </div>
          </div>
        </section>

        {/* BLOQUE DE CONFIANZA — cifras animadas al entrar en viewport */}
        <section className="border-y border-line px-6 py-14 md:px-10">
          <div className="mx-auto grid max-w-[1180px] grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="reveal">
              <CifraAnimada
                target={15}
                suffix="+"
                label={
                  <>
                    años de experiencia clínica{' '}
                    <em className="not-italic text-muted/60">(ejemplo)</em>
                  </>
                }
              />
            </div>
            <div className="reveal reveal-delay-1">
              <CifraAnimada
                target={2000}
                suffix="+"
                label={
                  <>
                    pacientes atendidas <em className="not-italic text-muted/60">(ejemplo)</em>
                  </>
                }
              />
            </div>
            <div className="reveal reveal-delay-2">
              <span className="block font-serif text-[22px]">R.B.S.P.B.</span>
              <span className="mt-1.5 block text-[12.5px] text-muted">
                Registro profesional — San Pablo, Brasil
              </span>
            </div>
            <div className="reveal reveal-delay-3">
              <span className="block font-serif text-[22px]">Cochabamba</span>
              <span className="mt-1.5 block text-[12.5px] text-muted">
                Consultorio en Parque Fidel Anze, zona central
              </span>
            </div>
          </div>
        </section>

        {/* DOS ÁREAS — hover más expresivo con acento lateral que crece */}
        <section className="grid grid-cols-1 gap-px border-x border-line bg-line md:grid-cols-2">
          <Link
            to="/ginecologia"
            className="reveal group relative overflow-hidden bg-bg p-11 transition-colors duration-300 hover:bg-[#142B25]"
          >
            <span className="absolute left-0 top-0 h-full w-0 bg-copper transition-all duration-500 ease-out group-hover:w-1" />
            <span className="mb-5 block font-serif text-[15px] italic text-teal-light">
              Consulta habitual
            </span>
            <h2 className="mb-3.5 font-serif text-[26px] font-medium transition-transform duration-300 group-hover:translate-x-1.5">
              Ginecología
            </h2>
            <p className="max-w-[42ch] text-[15px] leading-relaxed text-muted">
              Control prenatal, colposcopia, Papanicolau, planificación familiar y
              manejo del climaterio y la menopausia — el cuidado ginecológico
              integral en cada etapa.
            </p>
            <span className="mt-6 inline-flex items-center gap-1.5 border-b border-line pb-1 text-[14.5px] text-paper transition-colors group-hover:border-paper">
              Ver servicios de ginecología
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </Link>

          <Link
            to="/oncologia-mastologia"
            className="reveal reveal-delay-1 group relative overflow-hidden bg-bg-alt p-11 transition-colors duration-300 hover:bg-[#142B25]"
          >
            <span className="absolute left-0 top-0 h-full w-0 bg-teal transition-all duration-500 ease-out group-hover:w-1" />
            <span className="mb-5 block font-serif text-[15px] italic text-teal-light">
              Atención especializada
            </span>
            <h2 className="mb-3.5 font-serif text-[26px] font-medium transition-transform duration-300 group-hover:translate-x-1.5">
              Oncología y Mastología
            </h2>
            <p className="max-w-[42ch] text-[15px] leading-relaxed text-muted">
              Diagnóstico, quimioterapia, hormonoterapia y medicina paliativa, con
              acompañamiento cercano en cada decisión del tratamiento.
            </p>
            <span className="mt-6 inline-flex items-center gap-1.5 border-b border-line pb-1 text-[14.5px] text-paper transition-colors group-hover:border-paper">
              Ver servicios de oncología
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </Link>
        </section>

        {/* TESTIMONIOS — carrusel con auto-play */}
        <section className="px-6 py-20 md:px-10">
          <div className="mx-auto max-w-[720px]">
            <div className="reveal mb-10 flex items-center justify-between">
              <p className="text-[13px] text-teal-light">Testimonios</p>
              <span className="text-[11px] italic text-muted/60">contenido de ejemplo</span>
            </div>
            <div className="reveal">
              <Carrusel autoPlayMs={5500}>
                {TESTIMONIOS.map((t) => (
                  <div key={t.autor} className="px-1 text-center">
                    <p className="font-serif text-[20px] italic leading-relaxed text-paper md:text-[22px]">
                      “{t.texto}”
                    </p>
                    <p className="mt-5 text-[13px] text-muted">— {t.autor}</p>
                  </div>
                ))}
              </Carrusel>
            </div>
          </div>
        </section>

        {/* CTA FINAL + UBICACIÓN */}
        <section className="bg-teal px-6 py-20 md:px-10">
          <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-10 md:grid-cols-[1fr_1.1fr] md:items-center">
            <div className="reveal text-bg">
              <h2 className="font-serif text-[28px] font-normal leading-tight md:text-[34px]">
                Reserva tu consulta
              </h2>
              <p className="mt-4 max-w-[40ch] text-[15px] text-bg/80">
                Elige el día y la hora que mejor te acomoden. Confirmamos tu cita
                por WhatsApp o correo electrónico.
              </p>
              <Link
                to="/agendar-cita"
                className="mt-7 inline-block rounded bg-bg px-8 py-4 text-[15px] font-medium text-paper transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
              >
                Agendar cita
              </Link>
            </div>
            <div className="reveal reveal-delay-1 aspect-[16/10] overflow-hidden rounded">
              <iframe
                title="Ubicación del consultorio"
                src="https://www.google.com/maps?q=Parque+Fidel+Anze+200+Cochabamba+Bolivia&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
