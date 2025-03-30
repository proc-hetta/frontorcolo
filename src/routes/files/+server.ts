import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';

const token = env.TORCOLO_TOKEN; // How to use enhanced fetch here?

export async function POST({ request }) {
    const body = await request.formData();

    const response = await fetch(
        `${publicEnv.PUBLIC_TORCOLO_URL}/files`,
        {
            method: 'POST',
            body: body,
            headers: {
                "Authorization": `bearer ${token}`,
            },
        },
    );
    return response;
}
