import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import '../assets/css/sobre-el-doctor.css';

export default function SobreElDoctor() {
  return (
    <>
      <Navbar />

      <main className="sobre">
        <section className="sobre__hero">
          <div className="sobre__hero-texto">
            <p className="sobre__eyebrow">Sobre el doctor</p>
            <h1>Dr. Rolando Vargas Calvetty</h1>
            <p className="sobre__especialidad">Ginecólogo — Oncólogo — Mastólogo</p>
            <p className="sobre__intro">
              Formación y práctica clínica orientadas a acompañar a cada paciente con
              rigor médico y atención personalizada, en ginecología general y en el
              manejo de casos oncológicos y mastológicos.
            </p>
          </div>
          <div className="sobre__hero-foto">
            <img src="/img/dr-vargas-consultorio.jpg" alt="Dr. Rolando Vargas Calvetty en consultorio" />
          </div>
        </section>

        <section className="sobre__bloque">
          <h2>Formación y registro profesional</h2>
          <ul className="sobre__lista">
            <li>
              <strong>R.B.S.P.B.</strong> — Registro profesional, San Pablo, Brasil
            </li>
            <li className="sobre__pendiente">
              Especializaciones y estudios de posgrado — pendiente de confirmar con el Dr. Vargas
            </li>
            <li className="sobre__pendiente">
              Colegiatura / registro médico en Bolivia — pendiente de confirmar
            </li>
          </ul>
        </section>

        <section className="sobre__bloque">
          <h2>Enfoque de atención</h2>
          <p className="sobre__texto">
            La consulta combina dos áreas complementarias: la ginecología general, para
            el cuidado de rutina y el acompañamiento del embarazo, y la oncología y
            mastología, para el diagnóstico y tratamiento de casos que requieren mayor
            especialización. En ambos casos, cada paciente recibe una explicación clara
            de su diagnóstico y las opciones de tratamiento disponibles.
          </p>
        </section>

        <section className="sobre__cta">
          <h2>¿Quieres conversar con el Dr. Vargas?</h2>
          <Link to="/agendar-cita" className="btn-cta">Agendar cita</Link>
        </section>
      </main>

      <Footer />
    </>
  );
}
