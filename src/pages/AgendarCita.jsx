import { useState } from 'react';
import StepIndicator from '../components/StepIndicator.jsx';
import CalendarioDisponibilidad from '../components/CalendarioDisponibilidad.jsx';
import { useDisponibilidad } from '../hooks/useDisponibilidad.js';
import '../assets/css/agendar-cita.css';

const TIPOS_CONSULTA = [
  { value: 'ginecologia', label: 'Ginecología general' },
  { value: 'control_prenatal', label: 'Control prenatal' },
  { value: 'oncologia_mastologia', label: 'Oncología / Mastología' },
  { value: 'segunda_opinion', label: 'Segunda opinión' },
  { value: 'otro', label: 'Otro' },
];

export default function AgendarCita() {
  const [paso, setPaso] = useState(1);
  const [fecha, setFecha] = useState(null);
  const [hora, setHora] = useState(null);
  const [datos, setDatos] = useState({
    nombre_paciente: '',
    telefono: '',
    email: '',
    tipo_consulta: '',
    primera_vez: true,
  });
  const [enviando, setEnviando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState(null);
  const [citaConfirmada, setCitaConfirmada] = useState(null);

  const { horarios, cargando, error: errorDisponibilidad } = useDisponibilidad(fecha);

  function handleSeleccionarFecha(iso) {
    setFecha(iso);
    setHora(null);
  }

  function handleCampoDatos(campo, valor) {
    setDatos((prev) => ({ ...prev, [campo]: valor }));
  }

  function datosValidos() {
    return datos.nombre_paciente.trim().length > 2 && datos.telefono.trim().length >= 7 && datos.tipo_consulta;
  }

  async function confirmarCita() {
    setEnviando(true);
    setErrorEnvio(null);
    try {
      const res = await fetch('/api/citas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...datos, fecha, hora }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorEnvio(data.error || 'No pudimos registrar tu cita. Intenta de nuevo.');
        return;
      }
      setCitaConfirmada(data.cita);
    } catch {
      setErrorEnvio('Hubo un problema de conexión. Intenta de nuevo.');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className="agendar">
      <header className="agendar__header">
        <h1>Agendar cita</h1>
        <p>Reserva tu consulta con el Dr. Rolando Vargas Calvetty en tres pasos simples.</p>
      </header>

      <StepIndicator pasoActual={citaConfirmada ? 4 : paso} />

      {/* PASO 1 — FECHA Y HORA */}
      {paso === 1 && !citaConfirmada && (
        <section className="agendar__paso">
          <div className="agendar__paso-grid">
            <div>
              <h2>Elige el día</h2>
              <CalendarioDisponibilidad
                fechaSeleccionada={fecha}
                onSeleccionarFecha={handleSeleccionarFecha}
              />
            </div>

            <div>
              <h2>Elige la hora</h2>
              {!fecha && <p className="agendar__hint">Selecciona primero un día en el calendario.</p>}
              {fecha && cargando && <p className="agendar__hint">Buscando horarios disponibles…</p>}
              {fecha && !cargando && errorDisponibilidad && (
                <p className="agendar__hint agendar__hint--error">{errorDisponibilidad}</p>
              )}
              {fecha && !cargando && !errorDisponibilidad && horarios.length === 0 && (
                <p className="agendar__hint">No quedan horarios libres ese día. Prueba otra fecha.</p>
              )}
              {fecha && !cargando && horarios.length > 0 && (
                <div className="agendar__horarios">
                  {horarios.map((h) => (
                    <button
                      key={h}
                      className={'agendar__horario' + (hora === h ? ' is-selected' : '')}
                      onClick={() => setHora(h)}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="agendar__acciones">
            <button className="btn-cta" disabled={!fecha || !hora} onClick={() => setPaso(2)}>
              Continuar
            </button>
          </div>
        </section>
      )}

      {/* PASO 2 — DATOS DEL PACIENTE */}
      {paso === 2 && !citaConfirmada && (
        <section className="agendar__paso">
          <h2>Tus datos</h2>
          <form className="agendar__form" onSubmit={(e) => { e.preventDefault(); setPaso(3); }}>
            <label>
              Nombre completo
              <input
                type="text"
                value={datos.nombre_paciente}
                onChange={(e) => handleCampoDatos('nombre_paciente', e.target.value)}
                required
              />
            </label>

            <label>
              Teléfono / WhatsApp
              <input
                type="tel"
                value={datos.telefono}
                onChange={(e) => handleCampoDatos('telefono', e.target.value)}
                required
              />
            </label>

            <label>
              Email <span className="agendar__opcional">(opcional)</span>
              <input
                type="email"
                value={datos.email}
                onChange={(e) => handleCampoDatos('email', e.target.value)}
              />
            </label>

            <label>
              Tipo de consulta
              <select
                value={datos.tipo_consulta}
                onChange={(e) => handleCampoDatos('tipo_consulta', e.target.value)}
                required
              >
                <option value="" disabled>Selecciona una opción</option>
                {TIPOS_CONSULTA.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </label>

            <fieldset className="agendar__fieldset">
              <legend>¿Es tu primera consulta con el Dr. Vargas?</legend>
              <label className="agendar__radio">
                <input
                  type="radio"
                  name="primera_vez"
                  checked={datos.primera_vez === true}
                  onChange={() => handleCampoDatos('primera_vez', true)}
                />
                Sí, primera vez
              </label>
              <label className="agendar__radio">
                <input
                  type="radio"
                  name="primera_vez"
                  checked={datos.primera_vez === false}
                  onChange={() => handleCampoDatos('primera_vez', false)}
                />
                No, ya soy paciente
              </label>
            </fieldset>

            <div className="agendar__acciones">
              <button type="button" className="btn-secundario" onClick={() => setPaso(1)}>Atrás</button>
              <button type="submit" className="btn-cta" disabled={!datosValidos()}>Revisar cita</button>
            </div>
          </form>
        </section>
      )}

      {/* PASO 3 — CONFIRMACIÓN */}
      {paso === 3 && !citaConfirmada && (
        <section className="agendar__paso">
          <h2>Confirma tu cita</h2>
          <div className="agendar__resumen">
            <div className="agendar__resumen-fila"><span>Fecha</span><strong>{fecha}</strong></div>
            <div className="agendar__resumen-fila"><span>Hora</span><strong>{hora}</strong></div>
            <div className="agendar__resumen-fila"><span>Paciente</span><strong>{datos.nombre_paciente}</strong></div>
            <div className="agendar__resumen-fila"><span>Teléfono</span><strong>{datos.telefono}</strong></div>
            <div className="agendar__resumen-fila">
              <span>Tipo de consulta</span>
              <strong>{TIPOS_CONSULTA.find((t) => t.value === datos.tipo_consulta)?.label}</strong>
            </div>
          </div>

          {errorEnvio && <p className="agendar__hint agendar__hint--error">{errorEnvio}</p>}

          <div className="agendar__acciones">
            <button type="button" className="btn-secundario" onClick={() => setPaso(2)}>Atrás</button>
            <button className="btn-cta" onClick={confirmarCita} disabled={enviando}>
              {enviando ? 'Confirmando…' : 'Confirmar cita'}
            </button>
          </div>
        </section>
      )}

      {/* CONFIRMACIÓN FINAL */}
      {citaConfirmada && (
        <section className="agendar__paso agendar__exito">
          <div className="agendar__exito-icono">✓</div>
          <h2>Cita confirmada</h2>
          <p>
            Te esperamos el <strong>{citaConfirmada.fecha}</strong> a las <strong>{citaConfirmada.hora}</strong> en
            el consultorio del Dr. Rolando Vargas Calvetty. Te enviaremos la confirmación por WhatsApp
            {citaConfirmada.email ? ' y correo electrónico.' : '.'}
          </p>
          <p className="agendar__direccion">
            Parque Fidel Anze #200, Esq. Av. Pando, Edif. VyV NUR, Primer piso, Cochabamba
          </p>
        </section>
      )}
    </main>
  );
}
