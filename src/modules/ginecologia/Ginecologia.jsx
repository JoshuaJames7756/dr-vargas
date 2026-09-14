import { Button } from "@/components/ui/button";
import { useReveal } from "@/lib/useReveal";

const SERVICIOS = [
  {
    n: "01",
    titulo: "Embarazo, cesárea y obstetricia",
    desc: "Acompañamiento obstétrico completo, desde el diagnóstico de embarazo hasta el parto o cesárea, con seguimiento personalizado en cada etapa.",
  },
  {
    n: "02",
    titulo: "Control prenatal",
    desc: "Seguimiento de embarazo de alto y bajo riesgo, con controles periódicos para monitorear la salud de la madre y el desarrollo del bebé.",
  },
  {
    n: "03",
    titulo: "Colposcopia",
    desc: "Examen detallado del cuello uterino para detectar cambios celulares tempranos, procedimiento ambulatorio y sin dolor significativo.",
  },
  {
    n: "04",
    titulo: "Toma de Papanicolau",
    desc: "Prueba de detección temprana de cáncer cervicouterino, recomendada como control ginecológico de rutina.",
  },
  {
    n: "05",
    titulo: "Vulvoscopia",
    desc: "Examen especializado de la vulva para el diagnóstico de lesiones o alteraciones que requieren evaluación detallada.",
  },
  {
    n: "06",
    titulo: "Diagnóstico de VPH",
    desc: "Detección del virus del papiloma humano mediante pruebas específicas, con orientación clara sobre siguientes pasos.",
  },
  {
    n: "07",
    titulo: "Cirugía ginecológica",
    desc: "Procedimientos quirúrgicos ginecológicos, desde intervenciones menores hasta cirugías mayores, con criterio conservador cuando es posible.",
  },
  {
    n: "08",
    titulo: "Cirugía mamaria",
    desc: "Evaluación y tratamiento quirúrgico de patologías mamarias, con enfoque en diagnóstico oportuno.",
  },
  {
    n: "09",
    titulo: "Sexualidad",
    desc: "Orientación y atención de temas relacionados con la salud sexual femenina, en un espacio de confianza y sin prejuicios.",
  },
  {
    n: "10",
    titulo: "Planificación familiar",
    desc: "Asesoría sobre métodos anticonceptivos adaptados a las necesidades y etapa de vida de cada paciente.",
  },
  {
    n: "11",
    titulo: "Climaterio y menopausia",
    desc: "Manejo integral de los síntomas del climaterio y la menopausia, para mejorar la calidad de vida en esta etapa.",
  },
  {
    n: "12",
    titulo: "Osteoporosis",
    desc: "Evaluación y manejo preventivo de la salud ósea, particularmente relevante en el seguimiento post-menopáusico.",
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

export default function Ginecologia() {
  const containerRef = useReveal();

  return (
    <div ref={containerRef}>
      {/* HERO DE SECCIÓN */}
      <section className="border-b border-line py-20 md:py-28">
        <div className="mx-auto max-w-[1180px] px-10">
          <Eyebrow>Área de atención</Eyebrow>
          <h1 className="reveal reveal-delay-1 max-w-[16ch] font-serif text-[36px] font-normal leading-[1.12] tracking-tight md:text-[52px]">
            Salud ginecológica{" "}
            <em className="font-normal italic text-teal-light">integral</em>
          </h1>
          <p className="reveal reveal-delay-2 mt-6 max-w-[58ch] text-[17px] leading-[1.7] text-muted">
            Doce áreas de atención que cubren desde el control preventivo de
            rutina hasta procedimientos quirúrgicos, con la misma atención
            personalizada en cada consulta.
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

      {/* LISTA DE SERVICIOS — densa, tipográfica, sin cards con sombra */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-[1180px] px-10">
          <div className="grid grid-cols-1 gap-x-16 gap-y-0 md:grid-cols-2">
            {SERVICIOS.map((s, i) => (
              <div
                key={s.n}
                className={`reveal group border-t border-line py-9 ${
                  i % 2 === 0 ? "md:pr-8" : "md:pl-8"
                } ${i >= SERVICIOS.length - 2 ? "border-b" : ""}`}
              >
                <div className="flex items-baseline gap-5">
                  <span className="font-serif text-[15px] italic text-teal-light">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="font-serif text-[21px] font-medium leading-snug transition-colors group-hover:text-teal-light">
                      {s.titulo}
                    </h3>
                    <p className="mt-2.5 max-w-[48ch] text-[14.5px] leading-[1.65] text-muted">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOTA CLÍNICA / TRANSICIÓN A ONCOLOGÍA */}
      <section className="bg-bg-alt py-16">
        <div className="mx-auto max-w-[1180px] px-10">
          <div className="reveal flex flex-col items-start justify-between gap-6 border-t border-line pt-10 md:flex-row md:items-center">
            <div className="max-w-[52ch]">
              <p className="font-serif text-[19px] italic leading-snug text-paper">
                ¿La consulta requiere seguimiento oncológico o mastológico?
              </p>
              <p className="mt-2 text-sm text-muted">
                El Dr. Vargas atiende ambas áreas con el mismo criterio de
                cuidado y continuidad.
              </p>
            </div>
            <Button asChild variant="secondary">
              <a href="/oncologia">Ver servicios de Oncología →</a>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="agendar" className="bg-teal py-20">
        <div className="mx-auto flex max-w-[1180px] flex-col items-start justify-between gap-8 px-10 md:flex-row md:items-center">
          <div className="reveal text-bg">
            <h2 className="font-serif text-[28px] font-normal leading-tight md:text-[36px]">
              Agenda tu control ginecológico
            </h2>
            <p className="mt-3 max-w-[44ch] text-[15px] text-bg/80">
              Confirmación inmediata por WhatsApp o correo electrónico.
            </p>
          </div>
          <Button
            asChild
            variant="secondary"
            className="reveal reveal-delay-1 border-bg text-bg hover:border-bg/70"
          >
            <a href="#">Agendar cita ahora →</a>
          </Button>
        </div>
      </section>
    </div>
  );
}
