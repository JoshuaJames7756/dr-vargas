import { sql } from '../src/lib/db.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Disponibilidad: horarios base menos citas ya tomadas menos bloqueos
    const { fecha } = req.query;
    if (!fecha) return res.status(400).json({ error: 'Falta parámetro fecha' });

    const diaSemana = new Date(fecha).getDay();

    const bloqueo = await sql`SELECT * FROM bloqueos WHERE fecha = ${fecha}`;
    if (bloqueo.length > 0) {
      return res.status(200).json({ disponible: false, motivo: bloqueo[0].motivo, horarios: [] });
    }

    const horariosBase = await sql`
      SELECT * FROM horarios_disponibles
      WHERE dia_semana = ${diaSemana} AND activo = true
    `;

    const citasExistentes = await sql`
      SELECT hora FROM citas WHERE fecha = ${fecha} AND estado != 'cancelada'
    `;
    const horasOcupadas = new Set(citasExistentes.map(c => c.hora));

    // Generar slots según duracion_cita dentro de cada bloque horario
    const slots = [];
    for (const bloque of horariosBase) {
      let [h, m] = bloque.hora_inicio.split(':').map(Number);
      const [hFin, mFin] = bloque.hora_fin.split(':').map(Number);
      while (h < hFin || (h === hFin && m < mFin)) {
        const horaStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
        if (!horasOcupadas.has(horaStr)) slots.push(horaStr);
        m += bloque.duracion_cita;
        if (m >= 60) { h += Math.floor(m / 60); m = m % 60; }
      }
    }

    return res.status(200).json({ disponible: true, horarios: slots });
  }

  if (req.method === 'POST') {
    const { nombre_paciente, telefono, email, tipo_consulta, primera_vez, fecha, hora } = req.body;

    if (!nombre_paciente || !telefono || !tipo_consulta || !fecha || !hora) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    try {
      const result = await sql`
        INSERT INTO citas (nombre_paciente, telefono, email, tipo_consulta, primera_vez, fecha, hora)
        VALUES (${nombre_paciente}, ${telefono}, ${email || null}, ${tipo_consulta}, ${primera_vez ?? true}, ${fecha}, ${hora})
        RETURNING *
      `;
      // TODO: disparar notificación WhatsApp + email aquí (webhooks.js)
      return res.status(201).json({ success: true, cita: result[0] });
    } catch (err) {
      if (err.message.includes('unique_horario')) {
        return res.status(409).json({ error: 'Ese horario ya fue reservado. Elige otro.' });
      }
      return res.status(500).json({ error: 'Error al crear la cita' });
    }
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
