<script lang="ts">
	import { sortByCommon } from '$lib/common';
	import { getAnagrams, stringDiff } from '$lib/anagrams';
	import { getLetters } from '$lib/compact';
	import { dictgex } from '$lib/dictgex';
	import { scrabbleDict } from '$lib/dictionary';
	import { getContainedWords } from '$lib/container';
	const MAX_RESULTS = 10000;

	let input = $state('');
	let results = $state<string[]>();

	const anagrams = () => {
		let rem = MAX_RESULTS;
		const out = [];
		for (const ana of getAnagrams(input, 2)) {
			out.push(ana);
			if (!rem--) break;
		}
		results = sortByCommon(out.sort());
	};

	const deletions = () => {
		const regex = new RegExp(
			`^.*${getLetters(input)
				.map((l) => l.toLowerCase())
				.join('.*')}.*$`,
			'gmi'
		);
		const superWords = dictgex(regex);
		results = sortByCommon(
			superWords
				.map((s) => [s, stringDiff(s, input)])
				.filter(([_, rem]) => scrabbleDict.has(rem))
				.map(([s, rem]) => `${s} - ${rem}`)
		);
	};

	const containers = () => {
		const contained = [...getContainedWords(input, false)];
		results = sortByCommon(
			contained
				.map((s) => [s, stringDiff(input, s)])
				.filter(([_, rem]) => scrabbleDict.has(rem))
				.map(([s, rem]) => `${s} < ${rem}`)
		);
	};

	const alternations = () => {
		const regex = new RegExp(
			`^.?${getLetters(input)
				.map((l) => l.toLowerCase())
				.join('.')}.?$`,
			'gmi'
		);
		results = sortByCommon(dictgex(regex));
	};
</script>

<svelte:head>
	<title>Cryptic Crossword Helpers</title>
</svelte:head>

<h2>Cryptic Crossword Helpers</h2>
<input bind:value={input} />
<button onclick={anagrams}>Anagrams</button>
<button onclick={deletions}>Deletions</button>
<button onclick={containers}>Containers</button>
<button onclick={alternations}>Alternation</button>
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
