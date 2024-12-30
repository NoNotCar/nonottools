const letterGex = /\w/g;
export const getLetters = (word: string) => {
	return Array.from(word.matchAll(letterGex), (m) => m[0]);
};
