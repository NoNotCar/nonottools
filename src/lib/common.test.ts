import { describe, expect, it } from 'vitest';
import { sortByCommon } from './common';

describe('sortByCommon', () => {
	it('sorts common words', () => {
		expect(sortByCommon(['dog', 'the'])).toEqual(['the', 'dog']);
	});

	it('sorts uncommon words', () => {
		expect(sortByCommon(['subarctic knitwear', 'velociraptor'])).toEqual([
			'velociraptor',
			'subarctic knitwear'
		]);
	});

	it('sorts common before uncommon', () => {
		expect(sortByCommon(['the', 'velociraptor'])).toEqual(['the', 'velociraptor']);
	});
});
