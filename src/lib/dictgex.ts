import { scrabbleDict } from './dictionary';

const fullWords = [...scrabbleDict].join('\n');

const ensureFlags = (regex: RegExp, requiredFlags: string) => {
	const current = regex.flags;
	const missing = [...requiredFlags].filter((f) => !current.includes(f));
	return missing.length ? new RegExp(regex.source, current + missing.join('')) : regex;
};

export function* dictgex(regex: RegExp): Iterable<string> {
	regex = ensureFlags(regex, 'gmi');
	for (const [result] of fullWords.matchAll(regex)) {
		yield result;
	}
}
