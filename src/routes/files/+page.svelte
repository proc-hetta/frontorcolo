<script lang="ts">
    import FilesTable from '$lib/components/FilesTable.svelte';

	import { enhance } from '$app/forms';
    import { m } from '$lib/paraglide/messages';

    let { data } = $props();
</script>

<div class="flex flex-col items-center py-8 gap-8">
    <form
        class="w-fit card preset-filled-surface-100-900 border-[1px] border-surface-200-800 p-4 flex flex-col items-center gap-2"
        method="POST"
        use:enhance={() => {
            return async ({ update }) => {
              update({ reset: false });
            };
        }}>
        <div class="flex flex-row flex-wrap gap-2">
            <label class="label w-min">
                <span class="label-text">Filename</span>
                <input class="input w-min" id="filename" name="filename" type="text" placeholder="Filename" />
            </label>
            <label class="label w-min">
                <span class="label-text">{m.filesSearchAfter()}</span>
                <input class="input" id="after" name="after" type="date" />
            </label>
            <label class="label w-min">
                <span class="label-text">{m.filesSearchBefore()}</span>
                <input class="input" id="before" name="before" type="date" />
            </label>
            <label class="label w-min">
                <span class="label-text">{m.filesSearchNumberOfResults()}</span>
                <input class="input w-min" id="limit" name="limit" type="number" placeholder="100" />
            </label>
        </div>
        <div class="flex flex-row gap-4">
            <label class="flex items-center space-x-2">
                <input class="radio" type="radio" checked name="older" value="" />
                <p>{m.filesSearchNewerFirst()}</p>
            </label>
            <label class="flex items-center space-x-2">
                <input class="radio" type="radio" name="older" value="true" />
                <p>{m.filesSearchOlderFirst()}</p>
            </label>
        </div>
        <div class="flex flex-row gap-2">
            <button id="submit" name="submit" class="btn preset-filled-primary-500 w-min mt-2" type="submit">{m.filesSearchButton()}</button>
            <button class="btn preset-outlined-primary-500 w-min mt-2" type="reset">{m.filesSearchReset()}</button>
        </div>
    </form>
    {#if data.manifestView && data.manifestView.length !== 0}
        <FilesTable submitId="submit" sourceData={data.manifestView} />
    {/if}
</div>
