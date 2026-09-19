import { sql } from '../src/lib/db.js';
import { requireAuth } from '../src/lib/auth.js';

export default async function handler(req, res) {
  const auth = await requireAuth(req, res);
  if (!auth) return;

  if (req.method === 'GET') {
    const { estado, desde } = req.query;

    let citas;
    if (estado) {
      citas = await sql`
        SELECT * FROM citas
        WHERE estado = ${estado} AND fecha >= ${desde || '2000-01-01'}
        ORDER BY fecha ASC, hora ASC
      `;
    } else {
      citas = await sql`
        SELECT * FROM citas
        WHERE fecha >= ${desde || '2000-01-01'}
        ORDER BY fecha ASC, hora ASC
      `;
    }
    return res.status(200).json({ citas });
  }

  if (req.method === 'PATCH') {
    const { id, estado, fecha, hora, nota } = req.body;
    if (!id) return res.status(400).json({ error: 'Falta id' });

    // Reagendar: cambiar fecha y/o hora de una cita existente
    if (fecha || hora) {
      if (fecha && !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
        return res.status(400).json({ error: 'Fecha no válida' });
      }
      if (hora && !/^\d{2}:\d{2}$/.test(hora)) {
        return res.status(400).json({ error: 'Hora no válida' });
      }
      try {
        const [citaActual] = await sql`SELECT fecha, hora FROM citas WHERE id = ${id}`;
        if (!citaActual) return res.status(404).json({ error: 'Cita no encontrada' });

        const [cita] = await sql`
          UPDATE citas
          SET fecha = ${fecha || citaActual.fecha}, hora = ${hora || citaActual.hora}
          WHERE id = ${id}
          RETURNING *
        `;
        return res.status(200).json({ success: true, cita });
      } catch (err) {
        if (err.message.includes('unique_horario')) {
          return res.status(409).json({ error: 'Ese horario ya está ocupado por otra cita.' });
        }
        return res.status(500).json({ error: 'Error al reagendar la cita' });
      }
    }

    // Cambiar solo el estado (comportamiento original, sin cambios)
    if (estado) {
      const validEstados = ['pendiente', 'confirmada', 'cancelada', 'completada'];
      if (!validEstados.includes(estado)) return res.status(400).json({ error: 'Estado inválido' });

      const [cita] = await sql`
        UPDATE citas SET estado = ${estado} WHERE id = ${id} RETURNING *
      `;
      if (!cita) return res.status(404).json({ error: 'Cita no encontrada' });

      return res.status(200).json({ success: true, cita });
    }

    return res.status(400).json({ error: 'Nada que actualizar: falta estado, fecha u hora' });
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
