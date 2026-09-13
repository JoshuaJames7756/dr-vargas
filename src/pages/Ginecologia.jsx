import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import ServicioAcordeon from '../components/ServicioAcordeon.jsx';
import '../assets/css/servicios.css';

const SERVICIOS = [
  {
    nombre: 'Embarazo, cesárea y control obstétrico',
    descripcion: 'Seguimiento del embarazo desde el primer trimestre, con acompañamiento en el parto o la cesárea según cada caso.',
  },
  {
    nombre: 'Control prenatal — embarazo de alto y bajo riesgo',
    descripcion: 'Controles periódicos para monitorear el desarrollo del embarazo, con manejo especializado cuando existen factores de riesgo.',
  },
  {
    nombre: 'Colposcopia',
    descripcion: 'Examen que permite observar el cuello uterino con mayor detalle, usado para detectar lesiones tempranas.',
  },
  {
    nombre: 'Toma de Papanicolau',
    descripcion: 'Prueba de detección temprana de cáncer de cuello uterino, recomendada como parte del control ginecológico anual.',
  },
  {
    nombre: 'Vulvoscopia',
    descripcion: 'Evaluación detallada de la vulva para identificar lesiones o alteraciones que no siempre son visibles a simple vista.',
  },
  {
    nombre: 'Diagnóstico de VPH',
    descripcion: 'Detección del virus del papiloma humano, clave para prevenir complicaciones y dar seguimiento oportuno.',
  },
  {
    nombre: 'Cirugía ginecológica',
    descripcion: 'Procedimientos quirúrgicos para tratar distintas condiciones ginecológicas, evaluados según cada diagnóstico.',
  },
  {
    nombre: 'Cirugía mamaria',
    descripcion: 'Intervenciones relacionadas con la salud de la mama, desde biopsias hasta procedimientos mayores.',
  },
  {
    nombre: 'Sexualidad',
    descripcion: 'Espacio de consulta abierta para resolver dudas o dificultades relacionadas con la salud sexual femenina.',
  },
  {
    nombre: 'Planificación familiar',
    descripcion: 'Orientación sobre métodos anticonceptivos y decisiones reproductivas, adaptada a cada etapa de vida.',
  },
  {
    nombre: 'Climaterio, menopausia y osteoporosis',
    descripcion: 'Manejo de los cambios hormonales de la menopausia y prevención de la pérdida de densidad ósea asociada.',
  },
];

export default function Ginecologia() {
  const [abiertoIdx, setAbiertoIdx] = useState(0);

  return (
    <>
      <Navbar />

      <main className="servicios">
        <header className="servicios__header servicios__header--gineco">
          <p className="servicios__eyebrow">Consulta habitual</p>
          <h1>Ginecología</h1>
          <p className="servicios__intro">
            Atención integral en cada etapa: desde el control anual de rutina hasta el
            acompañamiento durante el embarazo y la menopausia.
          </p>
        </header>

        <section className="servicios__lista">
          {SERVICIOS.map((s, i) => (
            <ServicioAcordeon
              key={s.nombre}
              servicio={s}
              abierto={abiertoIdx === i}
              onToggle={() => setAbiertoIdx(abiertoIdx === i ? -1 : i)}
            />
          ))}
        </section>

        <section className="servicios__cta">
          <h2>¿No sabes con cuál servicio empezar?</h2>
          <p>Agenda una consulta y el Dr. Vargas te orientará según tu situación.</p>
          <Link to="/agendar-cita" className="btn-cta">Agendar cita</Link>
        </section>
      </main>

      <Footer />
    </>
  );
}
