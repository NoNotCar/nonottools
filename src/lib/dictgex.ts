import { scrabbleDict } from './dictionary';

const fullWords = [...scrabbleDict].join('\n');

export const dictgex = (regex: RegExp) => {
	return Array.from(fullWords.matchAll(regex), (m) => m[0]);
};
