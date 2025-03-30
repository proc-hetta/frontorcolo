import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';

const token = env.TORCOLO_TOKEN; // How to use enhanced fetch here?

export async function DELETE({ params }) {
    const { id } = params;

    const response = await fetch(
        `${publicEnv.PUBLIC_TORCOLO_URL}/files/${id}`,
        {
            method: 'DELETE',
            headers: {
                "Authorization": `bearer ${token}`,
            },
        },
    );

    return response;
}
