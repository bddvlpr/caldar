import * as links from './schema/links';
import * as sessions from './schema/sessions';
import * as timetables from './schema/timetables';
import * as users from './schema/users';
import { POSTGRES_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export const client = postgres(POSTGRES_URL);

export default drizzle(client, {
    schema: {
        ...links,
        ...sessions,
        ...timetables,
        ...users
    }
});
