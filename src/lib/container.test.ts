import { describe, expect, it } from 'vitest';
import { getContainedWords } from './container';

describe('getContainedWords', () => {
	it('gets all contained words', () => {
		const contained = [...getContainedWords('doolicky')];
		expect(contained).toEqual(['do', 'doo', 'dool', 'oo', 'li', 'lick', 'ick', 'icky', 'ky']);
	});

	it('does not include ends if configured', () => {
		const contained = [...getContainedWords('doolicky', false)];
		expect(contained).toEqual(['oo', 'li', 'lick', 'ick']);
	});
});
