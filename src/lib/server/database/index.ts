import { drizzle } from 'drizzle-orm/vercel-postgres';
import { createPool } from '@vercel/postgres';
import { POSTGRES_URL } from '$env/static/private';

export const pool = createPool({ connectionString: POSTGRES_URL });

export default drizzle(pool, { schema: {} });
