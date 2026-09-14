import { Link } from 'react-router-dom';
import { useReveal } from '../lib/useReveal.js';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

export default function Inicio() {
  const containerRef = useReveal();

  return (
    <div ref={containerRef}>
      <Navbar />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden px-6 py-20 md:px-10 md:py-28">
          <div className="pointer-events-none absolute -right-40 -top-32 h-[560px] w-[560px] animate-drift rounded-full bg-[radial-gradient(circle,rgba(55,166,147,0.16)_0%,transparent_70%)]" />
          <div className="relative mx-auto grid max-w-[1180px] grid-cols-1 gap-14 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="reveal">
              <p className="mb-4 text-[13px] text-teal-light">
                Ginecología · Oncología · Mastología
              </p>
              <h1 className="max-w-[14ch] font-serif text-[38px] font-normal leading-[1.12] tracking-tight md:text-[54px]">
                Dr. Rolando Vargas Calvetty
              </h1>
              <p className="mt-6 max-w-[46ch] text-[17px] leading-[1.7] text-muted">
                Atención ginecológica y oncológica en Cochabamba, con un enfoque que
                combina rigor clínico y trato cercano en cada etapa del cuidado de
                tu salud.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-7">
                <Link
                  to="/agendar-cita"
                  className="rounded bg-copper px-8 py-4 text-[15px] font-medium text-[#23140A] transition-colors hover:bg-copper-hover"
                >
                  Agendar cita
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

            <div className="reveal reveal-delay-2 relative aspect-[3/4] overflow-hidden rounded">
              <img
                src="/img/dr-vargas-retrato.jpg"
                alt="Dr. Rolando Vargas Calvetty"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute -inset-2.5 -z-10 rounded border border-teal opacity-50" />
            </div>
          </div>
        </section>

        {/* BLOQUE DE CONFIANZA */}
        <section className="border-y border-line px-6 py-14 md:px-10">
          <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="reveal">
              <span className="block font-serif text-[22px]">R.B.S.P.B.</span>
              <span className="mt-1.5 block text-[12.5px] text-muted">
                Registro profesional — San Pablo, Brasil
              </span>
            </div>
            <div className="reveal reveal-delay-1">
              <span className="block font-serif text-[22px]">2</span>
              <span className="mt-1.5 block text-[12.5px] text-muted">
                Áreas de especialidad bajo un mismo consultorio
              </span>
            </div>
            <div className="reveal reveal-delay-2">
              <span className="block font-serif text-[22px]">Cochabamba</span>
              <span className="mt-1.5 block text-[12.5px] text-muted">
                Consultorio en Parque Fidel Anze, zona central
              </span>
            </div>
          </div>
        </section>

        {/* DOS ÁREAS — tratamiento visual distinto entre sí */}
        <section className="grid grid-cols-1 gap-px border-x border-line bg-line md:grid-cols-2">
          <Link
            to="/ginecologia"
            className="reveal group bg-bg p-11 transition-colors hover:bg-[#142B25]"
          >
            <span className="mb-5 block font-serif text-[15px] italic text-teal-light">
              Consulta habitual
            </span>
            <h2 className="mb-3.5 font-serif text-[26px] font-medium">
              Ginecología
            </h2>
            <p className="max-w-[42ch] text-[15px] leading-relaxed text-muted">
              Control prenatal, colposcopia, Papanicolau, planificación familiar y
              manejo del climaterio y la menopausia — el cuidado ginecológico
              integral en cada etapa.
            </p>
            <span className="mt-6 inline-block border-b border-line pb-1 text-[14.5px] text-paper transition-colors group-hover:border-paper">
              Ver servicios de ginecología →
            </span>
          </Link>

          <Link
            to="/oncologia-mastologia"
            className="reveal reveal-delay-1 group bg-bg-alt p-11 transition-colors hover:bg-[#142B25]"
          >
            <span className="mb-5 block font-serif text-[15px] italic text-teal-light">
              Atención especializada
            </span>
            <h2 className="mb-3.5 font-serif text-[26px] font-medium">
              Oncología y Mastología
            </h2>
            <p className="max-w-[42ch] text-[15px] leading-relaxed text-muted">
              Diagnóstico, quimioterapia, hormonoterapia y medicina paliativa, con
              acompañamiento cercano en cada decisión del tratamiento.
            </p>
            <span className="mt-6 inline-block border-b border-line pb-1 text-[14.5px] text-paper transition-colors group-hover:border-paper">
              Ver servicios de oncología →
            </span>
          </Link>
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
                className="mt-7 inline-block rounded bg-bg px-8 py-4 text-[15px] font-medium text-paper transition-opacity hover:opacity-90"
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
