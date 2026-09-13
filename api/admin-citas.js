import { sql } from '../src/lib/db.js';

// NOTA: este endpoint debe protegerse verificando el JWT de Clerk en el
// header Authorization antes de ejecutar cualquier query. Se agrega el
// middleware de verificación cuando Joshua conecte las claves de Clerk.

export default async function handler(req, res) {
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
    const { id, estado } = req.body;
    if (!id || !estado) return res.status(400).json({ error: 'Faltan id o estado' });

    const validEstados = ['pendiente', 'confirmada', 'cancelada', 'completada'];
    if (!validEstados.includes(estado)) return res.status(400).json({ error: 'Estado inválido' });

    const [cita] = await sql`
      UPDATE citas SET estado = ${estado} WHERE id = ${id} RETURNING *
    `;
    if (!cita) return res.status(404).json({ error: 'Cita no encontrada' });

    return res.status(200).json({ success: true, cita });
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
