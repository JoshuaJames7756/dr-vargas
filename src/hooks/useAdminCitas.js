import { useState, useEffect, useCallback } from 'react';

export function useAdminCitas(filtroEstado) {
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const recargar = useCallback(() => {
    setCargando(true);
    const query = filtroEstado ? `?estado=${filtroEstado}` : '';
    fetch(`/api/admin-citas${query}`)
      .then((r) => r.json())
      .then((data) => setCitas(data.citas || []))
      .catch(() => setError('No pudimos cargar las citas.'))
      .finally(() => setCargando(false));
  }, [filtroEstado]);

  useEffect(() => { recargar(); }, [recargar]);

  async function actualizarEstado(id, estado) {
    const res = await fetch('/api/admin-citas', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, estado }),
    });
    if (res.ok) recargar();
    return res.ok;
  }

  return { citas, cargando, error, actualizarEstado, recargar };
}
