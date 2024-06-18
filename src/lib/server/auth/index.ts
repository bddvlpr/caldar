import database from '../database';
import { sessions } from '../database/schema/sessions';
import { users } from '../database/schema/users';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { dev } from '$app/environment';
import { Lucia } from 'lucia';

const adapter = new DrizzlePostgreSQLAdapter(database, sessions, users);

const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            secure: !dev
        }
    },
    getUserAttributes: ({ id, name }) => ({ id, name })
});

interface Attributes {
    id: number;
    name: string;
}

declare module 'lucia' {
    interface Register {
        Lucia: typeof lucia;
        UserId: number;
        DatabaseUserAttributes: Attributes;
    }
}

export default lucia;
