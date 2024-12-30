import { describe, expect, it } from 'vitest';
import { getAnagrams, generateUniqueSublists, stringDiff } from './anagrams';

describe('generateUniqueSublists', () => {
	it('works', () => {
		expect(generateUniqueSublists('abb')).toEqual(['a', 'ab', 'b', 'bb']);
	});
});

describe('stringDiff', () => {
	it('works', () => {
		expect(stringDiff('caramel', 'ram')).toBe('cael');
	});
});
describe('getAnagrams', () => {
	it('gets one-word anagrams', () => {
		const anagrams = [...getAnagrams('dog')];
		expect(anagrams).toContain('dog');
		expect(anagrams).toContain('god');
	});

	it('gets two-word anagrams', () => {
		const anagrams = [...getAnagrams('dog food', 2)];
		expect(anagrams).toContain('dodo fog');
		expect(anagrams).not.toContain('fog dodo');
		expect(new Set(anagrams).size).toBe(anagrams.length);
	});
});
