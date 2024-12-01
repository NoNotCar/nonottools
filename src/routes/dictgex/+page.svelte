<script lang="ts">
	import { scrabbleDict } from '$lib/dictionary';

	let regexInput = $state('');
	let currentRegex = $state<RegExp>();

	const evaluate = () => {
		currentRegex = new RegExp(`^${regexInput}$`, 'gmi');
	};

	const fullWords = [...scrabbleDict].join('\n');
	let results = $derived.by(() => {
		if (!currentRegex) return;
		return Array.from(fullWords.matchAll(currentRegex), (m) => m[0]);
	});
</script>

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
