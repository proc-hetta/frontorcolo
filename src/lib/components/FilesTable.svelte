<script lang="ts">
  import { env } from '$env/dynamic/public';
  import { Pagination } from '@skeletonlabs/skeleton-svelte';

  import { m } from '$lib/paraglide/messages';

  import IconArrowLeft from '@lucide/svelte/icons/arrow-left';
  import IconArrowRight from '@lucide/svelte/icons/arrow-right';
  import IconEllipsis from '@lucide/svelte/icons/ellipsis';
  import IconFirst from '@lucide/svelte/icons/chevrons-left';
  import IconLast from '@lucide/svelte/icons/chevron-right';
  import IconInfinity from '@lucide/svelte/icons/infinity';
  import IconEye from '@lucide/svelte/icons/eye';
  import IconDownload from '@lucide/svelte/icons/download';
  import IconTrash from '@lucide/svelte/icons/trash';

  interface SourceData {
      id: string
      filename: string
      lastModified: Date
      remaining: number | null
  }

  let { submitId, sourceData } = $props();

  // State
  let page = $state(1);
  let size = $state(5);
  const slicedSource = $derived((s: SourceData[]) => s.slice((page - 1) * size, page * size));
</script>

<section class="space-y-4">
  <div class="text-wrap max-w-dvw overflow-x-auto">
    <table class="table table-auto caption-bottom">
      <thead>
        <tr>
          <th>Filename</th>
          <th>{m.filesTableLastModified()}</th>
          <th>{m.filesTableRemaining()}</th>
          <th class="!text-right">{m.filesTableActions()}</th>
        </tr>
      </thead>
      <tbody class="[&>tr]:hover:preset-tonal-primary">
        {#each slicedSource(sourceData) as row}
          <tr>
            <td class="whitespace-nowrap">{row.filename}</td>
            <td class="whitespace-nowrap">{row.lastModified}</td>
            {#if row.remaining === null}
              <td><IconInfinity /></td>
            {:else}
              <td>{row.remaining}</td>
            {/if}
            <td class="!text-right">
              <div class="flex flex-row justify-end">
                  <a class="a" target="_blank" onclick={() => setInterval(() => document.getElementById(submitId)?.click(), 1000)} href={`${env.PUBLIC_TORCOLO_URL}/files/${row.id}`}><button class="btn hover:preset-tonal-primary"><IconEye /></button></a>
                  <a class="a" target="_blank" onclick={() => setInterval(() => document.getElementById(submitId)?.click(), 1000)} href={`${env.PUBLIC_TORCOLO_URL}/files/${row.id}?download`}><button class="btn hover:preset-tonal-primary"><IconDownload /></button></a>
                  <button type="submit" class="btn hover:preset-tonal-primary" onclick={() => {
                    fetch(
                      `/files/${row.id}`,
                      { method: 'DELETE' }
                    ).then((_) => document.getElementById(submitId)?.click())
                  }}><IconTrash /></button>
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <!-- Footer -->
  <footer class="flex justify-between">
    <select name="size" id="size" class="select max-w-[180px]" value={size} onchange={(e) => (size = Number(e.currentTarget.value))}>
      {#each [5, 10, 20, 50, 100] as v}
        <option value={v}>{m.filesTableItems()} {v}</option>
      {/each}
      <option value={sourceData.length}>{m.filesTableShowAll()}</option>
    </select>
    <!-- Pagination -->
    <Pagination
      data={sourceData}
      {page}
      onPageChange={(e) => (page = e.page)}
      pageSize={size}
      onPageSizeChange={(e) => (size = e.pageSize)}
      siblingCount={4}
    >
      {#snippet labelEllipsis()}<IconEllipsis class="size-4" />{/snippet}
      {#snippet labelNext()}<IconArrowRight class="size-4" />{/snippet}
      {#snippet labelPrevious()}<IconArrowLeft class="size-4" />{/snippet}
      {#snippet labelFirst()}<IconFirst class="size-4" />{/snippet}
      {#snippet labelLast()}<IconLast class="size-4" />{/snippet}
    </Pagination>
  </footer>
</section>

<style>
  @media (min-width: 768px) {
      td {
          max-width: 250px;
          overflow: hidden;
          text-overflow: ellipsis;
      }
  }

  @media (min-width: 1000px) {
      td {
          max-width: 450px;
          overflow: hidden;
          text-overflow: ellipsis;
      }
  }

  @media (min-width: 1200px) {
      td {
          max-width: 650px;
          overflow: hidden;
          text-overflow: ellipsis;
      }
  }

  @media (min-width: 1400px) {
      td {
          max-width: 850px;
          overflow: hidden;
          text-overflow: ellipsis;
      }
  }
</style>
