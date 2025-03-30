import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';

import type { Handle } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { URL } from 'node:url';

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		});
	});

export const handle: Handle = handleParaglide;

export async function handleFetch({ request, fetch }) {
	if (URL.parse(request.url)?.host === URL.parse(publicEnv.PUBLIC_TORCOLO_URL)?.host) {
		request.headers.set('Authorization', `bearer ${env.TORCOLO_TOKEN}`);
	}
	return fetch(request);
}
