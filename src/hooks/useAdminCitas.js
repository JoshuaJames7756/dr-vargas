import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';

export function useAdminCitas(filtroEstado) {
  const { getToken } = useAuth();
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const recargar = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const token = await getToken();
      const query = filtroEstado ? `?estado=${filtroEstado}` : '';
      const res = await fetch(`/api/admin-citas${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'No pudimos cargar las citas.');
      }
      const data = await res.json();
      setCitas(data.citas || []);
    } catch (err) {
      setError(err.message || 'No pudimos cargar las citas.');
    } finally {
      setCargando(false);
    }
  }, [filtroEstado, getToken]);

  useEffect(() => {
    recargar();
  }, [recargar]);

  // Cambia solo el estado de una cita (pendiente/confirmada/cancelada/completada)
  async function actualizarEstado(id, estado) {
    const token = await getToken();
    const res = await fetch('/api/admin-citas', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id, estado }),
    });
    if (res.ok) recargar();
    return res.ok;
  }

  // Reagenda una cita: cambia fecha y/o hora. Devuelve { ok, error } para
  // poder mostrar el mensaje real (ej. "ese horario ya está ocupado").
  async function reagendar(id, { fecha, hora }) {
    const token = await getToken();
    const res = await fetch('/api/admin-citas', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id, fecha, hora }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) recargar();
    return { ok: res.ok, error: data.error };
  }

  return { citas, cargando, error, actualizarEstado, reagendar, recargar };
}
