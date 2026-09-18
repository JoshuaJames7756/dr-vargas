import { useMemo, useState } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import { useAdminCitas } from '../hooks/useAdminCitas.js';
import { SEO } from '../lib/seo.js';
import Seo from '../components/Seo.jsx';

const ESTADOS = ['pendiente', 'confirmada', 'cancelada', 'completada'];

const TIPO_LABEL = {
  ginecologia: 'Ginecología',
  oncologia_mastologia: 'Oncología / Mastología',
  control_prenatal: 'Control prenatal',
  segunda_opinion: 'Segunda opinión',
  otro: 'Otro',
};

const ESTADO_DOT = {
  pendiente: 'bg-copper',
  confirmada: 'bg-teal',
  cancelada: 'bg-muted',
  completada: 'bg-teal-light',
};

function saludo() {
  const hora = new Date().getHours();
  if (hora < 12) return 'Buenos días';
  if (hora < 19) return 'Buenas tardes';
  return 'Buenas noches';
}

// '2026-09-17' -> '17 sep 2026'
function formatearFecha(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  const fecha = new Date(y, m - 1, d);
  return fecha.toLocaleDateString('es-BO', { day: 'numeric', month: 'short', year: 'numeric' });
}

// '14:30' -> '2:30 p. m.'
function formatearHora(hora) {
  if (!hora) return '';
  const [h, min] = hora.split(':').map(Number);
  const fecha = new Date(2000, 0, 1, h, min);
  return fecha.toLocaleTimeString('es-BO', { hour: 'numeric', minute: '2-digit' });
}

function KpiCard({ label, value, accent, delay = 0 }) {
  return (
    <div
      className="reveal visible rounded border border-line bg-bg-alt p-5 transition-transform duration-300 hover:-translate-y-1"
      style={{ animationDelay: `${delay}s` }}
    >
      <span className="text-[12px] text-muted">{label}</span>
      <div className="mt-2 flex items-baseline gap-2">
        <span className={`font-serif text-[30px] ${accent || 'text-paper'}`}>{value}</span>
      </div>
    </div>
  );
}

function FilaCita({ cita, onActualizar, i }) {
  // 'idle' | 'guardando' | 'guardado' | 'error'
  const [estadoGuardado, setEstadoGuardado] = useState('idle');

  async function handleCambio(e) {
    const nuevoEstado = e.target.value;
    setEstadoGuardado('guardando');
    const ok = await onActualizar(cita.id, nuevoEstado);
    setEstadoGuardado(ok ? 'guardado' : 'error');
    setTimeout(() => setEstadoGuardado('idle'), 2000);
  }

  return (
    <tr
      className={
        'animate-fade-in transition-colors hover:bg-bg-alt/60 ' +
        (cita.estado === 'cancelada' ? 'opacity-50' : '')
      }
      style={{ animationDelay: `${Math.min(i * 0.04, 0.4)}s` }}
    >
      <td className="whitespace-nowrap border-b border-line px-3 py-3">{formatearFecha(cita.fecha)}</td>
      <td className="whitespace-nowrap border-b border-line px-3 py-3">{formatearHora(cita.hora)}</td>
      <td className="border-b border-line px-3 py-3 font-medium text-paper">
        {cita.nombre_paciente}
      </td>
      <td className="border-b border-line px-3 py-3">{cita.telefono}</td>
      <td className="border-b border-line px-3 py-3">
        {TIPO_LABEL[cita.tipo_consulta] || cita.tipo_consulta}
      </td>
      <td className="border-b border-line px-3 py-3">{cita.primera_vez ? 'Sí' : 'No'}</td>
      <td className="border-b border-line px-3 py-3">
        <div className="flex items-center gap-2">
          <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${ESTADO_DOT[cita.estado]}`} />
          <select
            value={cita.estado}
            onChange={handleCambio}
            disabled={estadoGuardado === 'guardando'}
            className={
              'rounded border bg-bg px-2.5 py-1.5 font-sans text-[13px] text-paper transition-colors disabled:opacity-60 ' +
              (cita.estado === 'confirmada'
                ? 'border-teal text-teal-light'
                : cita.estado === 'cancelada'
                  ? 'border-line opacity-70'
                  : 'border-line hover:border-teal-light')
            }
          >
            {ESTADOS.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>

          {/* Feedback de guardado, ancho fijo para no mover el layout */}
          <span className="w-16 flex-shrink-0 text-[11px]">
            {estadoGuardado === 'guardando' && (
              <span className="flex items-center gap-1 text-muted">
                <span className="h-2.5 w-2.5 animate-spin rounded-full border-2 border-line border-t-teal-light" />
                guardando
              </span>
            )}
            {estadoGuardado === 'guardado' && (
              <span className="animate-fade-in text-teal-light">✓ guardado</span>
            )}
            {estadoGuardado === 'error' && (
              <span className="animate-fade-in text-red-300">✗ no se guardó</span>
            )}
          </span>
        </div>
      </td>
    </tr>
  );
}

function PanelAdmin() {
  const { user } = useUser();
  const [filtro, setFiltro] = useState('');

  // Lista completa (sin filtro) para calcular los KPIs, en paralelo a la vista filtrada.
  const { citas: todasLasCitas } = useAdminCitas(null);
  const { citas, cargando, error, actualizarEstado } = useAdminCitas(filtro || null);

  const kpis = useMemo(() => {
    const hoyISO = new Date().toISOString().slice(0, 10);
    return {
      total: todasLasCitas.length,
      hoy: todasLasCitas.filter((c) => c.fecha === hoyISO).length,
      pendientes: todasLasCitas.filter((c) => c.estado === 'pendiente').length,
      confirmadas: todasLasCitas.filter((c) => c.estado === 'confirmada').length,
    };
  }, [todasLasCitas]);

  const primerNombre = user?.firstName || 'Doctor';

  return (
    <div className="mx-auto max-w-[1100px] animate-page-in px-6 pb-20 pt-10">
      <Seo title="Panel administrativo, Dr. Rolando Vargas Calvetty" description="" />

      {/* HEADER CON SALUDO */}
      <header className="mb-9 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[13px] text-teal-light">{saludo()}, {primerNombre}</p>
          <h1 className="mt-1 font-serif text-[28px] font-normal">Panel de citas</h1>
          <p className="mt-1 text-sm text-muted">
            Consultorio del Dr. Rolando Vargas Calvetty
          </p>
        </div>
        <UserButton />
      </header>

      {/* KPIs */}
      <div className="mb-9 grid grid-cols-2 gap-3.5 sm:grid-cols-4">
        <KpiCard label="Total de citas" value={kpis.total} delay={0} />
        <KpiCard label="Hoy" value={kpis.hoy} accent="text-copper" delay={0.05} />
        <KpiCard label="Pendientes" value={kpis.pendientes} accent="text-copper" delay={0.1} />
        <KpiCard label="Confirmadas" value={kpis.confirmadas} accent="text-teal-light" delay={0.15} />
      </div>

      {/* FILTROS */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          className={
            'rounded px-4 py-2 text-[13.5px] transition-all duration-200 ' +
            (filtro === ''
              ? 'bg-teal-dark text-paper shadow-sm shadow-teal-dark/30'
              : 'bg-bg-alt text-muted hover:text-paper')
          }
          onClick={() => setFiltro('')}
        >
          Todas
        </button>
        {ESTADOS.map((e) => (
          <button
            key={e}
            className={
              'flex items-center gap-1.5 rounded px-4 py-2 text-[13.5px] transition-all duration-200 ' +
              (filtro === e
                ? 'bg-teal-dark text-paper shadow-sm shadow-teal-dark/30'
                : 'bg-bg-alt text-muted hover:text-paper')
            }
            onClick={() => setFiltro(e)}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${ESTADO_DOT[e]}`} />
            {e.charAt(0).toUpperCase() + e.slice(1)}
          </button>
        ))}
      </div>

      {/* ESTADOS */}
      {cargando && (
        <div className="flex items-center gap-3 py-10 text-muted">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-line border-t-teal-light" />
          Cargando citas…
        </div>
      )}

      {error && (
        <div className="animate-fade-in rounded border border-red-400/30 bg-red-400/5 px-5 py-4 text-red-300">
          {error}
        </div>
      )}

      {!cargando && !error && citas.length === 0 && (
        <div className="animate-fade-in rounded border border-dashed border-line px-6 py-14 text-center">
          <p className="text-muted">No hay citas registradas con este filtro.</p>
        </div>
      )}

      {!cargando && citas.length > 0 && (
        <div className="overflow-x-auto rounded border border-line">
          <table className="w-full whitespace-nowrap text-sm">
            <thead>
              <tr>
                {['Fecha', 'Hora', 'Paciente', 'Teléfono', 'Tipo', '1ª vez', 'Estado'].map((h) => (
                  <th
                    key={h}
                    className="border-b border-line bg-bg-alt px-3 py-3 text-left text-[12px] font-medium text-muted"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {citas.map((c, i) => (
                <FilaCita key={c.id} cita={c} onActualizar={actualizarEstado} i={i} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function Admin() {
  return (
    <>
      <SignedOut>
        <div className="relative flex min-h-screen flex-col items-center justify-center gap-4 overflow-hidden bg-bg-alt px-6 text-center">
          <div className="pointer-events-none absolute -right-40 -top-32 h-[560px] w-[560px] animate-drift rounded-full bg-[radial-gradient(circle,rgba(55,166,147,0.16)_0%,transparent_70%)]" />
          <div className="relative animate-fade-in">
            <h1 className="font-serif text-2xl font-normal">Panel de citas</h1>
            <p className="mb-6 mt-2 max-w-[36ch] text-muted">
              Inicia sesión para gestionar las citas del consultorio del Dr. Rolando Vargas Calvetty.
            </p>
            <SignInButton mode="modal">
              <button className="rounded bg-copper px-8 py-3.5 font-medium text-[#23140A] transition-all duration-300 hover:-translate-y-0.5 hover:bg-copper-hover hover:shadow-lg hover:shadow-copper/20">
                Iniciar sesión
              </button>
            </SignInButton>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <PanelAdmin />
      </SignedIn>
    </>
  );
}
