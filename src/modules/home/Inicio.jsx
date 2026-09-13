import { Button } from "@/components/ui/button";
import { useReveal } from "@/lib/useReveal";
import logoTransparent from "@/assets/logo-transparent.png";

function ImagePlaceholder({ label, hint, className = "" }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded border border-dashed border-paper/30 bg-bg-alt bg-[repeating-linear-gradient(45deg,rgba(247,244,236,0.05)_0px,rgba(247,244,236,0.05)_12px,transparent_12px,transparent_24px)] ${className}`}
    >
      <div className="max-w-[82%] rounded border border-paper/20 bg-bg/90 px-4 py-2 text-center text-xs font-medium text-teal-light">
        {label}
        {hint && (
          <span className="mt-1 block text-[10.5px] font-normal text-muted">
            {hint}
          </span>
        )}
      </div>
    </div>
  );
}

function Eyebrow({ children }) {
  return (
    <div className="mb-6 flex items-center gap-3.5">
      <span className="h-px w-8 bg-copper" />
      <span className="text-[13px] text-teal-light">{children}</span>
    </div>
  );
}

export default function Inicio() {
  const containerRef = useReveal();

  return (
    <div ref={containerRef}>
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur-md">
        <nav className="mx-auto flex h-[88px] max-w-[1180px] items-center justify-between px-10">
          <div className="flex items-center gap-3.5">
            <img
              src={logoTransparent}
              alt="Logo Dr. Rolando Vargas Calvetty"
              className="h-[52px] w-[52px] object-contain"
            />
            <div className="flex flex-col leading-tight">
              <strong className="font-serif text-[17px] font-medium tracking-tight">
                Dr. Rolando Vargas
              </strong>
              <small className="text-[11px] text-teal-light">
                Ginecólogo · Oncólogo · Mastólogo
              </small>
            </div>
          </div>
          <div className="hidden gap-9 text-[14.5px] text-muted md:flex">
            {["Especialidades", "Sobre el doctor", "Contenido", "Contacto"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                  className="group relative pb-1 transition-colors hover:text-paper"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-copper transition-all duration-300 ease-out group-hover:w-full" />
                </a>
              ),
            )}
          </div>
          <Button asChild size="sm" className="rounded-[3px]">
            <a href="#contacto">Agendar cita</a>
          </Button>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden py-24 md:py-[110px]">
        <div className="pointer-events-none absolute -right-40 -top-32 h-[560px] w-[560px] animate-drift rounded-full bg-[radial-gradient(circle,rgba(55,166,147,0.16)_0%,transparent_70%)]" />
        <div className="relative mx-auto grid max-w-[1180px] grid-cols-1 gap-16 px-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <Eyebrow>Consultorio en Cochabamba, Bolivia</Eyebrow>
            <h1 className="reveal reveal-delay-1 max-w-[13ch] font-serif text-[38px] font-normal leading-[1.1] tracking-tight md:text-[58px]">
              Atención ginecológica y oncológica con{" "}
              <em className="font-normal italic text-teal-light">
                criterio médico
              </em>{" "}
              y cercanía real
            </h1>
            <p className="reveal reveal-delay-2 mt-6 max-w-[44ch] text-[17px] leading-[1.7] text-muted">
              Consultas de ginecología general, control prenatal y
              seguimiento oncológico-mastológico, con el mismo especialista
              en cada etapa.
            </p>
            <div className="reveal reveal-delay-3 mt-9 flex items-center gap-7">
              <Button asChild>
                <a href="#contacto" className="group">
                  Agendar cita{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </Button>
              <Button asChild variant="link">
                <a href="#especialidades">Ver especialidades</a>
              </Button>
            </div>
            <div className="reveal reveal-delay-3 mt-[54px] grid grid-cols-3 gap-8 md:gap-12">
              <div>
                <div className="font-serif text-[32px] tabular-nums">[XX]</div>
                <div className="mt-1 max-w-[16ch] text-[12.5px] text-muted">
                  años de experiencia clínica
                </div>
              </div>
              <div>
                <div className="font-serif text-[32px] tabular-nums">
                  [X,XXX]
                </div>
                <div className="mt-1 max-w-[16ch] text-[12.5px] text-muted">
                  pacientes atendidas
                </div>
              </div>
              <div>
                <div className="font-serif text-[32px] tabular-nums">2</div>
                <div className="mt-1 max-w-[16ch] text-[12.5px] text-muted">
                  especialidades certificadas
                </div>
              </div>
            </div>
          </div>
          <ImagePlaceholder
            className="reveal reveal-delay-2 aspect-[3/4]"
            label="RETRATO PROFESIONAL DR. VARGAS"
            hint="Bata blanca, fondo neutro, vertical 3:4 — pendiente de recibir"
          />
        </div>
      </section>

      {/* ESPECIALIDADES */}
      <section id="especialidades" className="bg-bg-alt py-24 md:py-[104px]">
        <div className="mx-auto max-w-[1180px] px-10">
          <div className="reveal mb-16 max-w-[620px]">
            <Eyebrow>Áreas de atención</Eyebrow>
            <h2 className="font-serif text-[28px] font-normal leading-tight md:text-[38px]">
              Dos especialidades, un mismo acompañamiento
            </h2>
            <p className="mt-4 max-w-[58ch] text-base text-muted">
              Desde el control ginecológico de rutina hasta el manejo
              oncológico más delicado, cada consulta se trata con el detalle
              clínico que requiere.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2">
          <div className="reveal bg-bg p-11 transition-colors hover:bg-[#142B25]">
            <span className="mb-5 block font-serif text-[15px] italic text-teal-light">
              Ginecología
            </span>
            <h3 className="mb-3.5 font-serif text-[25px] font-medium">
              Salud ginecológica integral
            </h3>
            <p className="mb-6 max-w-[46ch] text-[15px] text-muted">
              Consultas preventivas, control del embarazo y procedimientos
              ginecológicos con seguimiento cercano en cada etapa.
            </p>
            <ul className="mb-7 flex flex-col gap-2.5">
              {[
                "Embarazo, cesárea y obstetricia",
                "Control prenatal — embarazo alto y bajo riesgo",
                "Colposcopia y toma de Papanicolau",
                "Vulvoscopia y diagnóstico de VPH",
                "Cirugía ginecológica y mamaria",
                "Sexualidad y planificación familiar",
                "Climaterio, menopausia y osteoporosis",
              ].map((item) => (
                <li
                  key={item}
                  className="group relative pl-[18px] text-[14.5px] transition-[padding] hover:pl-[22px]"
                >
                  <span className="absolute left-0 top-[9px] h-px w-1.5 bg-copper transition-all group-hover:w-2.5" />
                  {item}
                </li>
              ))}
            </ul>
            <Button asChild variant="link">
              <a href="#">Ver todos los servicios →</a>
            </Button>
          </div>
          <div className="reveal reveal-delay-1 bg-bg-alt p-11 transition-colors hover:bg-[#142B25]">
            <span className="mb-5 block font-serif text-[15px] italic text-teal-light">
              Oncología · Mastología
            </span>
            <h3 className="mb-3.5 font-serif text-[25px] font-medium">
              Seguimiento oncológico especializado
            </h3>
            <p className="mb-6 max-w-[46ch] text-[15px] text-muted">
              Diagnóstico y tratamiento con un enfoque claro, informado y
              humano, en cada paso del proceso.
            </p>
            <ul className="mb-7 flex flex-col gap-2.5">
              {[
                "Tratamiento de cáncer",
                "Quimioterapia",
                "Hormonoterapia",
                "Terapia molecular",
                "Medicina paliativa",
              ].map((item) => (
                <li
                  key={item}
                  className="group relative pl-[18px] text-[14.5px] transition-[padding] hover:pl-[22px]"
                >
                  <span className="absolute left-0 top-[9px] h-px w-1.5 bg-copper transition-all group-hover:w-2.5" />
                  {item}
                </li>
              ))}
            </ul>
            <Button asChild variant="link">
              <a href="#">Ver todos los servicios →</a>
            </Button>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-line py-[60px]">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-10 px-10 md:grid-cols-3">
          <div className="reveal">
            <div className="font-serif text-[22px] leading-snug">
              R.B.S.P.B.
            </div>
            <div className="mt-1.5 text-[12.5px] text-muted">
              Registro profesional — San Pablo, Brasil
            </div>
          </div>
          <div className="reveal reveal-delay-1">
            <div className="font-serif text-[22px] leading-snug">
              [Universidad / año]
            </div>
            <div className="mt-1.5 text-[12.5px] text-muted">
              Formación de especialidad — pendiente confirmar
            </div>
          </div>
          <div className="reveal reveal-delay-2">
            <div className="font-serif text-[22px] leading-snug">3</div>
            <div className="mt-1.5 text-[12.5px] text-muted">
              Especialidades: ginecología, oncología, mastología
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE EL DOCTOR */}
      <section id="sobre-el-doctor" className="py-24 md:py-[104px]">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-16 px-10 md:grid-cols-[0.8fr_1.2fr] md:items-start">
          <ImagePlaceholder
            className="reveal aspect-[4/5] max-w-[300px]"
            label="FOTO SOBRE EL DOCTOR"
            hint="Consultorio o retrato cercano, vertical 4:5 — pendiente de recibir"
          />
          <div className="reveal reveal-delay-1">
            <Eyebrow>Sobre el Dr. Vargas</Eyebrow>
            <h2 className="mb-6 font-serif text-[28px] font-normal leading-tight md:text-[38px]">
              Formación y trayectoria
            </h2>
            <p className="mb-5 max-w-[56ch] text-[16.5px] text-muted">
              Rolando Vargas Calvetty es Ginecólogo, Oncólogo y Mastólogo
              con registro profesional R.B.S.P.B. en San Pablo, Brasil.
              Atiende en su consultorio propio en Cochabamba, acompañando a
              sus pacientes tanto en el control ginecológico de rutina como
              en procesos oncológicos que requieren mayor cuidado y
              claridad.
            </p>
            <p className="mb-5 max-w-[56ch] text-[16.5px] text-muted">
              [Espacio reservado para ampliar trayectoria: universidad de
              formación, año de titulación, especialización específica y
              enfoque personal de atención — pendiente de confirmar con el
              Dr. Vargas.]
            </p>
            <div className="mt-8 flex flex-col">
              {[
                ["Registro", "R.B.S.P.B. — San Pablo, Brasil"],
                ["[Año]", "[Título de grado en Medicina — pendiente]"],
                [
                  "[Año]",
                  "[Especialización en Ginecología y Obstetricia — pendiente]",
                ],
                [
                  "[Año]",
                  "[Subespecialización en Oncología / Mastología — pendiente]",
                ],
              ].map(([yr, label], i, arr) => (
                <div
                  key={label}
                  className={`flex flex-col gap-1 border-t border-line py-[17px] text-[14.5px] transition-[padding] hover:pl-1.5 md:flex-row md:justify-between md:gap-6 ${
                    i === arr.length - 1 ? "border-b" : ""
                  }`}
                >
                  <span className="min-w-[150px] flex-shrink-0 font-serif italic text-teal-light">
                    {yr}
                  </span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTENIDO */}
      <section id="contenido" className="bg-bg-alt py-24 md:py-[104px]">
        <div className="mx-auto max-w-[1180px] px-10">
          <div className="reveal mb-16 max-w-[620px]">
            <Eyebrow>Contenido educativo</Eyebrow>
            <h2 className="font-serif text-[28px] font-normal leading-tight md:text-[38px]">
              Publicaciones recientes
            </h2>
            <p className="mt-4 max-w-[58ch] text-base text-muted">
              Contenido educativo compartido en Instagram y Facebook sobre
              salud ginecológica y oncológica.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
            {[
              { tag: "Instagram", label: "POST DESTACADO 1", hint: "Reemplazar con embed real" },
              { tag: "Facebook", label: "POST DESTACADO 2", hint: "facebook.com/ginecologocochabamba" },
              { tag: "Instagram", label: "POST DESTACADO 3", hint: "Reemplazar con embed real" },
            ].map((post, i) => (
              <div
                key={post.label}
                className={`reveal ${i === 1 ? "reveal-delay-1" : i === 2 ? "reveal-delay-2" : ""} group relative cursor-pointer transition-transform duration-300 ease-out hover:-translate-y-1.5`}
              >
                <span className="absolute left-4 top-4 z-10 rounded-full border border-paper/20 bg-bg/85 px-3 py-1 text-[11px] text-teal-light">
                  {post.tag}
                </span>
                <ImagePlaceholder
                  className="aspect-[4/5]"
                  label={post.label}
                  hint={post.hint}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="contacto" className="bg-teal py-24">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-12 px-10 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div className="reveal text-bg">
            <h2 className="font-serif text-[30px] font-normal leading-tight md:text-[42px]">
              Agenda tu consulta con el Dr. Vargas
            </h2>
            <p className="mt-4 max-w-[48ch] text-base text-bg/80">
              Atención en consultorio propio, en Cochabamba. Confirmación
              inmediata por WhatsApp o correo electrónico.
            </p>
          </div>
          <div className="reveal reveal-delay-1 rounded bg-bg p-9 text-paper">
            {[
              ["📍", "Parque Fidel Anze N° 200, esq. Av. Pando, Edif. V&V NUR"],
              ["📞", "4011030 · 4011040 · WhatsApp +591 70344225"],
              ["🕐", "[Horario de atención — pendiente de confirmar]"],
            ].map(([icon, text], i, arr) => (
              <div
                key={text}
                className={`flex items-start gap-3.5 py-3.5 text-[14.5px] ${
                  i !== arr.length - 1 ? "border-b border-line" : ""
                }`}
              >
                <div className="mt-px flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-bg-alt text-sm text-copper">
                  {icon}
                </div>
                <span>{text}</span>
              </div>
            ))}
            <Button asChild className="mt-5 w-full justify-center">
              <a href="#" className="group">
                Agendar cita ahora{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-line py-14">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-start justify-between gap-8 px-10">
          <div className="flex items-center gap-3.5">
            <img
              src={logoTransparent}
              alt="Logo Dr. Rolando Vargas Calvetty"
              className="h-[52px] w-[52px] object-contain"
            />
            <div className="flex flex-col leading-tight">
              <strong className="font-serif text-[17px] font-medium">
                Dr. Rolando Vargas
              </strong>
              <small className="text-[11px] text-teal-light">
                Ginecólogo · Oncólogo · Mastólogo
              </small>
            </div>
          </div>
          <div className="flex flex-wrap gap-16">
            <div>
              <h4 className="mb-3.5 text-[12.5px] text-teal-light">
                Navegación
              </h4>
              {["Especialidades", "Sobre el doctor", "Contenido"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                    className="mb-2 block text-sm text-muted transition-colors hover:text-paper"
                  >
                    {item}
                  </a>
                ),
              )}
            </div>
            <div>
              <h4 className="mb-3.5 text-[12.5px] text-teal-light">
                Contacto
              </h4>
              <p className="mb-2 text-sm text-muted">4011030 · 4011040</p>
              <p className="mb-2 text-sm text-muted">
                WhatsApp +591 70344225
              </p>
            </div>
            <div>
              <h4 className="mb-3.5 text-[12.5px] text-teal-light">Redes</h4>
              <a
                href="https://facebook.com/ginecologocochabamba"
                target="_blank"
                rel="noreferrer"
                className="mb-2 block text-sm text-muted transition-colors hover:text-paper"
              >
                Facebook
              </a>
              <span className="mb-2 block text-sm text-muted">
                Instagram [pendiente]
              </span>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-11 max-w-[1180px] border-t border-line px-10 pt-[22px] text-[12.5px] text-muted">
          © 2026 Dr. Rolando Vargas Calvetty — Sitio desarrollado por
          JVSoftware
        </div>
      </footer>

      {/* WHATSAPP FLOAT */}
      <a
        href="https://wa.me/59170344225"
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-7 right-7 z-[60] flex h-[58px] w-[58px] animate-pulse-wa items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_6px_20px_rgba(0,0,0,0.4)] transition-transform duration-300 ease-out hover:scale-110 hover:[animation-play-state:paused]"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.48 1.32 5L2 22l5.25-1.38a9.96 9.96 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.83 14.19c-.24.68-1.4 1.31-1.94 1.36-.5.05-1.02.24-3.42-.71-2.9-1.15-4.77-4.1-4.92-4.29-.14-.19-1.18-1.57-1.18-3 0-1.43.75-2.13 1.02-2.42.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.65.5.24.58.82 2.01.89 2.16.07.14.12.31.02.5-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.14.14-.29.3-.13.58.17.29.75 1.24 1.62 2 1.11.99 2.05 1.3 2.34 1.44.29.14.46.12.63-.07.17-.19.72-.84.92-1.13.19-.29.39-.24.65-.14.27.1 1.68.79 1.97.93.29.14.48.22.55.34.07.12.07.7-.17 1.38z" />
        </svg>
      </a>
    </div>
  );
}
