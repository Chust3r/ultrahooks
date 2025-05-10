import { nanoid } from "nanoid";
import type { Hook } from "~types/hooks"; // Make sure to import the Hook interface correctly

/**
 * BaseHook is an abstract foundation for implementing various types of hooks.
 * It enforces the implementation of `tap` and `trigger` in subclasses.
 *
 * It also provides utility methods like `size` and `clear` for handler management.
 *
 * @template HandlerFn - The function signature that handlers must conform to.
 * @template RunResult - The resolved result type from the trigger execution.
 */
export abstract class BaseHook<
	HandlerFn extends (...args: any[]) => unknown,
	RunResult = Awaited<ReturnType<HandlerFn>>,
> implements Hook<HandlerFn, RunResult>
{
	/**
	 * Internal storage of handler functions with unique IDs.
	 */
	protected handlers: Map<string, HandlerFn> = new Map();

	/**
	 * Returns the number of currently registered handlers.
	 */
	public get size(): number {
		return this.handlers.size;
	}

	/**
	 * Removes all registered handlers.
	 */
	public clear(): void {
		this.handlers.clear();
	}

	/**
	 * Generates a unique ID for each handler.
	 * This can be used to uniquely identify and manage handlers in the hook.
	 *
	 * @returns A unique string ID.
	 */
	protected generateId(): string {
		return nanoid(); // Generates a unique ID
	}

	/**
	 * Registers a new handler in the hook.
	 * Subclasses must define how handlers are stored and managed.
	 *
	 * @param handler - The handler function to register.
	 * @returns A function to unregister the handler.
	 */
	public abstract tap(handler: HandlerFn): () => void;

	/**
	 * Triggers all registered handlers.
	 * Subclasses define the execution strategy (sequence, concurrent, etc).
	 *
	 * @param args - Arguments to pass to each handler.
	 * @returns A promise resolving to the aggregated result.
	 */
	public abstract trigger(...args: Parameters<HandlerFn>): Promise<RunResult>;
}
