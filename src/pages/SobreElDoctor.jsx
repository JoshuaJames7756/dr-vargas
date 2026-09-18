import { Link } from 'react-router-dom';
import { SEO } from '../lib/seo.js';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Seo from '../components/Seo.jsx';
import consultorioPlaceholder from '../assets/illustrations/consultorio-placeholder.svg';

export default function SobreElDoctor() {
  return (
    <div>
      <Seo title={SEO.sobreElDoctor.title} description={SEO.sobreElDoctor.description} />
      <Navbar />

      <main>
        <section className="px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-14 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <h1 className="font-serif text-[36px] font-normal leading-[1.12] tracking-tight md:text-[48px]">
                Dr. Rolando Vargas Calvetty
              </h1>
              <p className="mt-3 text-base text-teal-light">
                Ginecólogo, oncólogo y mastólogo
              </p>
              <p className="mt-6 max-w-[52ch] text-[16.5px] leading-[1.7] text-muted">
                Formación y práctica clínica orientadas a acompañar a cada paciente
                con rigor médico y atención personalizada, en ginecología general y
                en el manejo de casos oncológicos y mastológicos.
              </p>
            </div>
            <div className="aspect-[4/5] max-w-[340px] overflow-hidden rounded">
              <img
                src={consultorioPlaceholder}
                alt="Ilustración referencial, foto de consultorio pendiente"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="border-t border-line px-6 py-16 md:px-10">
          <div className="mx-auto max-w-[1180px]">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-serif text-2xl font-normal">
                Formación y registro profesional
              </h2>
              <span className="text-[11px] italic text-muted/60">datos de ejemplo</span>
            </div>
            <ul className="flex max-w-[640px] flex-col gap-3">
              <li className="border-t border-line pt-4 text-[15px]">
                <strong className="text-paper">R.B.S.P.B.</strong>
                <span className="text-muted">, registro profesional, San Pablo, Brasil</span>
              </li>
              <li className="border-t border-line pt-4 text-[15px]">
                <strong className="text-paper">2009</strong>
                <span className="text-muted">, título de Medicina, Universidad Mayor de San Simón</span>
              </li>
              <li className="border-t border-line pt-4 text-[15px]">
                <strong className="text-paper">2013</strong>
                <span className="text-muted">, especialización en Ginecología y Obstetricia</span>
              </li>
              <li className="border-y border-line py-4 text-[15px]">
                <strong className="text-paper">2016</strong>
                <span className="text-muted">, subespecialización en Oncología y Mastología, San Pablo, Brasil</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="bg-bg-alt px-6 py-16 md:px-10">
          <div className="mx-auto max-w-[1180px]">
            <h2 className="mb-5 font-serif text-2xl font-normal">
              Enfoque de atención
            </h2>
            <p className="max-w-[62ch] text-[16px] leading-[1.75] text-muted">
              La consulta combina dos áreas complementarias: la ginecología
              general, para el cuidado de rutina y el acompañamiento del embarazo,
              y la oncología y mastología, para el diagnóstico y tratamiento de
              casos que requieren mayor especialización. En ambos casos, cada
              paciente recibe una explicación clara de su diagnóstico y las
              opciones de tratamiento disponibles.
            </p>
          </div>
        </section>

        <section className="px-6 py-16 text-center md:px-10">
          <div className="mx-auto max-w-[52ch]">
            <h2 className="font-serif text-2xl font-normal">
              ¿Quieres conversar con el Dr. Vargas?
            </h2>
            <Link
              to="/agendar-cita"
              className="mt-6 inline-block rounded bg-copper px-8 py-4 text-[15px] font-medium text-[#23140A] transition-colors hover:bg-copper-hover"
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
