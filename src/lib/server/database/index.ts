import * as users from './schema/users';
import { POSTGRES_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export const client = postgres(POSTGRES_URL);

export default drizzle(client, {
    schema: {
        users
    }
});
