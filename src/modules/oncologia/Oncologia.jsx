import { Button } from "@/components/ui/button";
import { useReveal } from "@/lib/useReveal";

const SERVICIOS = [
  {
    n: "01",
    titulo: "Diagnóstico y tratamiento del cáncer",
    desc: "Evaluación oncológica completa y definición de un plan de tratamiento claro, explicado paso a paso junto a la paciente y su familia.",
  },
  {
    n: "02",
    titulo: "Quimioterapia",
    desc: "Administración y seguimiento de tratamientos de quimioterapia, con monitoreo cercano de la respuesta y el bienestar general.",
  },
  {
    n: "03",
    titulo: "Hormonoterapia",
    desc: "Tratamiento hormonal dirigido en casos donde el tumor responde a este tipo de terapia, como parte de un plan integral.",
  },
  {
    n: "04",
    titulo: "Terapia molecular",
    desc: "Tratamientos dirigidos a características moleculares específicas del tumor, cuando corresponde según el diagnóstico.",
  },
  {
    n: "05",
    titulo: "Medicina paliativa",
    desc: "Cuidado enfocado en el bienestar y la calidad de vida, con acompañamiento cercano en cada etapa del proceso.",
  },
];

function Eyebrow({ children }) {
  return (
    <div className="mb-6 flex items-center gap-3.5">
      <span className="h-px w-8 bg-copper" />
      <span className="text-[13px] text-teal-light">{children}</span>
    </div>
  );
}

export default function Oncologia() {
  const containerRef = useReveal();

  return (
    <div ref={containerRef}>
      {/* HERO — tono calmado, más aire, sin urgencia visual */}
      <section className="border-b border-line py-24 md:py-32">
        <div className="mx-auto max-w-[1180px] px-10">
          <Eyebrow>Área de atención</Eyebrow>
          <h1 className="reveal reveal-delay-1 max-w-[18ch] font-serif text-[34px] font-normal leading-[1.2] tracking-tight md:text-[48px]">
            Seguimiento oncológico y mastológico, con{" "}
            <em className="font-normal italic text-teal-light">
              claridad en cada paso
            </em>
          </h1>
          <p className="reveal reveal-delay-2 mt-7 max-w-[56ch] text-[17px] leading-[1.75] text-muted">
            Un diagnóstico oncológico trae muchas preguntas. El objetivo de
            cada consulta es dar información clara, un plan de tratamiento
            entendible y acompañamiento constante — sin apuro y sin
            alarmismo.
          </p>
          <div className="reveal reveal-delay-3 mt-10">
            <Button asChild>
              <a href="#agendar" className="group">
                Agendar consulta{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* LISTA DE SERVICIOS — una columna, mucho más aire que Ginecología */}
      <section className="bg-bg-alt py-24 md:py-28">
        <div className="mx-auto max-w-[840px] px-10">
          <div className="flex flex-col">
            {SERVICIOS.map((s, i) => (
              <div
                key={s.n}
                className={`reveal border-t border-line py-12 ${
                  i === SERVICIOS.length - 1 ? "border-b" : ""
                }`}
              >
                <div className="flex flex-col gap-4 md:flex-row md:gap-10">
                  <span className="font-serif text-base italic text-teal-light md:w-12 md:flex-shrink-0">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="font-serif text-[24px] font-medium leading-snug">
                      {s.titulo}
                    </h3>
                    <p className="mt-3 max-w-[52ch] text-[15.5px] leading-[1.75] text-muted">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOQUE DE ACOMPAÑAMIENTO — refuerzo empático, sin ser el foco visual dominante */}
      <section className="py-20">
        <div className="mx-auto max-w-[1180px] px-10">
          <div className="reveal grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <h2 className="font-serif text-[24px] font-normal leading-snug">
                Un mismo especialista, en cada etapa
              </h2>
              <p className="mt-4 max-w-[46ch] text-[15px] leading-[1.7] text-muted">
                El Dr. Vargas atiende tanto el diagnóstico inicial como el
                seguimiento a largo plazo, evitando que la paciente tenga
                que repetir su historia con distintos especialistas.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-[24px] font-normal leading-snug">
                Información clara, sin tecnicismos innecesarios
              </h2>
              <p className="mt-4 max-w-[46ch] text-[15px] leading-[1.7] text-muted">
                Cada opción de tratamiento se explica en términos
                entendibles, con espacio para preguntas y para tomar
                decisiones informadas junto al equipo médico.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSICIÓN A GINECOLOGÍA */}
      <section className="bg-bg-alt py-16">
        <div className="mx-auto max-w-[1180px] px-10">
          <div className="reveal flex flex-col items-start justify-between gap-6 border-t border-line pt-10 md:flex-row md:items-center">
            <div className="max-w-[52ch]">
              <p className="font-serif text-[19px] italic leading-snug text-paper">
                ¿Buscas un control ginecológico de rutina?
              </p>
              <p className="mt-2 text-sm text-muted">
                Consultas preventivas, control prenatal y más.
              </p>
            </div>
            <Button asChild variant="secondary">
              <a href="/ginecologia">Ver servicios de Ginecología →</a>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA — tono contenido, no urgente */}
      <section id="agendar" className="py-20">
        <div className="mx-auto max-w-[1180px] px-10">
          <div className="reveal rounded border border-line bg-bg-alt p-12 text-center md:p-16">
            <h2 className="mx-auto max-w-[28ch] font-serif text-[26px] font-normal leading-snug md:text-[32px]">
              Agenda una consulta cuando estés lista para dar el siguiente
              paso
            </h2>
            <p className="mx-auto mt-4 max-w-[44ch] text-[15px] text-muted">
              Sin presión, con toda la información que necesitas para
              decidir con confianza.
            </p>
            <Button asChild className="mt-8">
              <a href="#">Agendar cita →</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
