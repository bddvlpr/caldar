import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { github } from '$lib/server/auth/providers';
import { generateState } from 'arctic';

export const GET = (async ({ cookies }) => {
    const state = generateState();
    const url = await github.createAuthorizationURL(state);

    cookies.set('github_oauth_state', state, {
        path: '/',
        secure: !dev,
        maxAge: 60 * 10,
        sameSite: 'lax'
    });

    return redirect(302, url.toString());
}) satisfies RequestHandler;
