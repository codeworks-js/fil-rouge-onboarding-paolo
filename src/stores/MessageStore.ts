import { action, computed, makeObservable, observable } from 'mobx';

export class MessageStore {
	messages: string[] = [];

	constructor() {
		makeObservable(this, {
			messages: observable,
			add: action,
			clear: action,
			isEmpty: computed,
		});
	}

	add(message: string): void {
		this.messages.push(message);
	}

	clear(): void {
		this.messages = [];
	}

	get isEmpty(): boolean {
		return this.messages.length === 0;
	}
}
