import { useState } from 'react';
import StepIndicator from '../components/StepIndicator.jsx';
import CalendarioDisponibilidad from '../components/CalendarioDisponibilidad.jsx';
import Seo from '../components/Seo.jsx';
import { SEO } from '../lib/seo.js';
import { useDisponibilidad } from '../hooks/useDisponibilidad.js';

const TIPOS_CONSULTA = [
  { value: 'ginecologia', label: 'Ginecología general' },
  { value: 'control_prenatal', label: 'Control prenatal' },
  { value: 'oncologia_mastologia', label: 'Oncología / Mastología' },
  { value: 'segunda_opinion', label: 'Segunda opinión' },
  { value: 'otro', label: 'Otro' },
];

const inputClass =
  'rounded border border-line bg-bg px-3.5 py-3 font-sans text-[15px] text-paper focus:outline focus:outline-2 focus:outline-teal';

// Acepta '2026-09-17' o '2026-09-17T00:00:00.000Z' (formato real que
// puede devolver Neon para columnas DATE) -> 'miércoles 17 de septiembre de 2026'
function formatearFecha(valor) {
  if (!valor) return '';
  const soloFecha = String(valor).slice(0, 10);
  const [y, m, d] = soloFecha.split('-').map(Number);
  if (!y || !m || !d) return String(valor);
  const fecha = new Date(y, m - 1, d);
  const texto = fecha.toLocaleDateString('es-BO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return texto.replace(',', '');
}

// '14:30' -> '2:30 p. m.'
function formatearHora(hora) {
  if (!hora) return '';
  const [h, min] = hora.split(':').map(Number);
  const fecha = new Date(2000, 0, 1, h, min);
  return fecha.toLocaleTimeString('es-BO', { hour: 'numeric', minute: '2-digit' });
}

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
      setErrorEnvio('Hubo un problema de conexión. Verifica tu internet e intenta de nuevo.');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className="mx-auto max-w-[900px] px-6 pb-20 pt-12 md:px-0">
      <Seo title={SEO.agendarCita.title} description={SEO.agendarCita.description} />
      <header className="mb-10 text-left">
        <h1 className="font-serif text-[34px] font-normal">Agendar cita</h1>
        <p className="mt-2 max-w-[480px] text-[15px] text-muted">
          Reserva tu consulta con el Dr. Rolando Vargas Calvetty en tres pasos simples.
        </p>
      </header>

      <StepIndicator pasoActual={citaConfirmada ? 4 : paso} />

      {/* PASO 1: FECHA Y HORA */}
      {paso === 1 && !citaConfirmada && (
        <section className="animate-slide-in-right">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 font-serif text-xl font-normal">Elige el día</h2>
              <CalendarioDisponibilidad
                fechaSeleccionada={fecha}
                onSeleccionarFecha={handleSeleccionarFecha}
              />
            </div>

            <div>
              <h2 className="mb-4 font-serif text-xl font-normal">Elige la hora</h2>
              {!fecha && (
                <p className="py-3 text-sm text-muted">
                  Selecciona primero un día en el calendario.
                </p>
              )}
              {fecha && cargando && (
                <p className="py-3 text-sm text-muted">Buscando horarios disponibles…</p>
              )}
              {fecha && !cargando && errorDisponibilidad && (
                <div className="flex items-start gap-3 rounded border border-red-400/30 bg-red-400/5 px-4 py-3">
                  <span className="mt-0.5 text-red-300">⚠</span>
                  <p className="text-sm text-red-300">{errorDisponibilidad}</p>
                </div>
              )}
              {fecha && !cargando && !errorDisponibilidad && horarios.length === 0 && (
                <p className="py-3 text-sm text-muted">
                  No quedan horarios libres ese día. Prueba otra fecha.
                </p>
              )}
              {fecha && !cargando && horarios.length > 0 && (
                <div className="grid grid-cols-3 gap-2.5">
                  {horarios.map((h) => (
                    <button
                      key={h}
                      className={
                        'rounded border py-2.5 text-sm transition-colors ' +
                        (hora === h
                          ? 'border-copper bg-copper font-semibold text-[#23140A]'
                          : 'border-line bg-bg-alt text-paper hover:border-teal')
                      }
                      onClick={() => setHora(h)}
                    >
                      {formatearHora(h)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-7 flex gap-3">
            <button
              className="rounded bg-copper px-8 py-3.5 font-medium text-[#23140A] transition-colors hover:bg-copper-hover disabled:cursor-not-allowed disabled:opacity-40"
              disabled={!fecha || !hora}
              onClick={() => setPaso(2)}
            >
              Elegir mis datos
            </button>
          </div>
        </section>
      )}

      {/* PASO 2: DATOS DEL PACIENTE */}
      {paso === 2 && !citaConfirmada && (
        <section className="animate-slide-in-right">
          <h2 className="mb-4 font-serif text-xl font-normal">Tus datos</h2>
          <form
            className="flex max-w-[480px] flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              setPaso(3);
            }}
          >
            <label className="flex flex-col gap-1.5 text-sm text-muted">
              Nombre completo
              <input
                type="text"
                className={inputClass}
                value={datos.nombre_paciente}
                onChange={(e) => handleCampoDatos('nombre_paciente', e.target.value)}
                required
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm text-muted">
              Teléfono / WhatsApp
              <input
                type="tel"
                className={inputClass}
                value={datos.telefono}
                onChange={(e) => handleCampoDatos('telefono', e.target.value)}
                required
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm text-muted">
              Email <span className="font-normal opacity-70">(opcional)</span>
              <input
                type="email"
                className={inputClass}
                value={datos.email}
                onChange={(e) => handleCampoDatos('email', e.target.value)}
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm text-muted">
              Tipo de consulta
              <select
                className={inputClass}
                value={datos.tipo_consulta}
                onChange={(e) => handleCampoDatos('tipo_consulta', e.target.value)}
                required
              >
                <option value="" disabled>
                  Selecciona una opción
                </option>
                {TIPOS_CONSULTA.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </label>

            <fieldset className="flex flex-col gap-2 border-0 p-0">
              <legend className="mb-1.5 p-0 text-sm text-muted">
                ¿Es tu primera consulta con el Dr. Vargas?
              </legend>
              <label className="flex flex-row items-center gap-2 text-[15px] text-paper">
                <input
                  type="radio"
                  name="primera_vez"
                  checked={datos.primera_vez === true}
                  onChange={() => handleCampoDatos('primera_vez', true)}
                  className="accent-copper"
                />
                Sí, primera vez
              </label>
              <label className="flex flex-row items-center gap-2 text-[15px] text-paper">
                <input
                  type="radio"
                  name="primera_vez"
                  checked={datos.primera_vez === false}
                  onChange={() => handleCampoDatos('primera_vez', false)}
                  className="accent-copper"
                />
                No, ya soy paciente
              </label>
            </fieldset>

            <div className="mt-2 flex gap-3">
              <button
                type="button"
                className="rounded border border-line px-6 py-3.5 font-medium text-muted transition-colors hover:border-teal"
                onClick={() => setPaso(1)}
              >
                Cambiar fecha
              </button>
              <button
                type="submit"
                className="rounded bg-copper px-8 py-3.5 font-medium text-[#23140A] transition-colors hover:bg-copper-hover disabled:cursor-not-allowed disabled:opacity-40"
                disabled={!datosValidos()}
              >
                Revisar mi cita
              </button>
            </div>
          </form>
        </section>
      )}

      {/* PASO 3: CONFIRMACIÓN */}
      {paso === 3 && !citaConfirmada && (
        <section className="animate-slide-in-right">
          <h2 className="mb-4 font-serif text-xl font-normal">Confirma tu cita</h2>
          <div className="flex max-w-[480px] flex-col gap-3.5 rounded bg-bg-alt p-6">
            <div className="flex justify-between gap-4 border-b border-line pb-3.5 text-[15px]">
              <span className="text-muted">Fecha</span>
              <strong className="text-right font-medium capitalize">{formatearFecha(fecha)}</strong>
            </div>
            <div className="flex justify-between border-b border-line pb-3.5 text-[15px]">
              <span className="text-muted">Hora</span>
              <strong className="font-medium">{formatearHora(hora)}</strong>
            </div>
            <div className="flex justify-between border-b border-line pb-3.5 text-[15px]">
              <span className="text-muted">Paciente</span>
              <strong className="font-medium">{datos.nombre_paciente}</strong>
            </div>
            <div className="flex justify-between border-b border-line pb-3.5 text-[15px]">
              <span className="text-muted">Teléfono</span>
              <strong className="font-medium">{datos.telefono}</strong>
            </div>
            <div className="flex justify-between text-[15px]">
              <span className="text-muted">Tipo de consulta</span>
              <strong className="font-medium">
                {TIPOS_CONSULTA.find((t) => t.value === datos.tipo_consulta)?.label}
              </strong>
            </div>
          </div>

          {errorEnvio && (
            <div className="mt-4 flex items-start gap-3 rounded border border-red-400/30 bg-red-400/5 px-4 py-3.5">
              <span className="mt-0.5 text-lg text-red-300">⚠</span>
              <div>
                <p className="text-sm font-medium text-red-300">No se pudo agendar la cita</p>
                <p className="mt-0.5 text-sm text-red-300/80">{errorEnvio}</p>
              </div>
            </div>
          )}

          <div className="mt-7 flex gap-3">
            <button
              type="button"
              className="rounded border border-line px-6 py-3.5 font-medium text-muted transition-colors hover:border-teal"
              onClick={() => setPaso(2)}
            >
              Editar datos
            </button>
            <button
              className="rounded bg-copper px-8 py-3.5 font-medium text-[#23140A] transition-colors hover:bg-copper-hover disabled:cursor-not-allowed disabled:opacity-40"
              onClick={confirmarCita}
              disabled={enviando}
            >
              {enviando ? 'Confirmando…' : errorEnvio ? 'Intentar de nuevo' : 'Confirmar cita'}
            </button>
          </div>
        </section>
      )}

      {/* CONFIRMACIÓN FINAL */}
      {citaConfirmada && (
        <section className="animate-fade-in py-10 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 animate-[page-in_0.6s_cubic-bezier(0.34,1.56,0.64,1)_both] items-center justify-center rounded-full bg-copper text-2xl text-[#23140A]">
            ✓
          </div>
          <h2 className="font-serif text-xl font-normal">Cita confirmada</h2>
          <p className="mx-auto mt-2 max-w-[460px] text-[15px] text-muted">
            Te esperamos el{' '}
            <strong className="capitalize text-paper">{formatearFecha(citaConfirmada.fecha)}</strong>{' '}
            a las <strong className="text-paper">{formatearHora(citaConfirmada.hora)}</strong> en el
            consultorio del Dr. Rolando Vargas Calvetty. Te enviaremos la confirmación por WhatsApp
            {citaConfirmada.email ? ' y correo electrónico.' : '.'}
          </p>
          <p className="mx-auto mt-4 max-w-[460px] text-[13px] text-muted">
            Parque Fidel Anze #200, Esq. Av. Pando, Edif. VyV NUR, Primer piso, Cochabamba
          </p>
        </section>
      )}
    </main>
  );
}
