import { SequenceHook } from '~hooks/sequence'
import type { Hook } from '~types/hooks'

/**
 * The `HookBuilder` class is responsible for creating various types of hooks.
 * It provides methods to create different hook types such as `sequence` hooks,
 * which manage a series of asynchronous operations.
 */
export class HookBuilder {
	/**
	 * Creates a new `SequenceHook`, which allows you to add asynchronous handlers
	 * that are executed in sequence. Each handler is executed independently
	 * and does not receive the result of the previous handler.
	 *
	 * @template T - The type of the result each handler in the sequence produces.
	 * @returns {Hook<() => Promise<T>, (T | undefined)[]>} A new `SequenceHook` instance.
	 */
	sequence<T = unknown>(): Hook<() => Promise<T>, (T | undefined)[]> {
		return new SequenceHook<T>()
	}
}
