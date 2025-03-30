import { env } from '$env/dynamic/public';

export async function load({ fetch }) {
    return {
        torcoloVersionInfo: await fetch(env.PUBLIC_TORCOLO_URL).then(r => r.json())
    };
}
