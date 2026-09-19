import { sql } from '../src/lib/db.js';
import { requireAuth } from '../src/lib/auth.js';

export default async function handler(req, res) {
  const auth = await requireAuth(req, res);
  if (!auth) return;

  if (req.method === 'POST') {
    const { cita_id, contenido } = req.body;

    if (!cita_id || !contenido || contenido.trim().length < 3) {
      return res.status(400).json({ error: 'Faltan datos: cita_id y contenido son requeridos' });
    }
    if (contenido.length > 5000) {
      return res.status(400).json({ error: 'La nota es demasiado larga (máximo 5000 caracteres)' });
    }

    const [cita] = await sql`SELECT paciente_id FROM citas WHERE id = ${cita_id}`;
    if (!cita) return res.status(404).json({ error: 'Cita no encontrada' });
    if (!cita.paciente_id) {
      return res.status(400).json({ error: 'Esta cita no tiene un paciente vinculado' });
    }

    const [nota] = await sql`
      INSERT INTO notas_clinicas (cita_id, paciente_id, contenido)
      VALUES (${cita_id}, ${cita.paciente_id}, ${contenido.trim()})
      RETURNING *
    `;

    return res.status(201).json({ success: true, nota });
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: 'Falta id' });

    const [nota] = await sql`DELETE FROM notas_clinicas WHERE id = ${id} RETURNING id`;
    if (!nota) return res.status(404).json({ error: 'Nota no encontrada' });

    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
