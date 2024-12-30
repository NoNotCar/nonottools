import { scrabbleDict } from './dictionary';

export function* getContainedWords(word: string, includeEnds = true) {
	const e = includeEnds ? 0 : 1;
	for (let s = e; s < word.length - e; s++) {
		for (let l = 1; l <= word.length - s - e; l++) {
			const contained = word.slice(s, s + l);
			if (scrabbleDict.has(contained)) {
				yield contained;
			}
		}
	}
}
