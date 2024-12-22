import { isScrabbleWord } from './dictionary';
import google from './google.json';
import { DefaultMap } from './maps';

export const commonDict = new Map<string, number>(
	google.filter((w) => isScrabbleWord(w)).map((s, idx) => [s, idx])
);

const wordGex = /\w+/g;
const average = (input: Iterable<number>) => {
	let sum = 0;
	let length = 0;
	for (const n of input) {
		sum += n;
		length++;
	}
	return sum / length;
};
const getCommonRatings = (input: string) => {
	const ratings = Array.from(input.matchAll(wordGex), (m) => commonDict.get(m[0]) ?? Infinity);
	ratings.sort();
	return {
		common: average(ratings.filter((i) => i !== Infinity)),
		uncommon: ratings.filter((i) => i === Infinity).length
	};
};

export const sortByCommon = (input: string[]) => {
	const dMap = new DefaultMap(getCommonRatings);
	return input.sort((a, b) => {
		const ar = dMap.get(a);
		const br = dMap.get(b);
		if (ar.uncommon > br.uncommon) {
			return 1;
		} else if (ar.uncommon < br.uncommon) {
			return -1;
		}
		return ar.common - br.common;
	});
};
