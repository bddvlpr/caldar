import type { RequestHandler } from './$types';
import { error, redirect } from '@sveltejs/kit';
import auth from '$lib/server/auth';
import { github } from '$lib/server/auth/providers';
import database from '$lib/server/database';
import { users } from '$lib/server/database/schema/users';
import { OAuth2RequestError } from 'arctic';
import { and, eq } from 'drizzle-orm';

interface GitHubUser {
    id: number;
    login: string;
    avatar_url: string;
}

export const GET = (async ({ url, cookies }) => {
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const storedState = cookies.get('github_oauth_state') ?? null;

    if (!code || !state || !storedState || state !== storedState) {
        return error(400);
    }

    try {
        const tokens = await github.validateAuthorizationCode(code);
        const githubUserResponse: GitHubUser = await fetch('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`
            }
        }).then((r) => r.json());

        const existingUser = await database.query.users.findFirst({
            where: and(
                eq(users.provider, 'github'),
                eq(users.providerId, githubUserResponse.id.toString())
            )
        });

        if (existingUser) {
            const session = await auth.createSession(existingUser.id, {});
            const sessionCookie = auth.createSessionCookie(session.id);
            cookies.set(sessionCookie.name, sessionCookie.value, {
                path: '.',
                ...sessionCookie.attributes
            });
        } else {
            const [newUser] = await database
                .insert(users)
                .values({
                    provider: 'github',
                    providerId: githubUserResponse.id.toString()
                })
                .returning();
            const session = await auth.createSession(newUser.id, {});
            const sessionCookie = auth.createSessionCookie(session.id);
            cookies.set(sessionCookie.name, sessionCookie.value, {
                path: '.',
                ...sessionCookie.attributes
            });
        }
    } catch (e) {
        if (e instanceof OAuth2RequestError) {
            return error(400);
        }
        return error(500);
    }

    return redirect(302, '/');
}) satisfies RequestHandler;
