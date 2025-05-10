import type { PipelineHookHandler } from "~types/hooks";
import { BaseHook } from "~hooks/base";

/**
 * The `PipelineHook` class allows you to define a transformation pipeline.
 * Each handler receives the value from the previous one and returns a new transformed value.
 * All handlers are executed sequentially and asynchronously.
 *
 * @template T - The type of the data being transformed.
 */
export class PipelineHook<T = unknown> extends BaseHook<
	PipelineHookHandler<T>,
	T
> {
	/**
	 * Registers a new handler to the pipeline.
	 * Each handler transforms the data passed from the previous one.
	 *
	 * @param handler - The transformation function to add to the pipeline.
	 * @returns A function that can be called to remove the handler.
	 */
	public tap(handler: PipelineHookHandler<T>): () => void {
		const id = this.generateId();
		this.handlers.set(id, handler);
		return () => this.handlers.delete(id);
	}

	/**
	 * Runs the pipeline with the given initial value.
	 * Each handler is awaited and passes its result to the next.
	 *
	 * @param input - The initial input for the pipeline.
	 * @returns A promise resolving to the final transformed value.
	 */
	public async trigger(input: T): Promise<T> {
		let result = input;

		for (const handler of this.handlers.values()) {
			result = await handler(result);
		}

		return result;
	}
}
