import { useState } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { useAdminCitas } from '../hooks/useAdminCitas.js';

const ESTADOS = ['pendiente', 'confirmada', 'cancelada', 'completada'];

const TIPO_LABEL = {
  ginecologia: 'Ginecología',
  oncologia_mastologia: 'Oncología / Mastología',
  control_prenatal: 'Control prenatal',
  segunda_opinion: 'Segunda opinión',
  otro: 'Otro',
};

function FilaCita({ cita, onActualizar }) {
  return (
    <tr className={cita.estado === 'cancelada' ? 'opacity-50' : ''}>
      <td className="border-b border-line px-3 py-3">{cita.fecha}</td>
      <td className="border-b border-line px-3 py-3">{cita.hora}</td>
      <td className="border-b border-line px-3 py-3">{cita.nombre_paciente}</td>
      <td className="border-b border-line px-3 py-3">{cita.telefono}</td>
      <td className="border-b border-line px-3 py-3">
        {TIPO_LABEL[cita.tipo_consulta] || cita.tipo_consulta}
      </td>
      <td className="border-b border-line px-3 py-3">{cita.primera_vez ? 'Sí' : 'No'}</td>
      <td className="border-b border-line px-3 py-3">
        <select
          value={cita.estado}
          onChange={(e) => onActualizar(cita.id, e.target.value)}
          className={
            'rounded border bg-bg px-2.5 py-1.5 font-sans text-[13px] text-paper ' +
            (cita.estado === 'confirmada'
              ? 'border-teal text-teal-light'
              : cita.estado === 'cancelada'
                ? 'border-line opacity-70'
                : 'border-line')
          }
        >
          {ESTADOS.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </td>
    </tr>
  );
}

function PanelAdmin() {
  const [filtro, setFiltro] = useState('');
  const { citas, cargando, error, actualizarEstado } = useAdminCitas(filtro || null);

  return (
    <div className="mx-auto max-w-[1100px] px-6 pb-20 pt-10">
      <header className="mb-7 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-normal">Panel de citas</h1>
          <p className="text-sm text-muted">Dr. Rolando Vargas Calvetty</p>
        </div>
        <UserButton />
      </header>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          className={
            'rounded px-4 py-2 text-[13.5px] transition-colors ' +
            (filtro === '' ? 'bg-teal-dark text-paper' : 'bg-bg-alt text-muted hover:text-paper')
          }
          onClick={() => setFiltro('')}
        >
          Todas
        </button>
        {ESTADOS.map((e) => (
          <button
            key={e}
            className={
              'rounded px-4 py-2 text-[13.5px] transition-colors ' +
              (filtro === e ? 'bg-teal-dark text-paper' : 'bg-bg-alt text-muted hover:text-paper')
            }
            onClick={() => setFiltro(e)}
          >
            {e.charAt(0).toUpperCase() + e.slice(1)}
          </button>
        ))}
      </div>

      {cargando && <p className="py-6 text-muted">Cargando citas…</p>}
      {error && <p className="py-6 text-red-400">{error}</p>}

      {!cargando && !error && citas.length === 0 && (
        <p className="py-6 text-muted">No hay citas registradas con este filtro.</p>
      )}

      {!cargando && citas.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap text-sm">
            <thead>
              <tr>
                {['Fecha', 'Hora', 'Paciente', 'Teléfono', 'Tipo', '1ª vez', 'Estado'].map((h) => (
                  <th
                    key={h}
                    className="border-b border-line px-3 py-3 text-left text-[12px] font-medium text-muted"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {citas.map((c) => (
                <FilaCita key={c.id} cita={c} onActualizar={actualizarEstado} />
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
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg-alt px-6 text-center">
          <h1 className="font-serif text-2xl font-normal">Panel administrativo</h1>
          <p className="mb-2 text-muted">Inicia sesión para gestionar las citas del consultorio.</p>
          <SignInButton mode="modal">
            <button className="rounded bg-copper px-8 py-3.5 font-medium text-[#23140A] transition-colors hover:bg-copper-hover">
              Iniciar sesión
            </button>
          </SignInButton>
        </div>
      </SignedOut>

      <SignedIn>
        <PanelAdmin />
      </SignedIn>
    </>
  );
}
