import auth from '.';
import type { Handle } from '@sveltejs/kit';
import type { Cookie } from 'lucia';

export default (async ({ event, resolve }) => {
    const sessionId = event.cookies.get(auth.sessionCookieName);
    if (!sessionId) {
        event.locals.user = null;
        event.locals.session = null;
        return resolve(event);
    }

    const setCookie = ({ name, value, attributes }: Cookie) =>
        event.cookies.set(name, value, { path: '.', ...attributes });

    const { session, user } = await auth.validateSession(sessionId);
    if (session && session.fresh) {
        const sessionCookie = auth.createSessionCookie(session.id);
        setCookie(sessionCookie);
    }

    if (!session) {
        const sessionCookie = auth.createBlankSessionCookie();
        setCookie(sessionCookie);
    }

    event.locals.user = user;
    event.locals.session = session;
    return resolve(event);
}) satisfies Handle;
