import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
	kit: {
		csrf: {
			checkOrigin: false
		},
		adapter: adapter()
	}
};

export default config;
