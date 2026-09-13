import { useState, useEffect } from 'react';

// Nota: el calendario deshabilita solo fechas pasadas por ahora.
// Cuando el Dr. confirme el horario fijo del consultorio, se puede
// añadir un endpoint GET /api/bloqueos?mes=YYYY-MM para pre-cargar
// los días completos no disponibles y deshabilitarlos en el calendario
// sin tener que consultar día por día.

export function useDisponibilidad(fecha) {
  const [horarios, setHorarios] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!fecha) { setHorarios([]); return; }

    setCargando(true);
    setError(null);

    fetch(`/api/citas?fecha=${fecha}`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.disponible) {
          setHorarios([]);
          setError(data.motivo || 'No hay horarios disponibles este día');
        } else {
          setHorarios(data.horarios || []);
        }
      })
      .catch(() => setError('No pudimos cargar la disponibilidad. Intenta de nuevo.'))
      .finally(() => setCargando(false));
  }, [fecha]);

  return { horarios, cargando, error };
}
