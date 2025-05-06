import type { SequenceHookHandler, Hook } from '~types/hooks'
import { nanoid } from 'nanoid'

/**
 * The `SequenceHook` class allows you to define a sequence of handlers that
 * are executed in the order they are registered. Each handler executes
 * asynchronously, and the results are collected in sequence.
 *
 * @template T - The type of the result that each handler returns.
 */
export class SequenceHook<T = unknown>
	implements Hook<SequenceHookHandler<T>, (T | undefined)[]>
{
	private handlers: Map<string, SequenceHookHandler<T>> = new Map()

	/**
	 * Registers a new handler to be part of the sequence.
	 * Each handler will be executed in the order it was added.
	 *
	 * @param handler The handler function to be added to the sequence.
	 * @returns A function that can be called to remove this handler from the sequence.
	 */
	public tap(handler: SequenceHookHandler<T>): () => void {
		const id = nanoid()
		this.handlers.set(id, handler)

		// Return a function to remove the handler later if needed
		return () => this.handlers.delete(id)
	}

	/**
	 * Runs all the registered handlers in sequence. Each handler is awaited in order.
	 *
	 * @returns A promise that resolves with an array of the results
	 * from each handler in the sequence.
	 */
	public async trigger(): Promise<(T | undefined)[]> {
		const results: (T | undefined)[] = []

		for (const handler of this.handlers.values()) {
			const result = await handler()
			results.push(result)
		}

		return results
	}
}
