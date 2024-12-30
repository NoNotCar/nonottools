<script lang="ts">
	import { sortByCommon } from '$lib/common';
	import { getAnagrams } from '$lib/anagrams';
	const MAX_RESULTS = 10000;

	let input = $state('');
	let results = $state<string[]>();

	const evaluate = () => {
		let rem = MAX_RESULTS;
		const out = [];
		for (const ana of getAnagrams(input, 2)) {
			out.push(ana);
			if (!rem--) break;
		}
		results = sortByCommon(out.sort());
	};
</script>

<h2>Anagrams Generator</h2>
<input bind:value={input} />
<button onclick={evaluate}>Find anagrams</button>
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
