import { scrabbleDict } from '$lib/dictionary';
import { Counter, ListMap } from '$lib/maps';

const anaMap = new ListMap<string, string>();

const sortLetters = (word: string) =>
	word
		.split('')
		.filter((c) => c.trim())
		.sort()
		.join('');

for (const w of scrabbleDict) {
	anaMap.push(sortLetters(w), w);
}

export function generateUniqueSublists(input: string) {
	const result: Set<string> = new Set();

	const helper = (current: string, remaining: string): void => {
		if (current.length > 0 && current.length < input.length) {
			result.add(current); // Add the current combination to the set
		}

		for (let i = 0; i < remaining.length; i++) {
			// Recursively build combinations, avoiding duplicates
			helper(current + remaining[i], remaining.slice(i + 1));
		}
	};

	helper('', input); // Start with an empty combination
	return [...result].sort();
}

function difference(first: string, second: string): string {
	const result: string[] = [];
	const secondCounts = new Counter<string>();

	// Count the occurrences of each character in the second string
	for (const char of second) {
		secondCounts.add(char);
	}

	// Traverse the first string and add characters not accounted for in the secondCounts
	for (const char of first) {
		if (secondCounts.add(char, -1) < 0) {
			result.push(char); // Add to the result if not in the second string
		}
	}

	return result.join(''); // Join the result into a string
}

export function* getAnagrams(src: string, maxWords = 1): Iterable<string> {
	const sorted = sortLetters(src);
	if (maxWords <= 1) {
		for (const ana of anaMap.get(sorted)) {
			yield ana;
		}
	} else {
		for (const lesser of getAnagrams(src, maxWords - 1)) {
			yield lesser;
		}
		for (const first of generateUniqueSublists(sorted)) {
			const rem = difference(sorted, first);
			if (rem < first) {
				continue;
			}
			const firstGrams = [...getAnagrams(first)];
			for (const remGram of getAnagrams(rem, maxWords - 1)) {
				for (const f of firstGrams) {
					yield `${f} ${remGram}`;
				}
			}
		}
	}
}
