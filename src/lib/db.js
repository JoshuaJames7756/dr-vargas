// Cliente Neon — SOLO se importa desde /api, nunca desde el frontend
import { neon } from '@neondatabase/serverless';

export const sql = neon(process.env.DATABASE_URL);
