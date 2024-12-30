<script lang="ts">
	import { dictgex } from '$lib/dictgex';

	let regexInput = $state('');
	let currentRegex = $state<RegExp>();

	const evaluate = () => {
		currentRegex = new RegExp(`^${regexInput}$`, 'gmi');
	};

	let results = $derived.by(() => {
		if (!currentRegex) return;
		return dictgex(currentRegex);
	});
</script>

<svelte:head>
	<title>Dictionary Regex</title>
</svelte:head>

<h2>Dictionary Regex</h2>
<input bind:value={regexInput} />
<button onclick={evaluate}>Find words</button>
{#if results}
	<h3>Results</h3>
	{#if results.length}
		<ul>
			{#each results as result}
				<li>{result}</li>
			{/each}
		</ul>
	{:else}
		<span>No results found</span>
	{/if}
{/if}
