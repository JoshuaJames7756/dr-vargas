import { useState } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { useAdminCitas } from '../hooks/useAdminCitas.js';
import '../assets/css/admin.css';

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
    <tr className={`admin__fila admin__fila--${cita.estado}`}>
      <td>{cita.fecha}</td>
      <td>{cita.hora}</td>
      <td>{cita.nombre_paciente}</td>
      <td>{cita.telefono}</td>
      <td>{TIPO_LABEL[cita.tipo_consulta] || cita.tipo_consulta}</td>
      <td>{cita.primera_vez ? 'Sí' : 'No'}</td>
      <td>
        <select
          value={cita.estado}
          onChange={(e) => onActualizar(cita.id, e.target.value)}
          className={`admin__select admin__select--${cita.estado}`}
        >
          {ESTADOS.map((e) => <option key={e} value={e}>{e}</option>)}
        </select>
      </td>
    </tr>
  );
}

function PanelAdmin() {
  const [filtro, setFiltro] = useState('');
  const { citas, cargando, error, actualizarEstado } = useAdminCitas(filtro || null);

  return (
    <div className="admin">
      <header className="admin__header">
        <div>
          <h1>Panel de citas</h1>
          <p>Dr. Rolando Vargas Calvetty</p>
        </div>
        <UserButton />
      </header>

      <div className="admin__filtros">
        <button className={filtro === '' ? 'is-active' : ''} onClick={() => setFiltro('')}>Todas</button>
        {ESTADOS.map((e) => (
          <button key={e} className={filtro === e ? 'is-active' : ''} onClick={() => setFiltro(e)}>
            {e.charAt(0).toUpperCase() + e.slice(1)}
          </button>
        ))}
      </div>

      {cargando && <p className="admin__hint">Cargando citas…</p>}
      {error && <p className="admin__hint admin__hint--error">{error}</p>}

      {!cargando && !error && citas.length === 0 && (
        <p className="admin__hint">No hay citas registradas con este filtro.</p>
      )}

      {!cargando && citas.length > 0 && (
        <table className="admin__tabla">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Paciente</th>
              <th>Teléfono</th>
              <th>Tipo</th>
              <th>1ª vez</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {citas.map((c) => (
              <FilaCita key={c.id} cita={c} onActualizar={actualizarEstado} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default function Admin() {
  return (
    <>
      <SignedOut>
        <div className="admin__login">
          <h1>Panel administrativo</h1>
          <p>Inicia sesión para gestionar las citas del consultorio.</p>
          <SignInButton mode="modal">
            <button className="btn-cta">Iniciar sesión</button>
          </SignInButton>
        </div>
      </SignedOut>

      <SignedIn>
        <PanelAdmin />
      </SignedIn>
    </>
  );
}
