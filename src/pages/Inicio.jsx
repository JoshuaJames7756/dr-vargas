import { Link } from 'react-router-dom';
import { useReveal } from '../lib/useReveal.js';
import { useCountUp } from '../lib/useCountUp.js';
import { SEO } from '../lib/seo.js';
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
    <div ref={containerRef}>
      <Seo title={SEO.inicio.title} description={SEO.inicio.description} />
      <Navbar />

      <main>
        {/* HERO — único momento orquestado de la página: el nombre entra
            con una pequeña pausa de anticipación, el resto sigue en cascada
            corta. No se repite este tratamiento en el resto del sitio. */}
        <section className="relative overflow-hidden px-6 py-20 md:px-10 md:py-28">
          <div className="pointer-events-none absolute -right-40 -top-32 h-[560px] w-[560px] animate-drift rounded-full bg-[radial-gradient(circle,rgba(55,166,147,0.16)_0%,transparent_70%)]" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-[380px] w-[380px] animate-drift rounded-full bg-[radial-gradient(circle,rgba(201,123,74,0.09)_0%,transparent_70%)] [animation-delay:3s]" />

          <div className="relative mx-auto grid max-w-[1180px] grid-cols-1 gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <h1 className="max-w-[15ch] animate-slide-in-left font-serif text-[38px] font-normal leading-[1.12] tracking-tight md:text-[54px]">
                Dr. Rolando Vargas Calvetty
              </h1>
              <p className="mt-3 animate-fade-in text-[16px] text-teal-light [animation-delay:0.15s]">
                Ginecología, oncología y mastología en Cochabamba
              </p>
              <p className="mt-6 max-w-[46ch] animate-fade-in text-[17px] leading-[1.7] text-muted [animation-delay:0.35s]">
                Atención con un enfoque que combina rigor clínico y trato cercano,
                desde el control ginecológico de rutina hasta el seguimiento
                oncológico más delicado.
              </p>
              <div className="mt-9 flex animate-fade-in flex-wrap items-center gap-7 [animation-delay:0.5s]">
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
                  className="border-b border-line pb-1 text-[14.5px] text-paper transition-colors hover:border-paper"
                >
                  Escribir por WhatsApp
                </a>
              </div>
            </div>

            <div className="group relative aspect-[3/4] overflow-hidden rounded">
              <img
                src={retratoPlaceholder}
                alt="Ilustración referencial, retrato del Dr. Vargas pendiente"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="pointer-events-none absolute -inset-2.5 -z-10 rounded border border-teal opacity-50 transition-opacity duration-500 group-hover:opacity-80" />
            </div>
          </div>
        </section>

        {/* BLOQUE DE CONFIANZA — cifras animadas al entrar en viewport */}
        <section className="border-y border-line px-6 py-14 md:px-10">
          <div className="mx-auto grid max-w-[1180px] grid-cols-2 gap-8 sm:grid-cols-4">
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
            <CifraAnimada
              target={2000}
              suffix="+"
              label={
                <>
                  pacientes atendidas <em className="not-italic text-muted/60">(ejemplo)</em>
                </>
              }
            />
            <div>
              <span className="block font-serif text-[22px]">R.B.S.P.B.</span>
              <span className="mt-1.5 block text-[12.5px] text-muted">
                Registro profesional, San Pablo, Brasil
              </span>
            </div>
            <div>
              <span className="block font-serif text-[22px]">Cochabamba</span>
              <span className="mt-1.5 block text-[12.5px] text-muted">
                Consultorio en Parque Fidel Anze, zona central
              </span>
            </div>
          </div>
        </section>

        {/* DOS ÁREAS — el nombre de cada especialidad es lo grande; el
            contexto ("consulta de rutina" vs "atención especializada")
            vive en el primer renglón del párrafo, no en una etiqueta aparte */}
        <section className="grid grid-cols-1 gap-px border-x border-line bg-line md:grid-cols-2">
          <Link
            to="/ginecologia"
            className="group relative overflow-hidden bg-bg p-7 transition-colors duration-300 hover:bg-[#142B25] md:p-11"
          >
            <span className="absolute left-0 top-0 h-full w-0 bg-copper transition-all duration-500 ease-out group-hover:w-1" />
            <h2 className="mb-3.5 font-serif text-[24px] font-medium transition-transform duration-300 group-hover:translate-x-1.5 md:text-[26px]">
              Ginecología
            </h2>
            <p className="max-w-[42ch] text-[15px] leading-relaxed text-muted">
              La consulta de rutina: control prenatal, colposcopia, Papanicolau,
              planificación familiar y manejo del climaterio y la menopausia.
            </p>
            <span className="mt-6 inline-block border-b border-line pb-1 text-[14.5px] text-paper transition-colors group-hover:border-paper">
              Ver servicios de ginecología
            </span>
          </Link>

          <Link
            to="/oncologia-mastologia"
            className="group relative overflow-hidden bg-bg-alt p-7 transition-colors duration-300 hover:bg-[#142B25] md:p-11"
          >
            <span className="absolute left-0 top-0 h-full w-0 bg-teal transition-all duration-500 ease-out group-hover:w-1" />
            <h2 className="mb-3.5 font-serif text-[24px] font-medium transition-transform duration-300 group-hover:translate-x-1.5 md:text-[26px]">
              Oncología y Mastología
            </h2>
            <p className="max-w-[42ch] text-[15px] leading-relaxed text-muted">
              Cuando el caso requiere más: diagnóstico, quimioterapia,
              hormonoterapia y medicina paliativa, con acompañamiento cercano en
              cada decisión.
            </p>
            <span className="mt-6 inline-block border-b border-line pb-1 text-[14.5px] text-paper transition-colors group-hover:border-paper">
              Ver servicios de oncología
            </span>
          </Link>
        </section>

        {/* TESTIMONIOS — carrusel con auto-play */}
        <section className="px-6 py-20 md:px-10">
          <div className="mx-auto max-w-[720px]">
            <div className="mb-10 flex items-center justify-between">
              <h2 className="font-serif text-[22px] font-normal">Lo que dicen las pacientes</h2>
              <span className="text-[11px] italic text-muted/60">contenido de ejemplo</span>
            </div>
            <Carrusel autoPlayMs={5500}>
              {TESTIMONIOS.map((t) => (
                <div key={t.autor} className="px-1 text-center">
                  <p className="font-serif text-[20px] italic leading-relaxed text-paper md:text-[22px]">
                    “{t.texto}”
                  </p>
                  <p className="mt-5 text-[13px] text-muted">{t.autor}</p>
                </div>
              ))}
            </Carrusel>
          </div>
        </section>

        {/* CTA FINAL + UBICACIÓN */}
        <section className="bg-teal px-6 py-20 md:px-10">
          <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div className="text-bg">
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
            <div className="aspect-[16/10] overflow-hidden rounded">
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
