import { describe, expect, it } from 'vitest';
import { dictgex } from './dictgex';

describe('dictgex', () => {
	it('runs regex on the dictionary', () => {
		expect([...dictgex(/^a.b.s$/)]).toMatchInlineSnapshot(`
			[
			  "abbas",
			  "abbes",
			  "albas",
			  "ambos",
			  "arbas",
			]
		`);
	});

	it.skip('benchmark test', () => {
		for (let i = 0; i < 1000; i++) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const result = [...dictgex(/^a.b.s$/)];
		}
	});
});
