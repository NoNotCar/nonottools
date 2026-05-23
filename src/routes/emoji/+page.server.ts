import { ListMap } from '$lib/maps';
import emojiData from 'unicode-emoji-json';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	const emojiByCategory = new ListMap<string, string>();
	for (const [emoji, data] of Object.entries(emojiData)) {
		emojiByCategory.push(data.group, emoji);
	}
	const inStrings: Record<string, string> = {};
	for (const [cat, emojis] of emojiByCategory.frozen()) {
		inStrings[cat] = emojis.join('');
	}
	return inStrings;
};
