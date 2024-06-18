import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { isAuthenticated } from '$lib/server/auth/guards';
import database from '$lib/server/database';
import { links } from '$lib/server/database/schema/links';
import { eq } from 'drizzle-orm';

export const load = (async ({ locals }) => {
    if (!isAuthenticated(locals)) return error(400);

    return {
        links: database.query.links.findMany({
            where: eq(links.userId, locals.user!.id)
        })
    };
}) satisfies PageServerLoad;
