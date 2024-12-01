import { describe, it, expect } from 'vitest';
import { isScrabbleWord } from './dictionary';

describe('isScrabbleWord', () => {
	it('works for first word', () => {
		expect(isScrabbleWord('aa')).toBeTruthy();
	});
	it('works for long word', () => {
		expect(isScrabbleWord('information')).toBeTruthy();
	});
	it('does not work for fake word', () => {
		expect(isScrabbleWord('regorted')).toBeFalsy();
	});
});
