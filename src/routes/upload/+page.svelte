<script lang="ts">
    import { m } from '$lib/paraglide/messages';
    import { getContext } from 'svelte';
    import { type ToastContext } from '@skeletonlabs/skeleton-svelte';
    import { FileUpload, type FileUploadApi } from '@skeletonlabs/skeleton-svelte';

    export const toast: ToastContext = getContext('toast');

    let file: File | null = $state(null);
    let healthbar: string | null = $state(null);
    let ephemeral: boolean = $state(false);

    let api: FileUploadApi;

    async function setFileData(files: File[]) {
        if (!files) {
            file = null;
            return;
        }
        file = files[0];
    }

    async function uploadFile() {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        if (healthbar) formData.append('healthbar', healthbar);
        const response = await fetch(
            '/files',
            {
                method: 'POST',
                body: formData,
            }
        );

        if (!response.ok) {
            toast.create({
                title: 'Error',
                description: `Received code ${response.status}`,
                type: 'error'
            });
            return;
        }
        toast.create({
            title: 'Success',
            description: `Created new file at ${response.headers.get('Location')}`,
            type: 'success'
        });

        file = null;
        api.clearFiles();
    }
</script>

<section class="w-full h-full items-center space-y-4 p-8 flex flex-col justify-center">
    <h3 class="h3">{m.filesUploadUploadAFile()}</h3>
    <label hidden={!ephemeral} class="label w-min">
        <span class="label-text">{m.filesUploadHealthbar()}</span>
        <input disabled={!file} bind:value={healthbar} class="input w-min" id="healthbar" name="healthbar" type="number" placeholder="Healthbar" />
    </label>
    <label class="flex items-center space-x-2">
        <input class="checkbox" type="checkbox" bind:checked={ephemeral} name="ephemeral" />
        <p>{m.filesUploadEphemeral()}</p>
    </label>
    <div class="w-full">
        <FileUpload maxFiles={1} allowDrop onApiReady={(_api) => api=_api} onFileChange={(event) => setFileData(event.acceptedFiles)} />
    </div>
    <button disabled={!file} type="button" class="btn preset-filled" onclick={uploadFile}>{m.filesUploadUpload()}</button>
</section>
