export interface Hook<
	HandlerFn extends (...args: any[]) => unknown = () => unknown,
	RunResult = Awaited<ReturnType<HandlerFn>>,
> {
	tap(handler: HandlerFn): () => void;
	trigger(...args: Parameters<HandlerFn>): Promise<RunResult>;
}

export type SequenceHookHandler<T = unknown> = () => Promise<T>;

export type ConcurrentHookHandler<T = unknown> = () => Promise<T>;

export type PipelineHookHandler<T = unknown> = (value: T) => Promise<T>;

export type RaceHookHandler<T = unknown> = () => Promise<T>;
