import type { ConcurrentHookHandler } from "~types/hooks";
import { BaseHook } from "~hooks/base";

/**
 * The `ConcurrentHook` class executes all registered handlers in parallel.
 * It returns a Promise that resolves when all handlers have completed.
 *
 * @template T - The return type of each handler.
 */
export class ConcurrentHook<T = unknown> extends BaseHook<
	ConcurrentHookHandler<T>,
	T[]
> {
	/**
	 * Registers a handler to be executed in parallel.
	 * @param handler The async function to run.
	 * @returns A function to unregister this handler.
	 */
	public tap(handler: ConcurrentHookHandler<T>): () => void {
		const id = this.generateId();
		this.handlers.set(id, handler);

		return () => this.handlers.delete(id);
	}

	/**
	 * Triggers all handlers in parallel.
	 * @returns A promise that resolves with the array of all results.
	 */
	public async trigger(): Promise<T[]> {
		const handlers = Array.from(this.handlers.values());
		return await Promise.all(handlers.map((handler) => handler()));
	}
}
