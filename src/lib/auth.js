// Middleware de autenticación para endpoints /api/admin-*.
// Verifica el JWT de Clerk enviado en el header Authorization.
// Requiere la variable de entorno CLERK_SECRET_KEY (clave secreta,
// nunca la publishable key) configurada en Vercel.
//
// Uso en un endpoint:
//   import { requireAuth } from '../src/lib/auth.js';
//   export default async function handler(req, res) {
//     const auth = await requireAuth(req, res);
//     if (!auth) return; // requireAuth ya respondió 401 si falló
//     // ... resto del handler, ya autenticado
//   }

// IMPORTANTE: verifyToken se importa como función independiente,
// NO es un método de la instancia creada con createClerkClient().
// Llamarlo como clerkClient.verifyToken(...) lanza un error silencioso
// en cada petición (nunca existe ese método), que quedaba atrapado
// por el try/catch de abajo y siempre resultaba en 401.
import { verifyToken } from '@clerk/backend';

export async function requireAuth(req, res) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    res.status(401).json({ error: 'No autorizado' });
    return null;
  }

  try {
    const { sub: userId } = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });
    if (!userId) {
      res.status(401).json({ error: 'No autorizado' });
      return null;
    }
    return { userId };
  } catch (err) {
    // Log real del motivo, visible en los logs de Vercel — antes este
    // detalle se perdía por completo (catch silencioso sin rastro).
    console.error('[auth] verifyToken falló:', err.message);
    res.status(401).json({ error: 'Sesión inválida o expirada' });
    return null;
  }
}
