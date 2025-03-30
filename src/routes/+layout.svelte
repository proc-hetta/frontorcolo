<script lang="ts">
	import '../app.css';

	import logo from '$lib/logo.svg';

	import { m } from '$lib/paraglide/messages.js';
	import { locales, getLocale, setLocale } from '$lib/paraglide/runtime';

	import { Navigation, ToastProvider } from '@skeletonlabs/skeleton-svelte';

	import IconHouse from '@lucide/svelte/icons/house';
	import IconFiles from '@lucide/svelte/icons/files';
	import IconUpload from '@lucide/svelte/icons/file-up';

	function onchange() {
		setLocale(locale);
	}

	let { children } = $props();

	let locale = $state(getLocale());
</script>

<ToastProvider>
<div class="grid w-dvw h-dvh grid-cols-[auto_1fr] show-large">
	<aside>
		<Navigation.Rail>
			{#snippet header()}
				<img src={logo} alt="logo" />
			{/snippet}
			{#snippet tiles()}
				<Navigation.Tile id="home" href="/" labelExpanded={m.menuHome()} label={m.menuHome()}><IconHouse /></Navigation.Tile>
				<Navigation.Tile id="files" href="/files" labelExpanded={m.menuFiles()} label={m.menuFiles()}><IconFiles /></Navigation.Tile>
				<Navigation.Tile id="upload" href="/upload" labelExpanded={m.menuUpload()} label={m.menuUpload()}><IconUpload /></Navigation.Tile>
			{/snippet}
			{#snippet footer()}
				<select class="select" bind:value={locale} {onchange}>
					{#each locales as l}
					 <option value={l}>{l}</option>
					{/each}
				</select>
				<div class="text-xs">v{__VERSION__}</div>
			{/snippet}
		</Navigation.Rail>
	</aside>
	<div>
		{@render children()}
	</div>
</div>

<div class="grid w-full h-dvh grid-rows-[1fr_auto] show-small">
	<div>
		{@render children()}
	</div>
	<Navigation.Bar>
		<Navigation.Tile id="home" href="/" labelExpanded={m.menuHome()} label={m.menuHome()}><IconHouse /></Navigation.Tile>
		<Navigation.Tile id="files" href="/files" labelExpanded={m.menuFiles()} label={m.menuFiles()}><IconFiles /></Navigation.Tile>
		<Navigation.Tile id="upload" href="/upload" labelExpanded={m.menuUpload()} label={m.menuUpload()}><IconUpload /></Navigation.Tile>
	</Navigation.Bar>
</div>
</ToastProvider>
