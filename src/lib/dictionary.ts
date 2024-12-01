import sowpods from './sowpods.json';
import google from './google.json';

export const scrabbleDict = new Set<string>();
const reducedgex = /^(\d+)(\w+)$/;
let lastWord: string | undefined;
for (const word of sowpods) {
	const match = reducedgex.exec(word);
	let thisWord = word;
	if (match && lastWord) {
		const [_, common, rest] = match;
		thisWord = lastWord.slice(0, parseInt(common)) + rest;
	}
	scrabbleDict.add(thisWord);
	lastWord = thisWord;
}

export const isScrabbleWord = (word: string) => {
	switch (word) {
		case 'a':
			return true;
		case 'i':
			return true;
		default:
			return scrabbleDict.has(word);
	}
};

export const commonDict = new Set<string>(google);
for (const word of commonDict) {
	if (!isScrabbleWord(word)) {
		commonDict.delete(word);
	}
}