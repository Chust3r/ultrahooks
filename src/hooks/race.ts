import type { RaceHookHandler } from "~types/hooks";
import { BaseHook } from "~hooks/base";

/**
 * The `RaceHook` class allows you to run multiple handlers concurrently and resolves
 * as soon as one of them completes. It behaves similarly to `Promise.race`.
 *
 * @template T - The type of the data being processed by the handlers.
 */
export class RaceHook<T = unknown> extends BaseHook<RaceHookHandler<T>, T> {
	/**
	 * Registers a new handler to be executed in the race.
	 * The first one to complete determines the result.
	 *
	 * @param handler - The asynchronous handler function.
	 * @returns A function to remove the handler.
	 */
	public tap(handler: RaceHookHandler<T>): () => void {
		const id = this.generateId();
		this.handlers.set(id, handler);
		return () => this.handlers.delete(id);
	}

	/**
	 * Runs all handlers concurrently and resolves with the result
	 * of the first one to complete.
	 *
	 * @param args - Arguments passed to all handlers.
	 * @returns A promise resolving with the result of the first completed handler.
	 */
	public async trigger(...args: Parameters<RaceHookHandler<T>>): Promise<T> {
		const promises = Array.from(this.handlers.values()).map((handler) =>
			handler(...args),
		);
		return Promise.race(promises);
	}
}
