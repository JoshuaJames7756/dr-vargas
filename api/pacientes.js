import { sql } from '../src/lib/db.js';
import { requireAuth } from '../src/lib/auth.js';

export default async function handler(req, res) {
  const auth = await requireAuth(req, res);
  if (!auth) return;

  if (req.method === 'GET') {
    const { q, id } = req.query;

    // Detalle de un paciente: sus datos + todas sus citas + todas sus notas
    if (id) {
      const [paciente] = await sql`SELECT * FROM pacientes WHERE id = ${id}`;
      if (!paciente) return res.status(404).json({ error: 'Paciente no encontrado' });

      const citas = await sql`
        SELECT * FROM citas WHERE paciente_id = ${id} ORDER BY fecha DESC, hora DESC
      `;
      const notas = await sql`
        SELECT * FROM notas_clinicas WHERE paciente_id = ${id} ORDER BY creado_en DESC
      `;

      return res.status(200).json({ paciente, citas, notas });
    }

    // Buscador: por nombre o teléfono, parcial
    if (q && q.trim().length >= 2) {
      const termino = `%${q.trim()}%`;
      const pacientes = await sql`
        SELECT * FROM pacientes
        WHERE nombre ILIKE ${termino} OR telefono ILIKE ${termino}
        ORDER BY nombre ASC
        LIMIT 20
      `;
      return res.status(200).json({ pacientes });
    }

    // Sin búsqueda: lista completa (para casos donde se quiera ver todo)
    const pacientes = await sql`SELECT * FROM pacientes ORDER BY nombre ASC LIMIT 100`;
    return res.status(200).json({ pacientes });
  }

  if (req.method === 'PATCH') {
    // Editar notas_generales del paciente (alergias, antecedentes, etc.)
    const { id, notas_generales } = req.body;
    if (!id) return res.status(400).json({ error: 'Falta id' });

    const [paciente] = await sql`
      UPDATE pacientes SET notas_generales = ${notas_generales || null} WHERE id = ${id} RETURNING *
    `;
    if (!paciente) return res.status(404).json({ error: 'Paciente no encontrado' });

    return res.status(200).json({ success: true, paciente });
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
