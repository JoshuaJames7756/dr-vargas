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

import { createClerkClient } from '@clerk/backend';

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

export async function requireAuth(req, res) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    res.status(401).json({ error: 'No autorizado' });
    return null;
  }

  try {
    const { sub: userId } = await clerkClient.verifyToken(token);
    if (!userId) {
      res.status(401).json({ error: 'No autorizado' });
      return null;
    }
    return { userId };
  } catch {
    res.status(401).json({ error: 'Sesión inválida o expirada' });
    return null;
  }
}
