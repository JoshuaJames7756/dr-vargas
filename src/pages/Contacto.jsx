import { useReveal } from '../lib/useReveal.js';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

export default function Contacto() {
  const containerRef = useReveal();

  return (
    <div ref={containerRef}>
      <Navbar />

      <main className="px-6 py-16 md:px-10">
        <header className="reveal mx-auto max-w-[1180px]">
          <h1 className="font-serif text-[32px] font-normal">Contacto</h1>
          <p className="mt-2 max-w-[52ch] text-[15px] text-muted">
            Escríbenos o visítanos en el consultorio. También puedes agendar tu
            cita en línea.
          </p>
        </header>

        <section className="reveal reveal-delay-1 mx-auto mt-12 grid max-w-[1180px] grid-cols-1 gap-14 md:grid-cols-[1fr_1.2fr]">
          <div className="flex flex-col gap-7">
            <div>
              <span className="text-[12.5px] text-teal-light">Dirección</span>
              <p className="mt-1.5 text-[15px] text-paper">
                Parque Fidel Anze #200, Esq. Av. Pando
              </p>
              <p className="text-[15px] text-paper">
                Edif. VyV NUR, Primer piso, Cochabamba, Bolivia
              </p>
            </div>

            <div>
              <span className="text-[12.5px] text-teal-light">WhatsApp</span>
              <p className="mt-1.5">
                <a
                  href="https://wa.me/59170344225"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[15px] text-paper underline decoration-line underline-offset-4 transition-colors hover:text-teal-light"
                >
                  +591 70344225
                </a>
              </p>
            </div>

            <div>
              <span className="text-[12.5px] text-teal-light">Teléfonos fijos</span>
              <p className="mt-1.5 text-[15px] text-paper">4011030 · 4011040</p>
            </div>

            <div>
              <span className="text-[12.5px] text-teal-light">Redes sociales</span>
              <div className="mt-1.5 flex gap-5">
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[15px] text-paper transition-colors hover:text-teal-light"
                >
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/ginecologocochabamba"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[15px] text-paper transition-colors hover:text-teal-light"
                >
                  Facebook
                </a>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[12.5px] text-teal-light">Horario de atención</span>
                <span className="text-[11px] italic text-muted/60">(ejemplo)</span>
              </div>
              <p className="mt-1.5 text-[15px] text-paper">Lunes a Viernes: 9:00–13:00 y 15:00–19:00</p>
              <p className="text-[15px] text-paper">Sábados: 9:00–12:00</p>
            </div>
          </div>

          <div className="aspect-[16/11] overflow-hidden rounded">
            <iframe
              title="Ubicación del consultorio"
              src="https://www.google.com/maps?q=Parque+Fidel+Anze+200+Cochabamba+Bolivia&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
