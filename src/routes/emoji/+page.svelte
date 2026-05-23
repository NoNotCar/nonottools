<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h2>All Emoji</h2>
{#each Object.entries(data) as [category, emoji]}
	<h3>{category}</h3>
	<p>{emoji}</p>
{/each}

<style>
	p {
		font-size: 2rem;
	}
</style>
