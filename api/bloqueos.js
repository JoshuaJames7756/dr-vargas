import { sql } from '../src/lib/db.js';

// NOTA: proteger con verificación de JWT de Clerk, igual que admin-citas.js

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const bloqueos = await sql`SELECT * FROM bloqueos WHERE fecha >= CURRENT_DATE ORDER BY fecha ASC`;
    return res.status(200).json({ bloqueos });
  }

  if (req.method === 'POST') {
    const { fecha, motivo } = req.body;
    if (!fecha) return res.status(400).json({ error: 'Falta fecha' });

    const [bloqueo] = await sql`
      INSERT INTO bloqueos (fecha, motivo) VALUES (${fecha}, ${motivo || null}) RETURNING *
    `;
    return res.status(201).json({ success: true, bloqueo });
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: 'Falta id' });

    await sql`DELETE FROM bloqueos WHERE id = ${id}`;
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
