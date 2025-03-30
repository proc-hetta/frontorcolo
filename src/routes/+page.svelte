<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
    let { data } = $props();
</script>

<div class="flex flex-col h-full items-center justify-center">
    <h3 class="h3">{m.homeVersion({ version: __VERSION__ })}</h3>
    <h6 class="h6">{m.homeTorcoloVersion({ version: data.torcoloVersionInfo.complete })}</h6>
</div>
