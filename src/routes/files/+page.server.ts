import { env } from '$env/dynamic/public';

let manifestView: {
    id: string,
    filename: string,
    lastModified: string,
    remaining: number,
}[] = [];

let status: {
    code: number,
    msg: string,
    err: boolean,
};

async function updateManifestView(fetch: Function, parameters: URLSearchParams) {
    let response = await fetch(`${env.PUBLIC_TORCOLO_URL}/files/manifest?${parameters}`);
    response = await response.json();
    status = {
        code: response.status,
        msg: response.statusText,
        err: response.status >= 400,
    };
    manifestView = response.entries;
}

export async function load() {
    return {
        manifestView: manifestView,
        status: status,
    };
}

export const actions = {
    default: async ({ fetch, request }) => {
        const parameters = new URLSearchParams();
        const data = await request.formData();
        data.forEach((value, key) => { if(value) parameters.append(key, value.toString()) });
        await updateManifestView(fetch, parameters);
    }
}
