import { sql } from '../src/lib/db.js';

// Dispara notificación por WhatsApp (API oficial de Meta o proveedor tipo Twilio)
// y por email (Resend/SendGrid) cuando se confirma una cita.
// Se llama internamente desde citas.js tras el INSERT, o vía cron/trigger.

async function enviarWhatsApp(telefono, mensaje) {
  // TODO: integrar WhatsApp Business API (Meta Cloud API recomendado — gratis hasta cierto volumen)
  console.log(`[WhatsApp -> ${telefono}]: ${mensaje}`);
}

async function enviarEmail(email, asunto, mensaje) {
  // TODO: integrar Resend (recomendado, gratis hasta 3000 emails/mes, fácil con Vercel)
  console.log(`[Email -> ${email}] ${asunto}: ${mensaje}`);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { citaId } = req.body;
  if (!citaId) return res.status(400).json({ error: 'Falta citaId' });

  const [cita] = await sql`SELECT * FROM citas WHERE id = ${citaId}`;
  if (!cita) return res.status(404).json({ error: 'Cita no encontrada' });

  const mensaje = `Hola ${cita.nombre_paciente}, tu cita con el Dr. Rolando Vargas Calvetty quedó registrada para el ${cita.fecha} a las ${cita.hora}. Consultorio: Parque Fidel Anze #200, Esq. Av. Pando, Edif. VyV NUR, Primer piso, Cochabamba.`;

  await enviarWhatsApp(cita.telefono, mensaje);
  if (cita.email) await enviarEmail(cita.email, 'Confirmación de cita', mensaje);

  await sql`
    UPDATE citas SET notificado_whatsapp = true, notificado_email = ${!!cita.email}
    WHERE id = ${citaId}
  `;

  return res.status(200).json({ success: true });
}
