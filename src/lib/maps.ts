export class DefaultMap<K, T> {
	private m = new Map<K, T>();
	constructor(private dft: (key: K) => T) {}

	get(k: K) {
		let value = this.m.get(k);
		if (value !== undefined) {
			return value;
		}
		value = this.dft(k);
		this.m.set(k, value);
		return value;
	}

	set(k: K, v: T) {
		this.m.set(k, v);
		return v;
	}
}

export class ListMap<K, T> extends DefaultMap<K, T[]> {
	constructor() {
		super(() => []);
	}

	push(k: K, v: T) {
		this.get(k).push(v);
	}
}

export class Counter<K> extends DefaultMap<K, number> {
	constructor() {
		super(() => 0);
	}

	add(k: K, delta = 1) {
		return this.set(k, this.get(k) + delta);
	}
}
