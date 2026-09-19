import { sql } from '../src/lib/db.js';

const TIPOS_VALIDOS = ['ginecologia', 'control_prenatal', 'oncologia_mastologia', 'segunda_opinion', 'otro'];

function validarCita(datos) {
  const { nombre_paciente, telefono, email, tipo_consulta, fecha, hora } = datos;

  if (typeof nombre_paciente !== 'string' || nombre_paciente.trim().length < 3 || nombre_paciente.length > 150) {
    return 'El nombre debe tener entre 3 y 150 caracteres';
  }
  if (typeof telefono !== 'string' || !/^[\d+()\-\s]{7,20}$/.test(telefono.trim())) {
    return 'El teléfono no tiene un formato válido';
  }
  if (email && (typeof email !== 'string' || email.length > 150 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
    return 'El correo electrónico no tiene un formato válido';
  }
  if (!TIPOS_VALIDOS.includes(tipo_consulta)) {
    return 'Tipo de consulta no válido';
  }
  if (typeof fecha !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    return 'Fecha no válida';
  }
  if (typeof hora !== 'string' || !/^\d{2}:\d{2}$/.test(hora)) {
    return 'Hora no válida';
  }
  return null;
}

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

    const errorValidacion = validarCita(req.body);
    if (errorValidacion) {
      return res.status(400).json({ error: errorValidacion });
    }

    // Rate limiting simple: máximo 3 citas creadas por el mismo teléfono
    // en los últimos 10 minutos. Evita spam sin necesitar infraestructura
    // adicional (Redis, etc.) — usa la misma tabla citas ya existente.
    const recientes = await sql`
      SELECT COUNT(*) AS total FROM citas
      WHERE telefono = ${telefono.trim()} AND creado_en > NOW() - INTERVAL '10 minutes'
    `;
    if (Number(recientes[0].total) >= 3) {
      return res.status(429).json({ error: 'Demasiadas solicitudes. Intenta de nuevo en unos minutos.' });
    }

    try {
      const result = await sql`
        INSERT INTO citas (nombre_paciente, telefono, email, tipo_consulta, primera_vez, fecha, hora)
        VALUES (${nombre_paciente.trim()}, ${telefono.trim()}, ${email?.trim() || null}, ${tipo_consulta}, ${primera_vez ?? true}, ${fecha}, ${hora})
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
