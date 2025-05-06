export interface Hook<
	HandlerFn extends (...args: unknown[]) => unknown = () => unknown,
	RunResult = ReturnType<HandlerFn>[]
> {
	tap(handler: HandlerFn): () => void
	trigger(...args: Parameters<HandlerFn>): Promise<RunResult>
}

export type SequenceHookHandler<T = unknown> = () => Promise<T>
