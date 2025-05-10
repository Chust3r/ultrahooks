import type { SequenceHookHandler } from "~types/hooks";
import { BaseHook } from "~hooks/base";

/**
 * The `SequenceHook` class allows handlers to be executed one after another,
 * in the order they were registered. Each handler is awaited before moving to the next.
 *
 * @template T - The type of the result returned by each handler.
 */
export class SequenceHook<T = unknown> extends BaseHook<
	SequenceHookHandler<T>,
	T[]
> {
	/**
	 * Registers a new handler to be part of the sequence.
	 * Each handler will be executed in the order it was added.
	 *
	 * @param handler The handler function to be added to the sequence.
	 * @returns A function that can be called to remove this handler from the sequence.
	 */
	public tap(handler: SequenceHookHandler<T>): () => void {
		const id = this.generateId();
		this.handlers.set(id, handler);
		return () => this.handlers.delete(id);
	}

	/**
	 * Runs all the registered handlers in sequence. Each handler is awaited in order.
	 *
	 * @returns A promise that resolves with an array of the results from each handler.
	 */
	public async trigger(): Promise<T[]> {
		const results: T[] = [];

		for (const handler of this.handlers.values()) {
			const result = await handler();
			results.push(result);
		}

		return results;
	}
}
