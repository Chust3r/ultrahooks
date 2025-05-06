import { HookBuilder } from '~core/builder'
import type { Hook } from '~types/hooks'

/**
 * Creates a typed collection of plugin hooks using a builder pattern.
 *
 * This utility simplifies the creation and registration of custom hooks
 * (e.g., sequence, concurrent, pipeline, race, emit, etc.) for plugin systems
 * or extensible architectures.
 *
 * @template Hooks - A record where each key represents the name of a hook,
 *                   and the value is a typed Hook instance.
 *
 * @param factory - A function that receives a `HookBuilder` instance and
 *                  returns an object containing named hooks.
 *
 * @returns The resulting object containing the created hooks.
 *
 * @example
 * const hooks = createHooks((h) => ({
 *   onInit: h.sequence<string>(),  // Handles a sequence of async operations
 *   onExit: h.emit<void>(),         // Fires an event without waiting for results
 * }))
 *
 * hooks.onInit.tap(async () => 'ready')
 * hooks.onExit.tap(() => console.log('Exiting...'))
 */
export function createHooks<
	Hooks extends Record<string, Hook<(...args: unknown[]) => unknown, unknown>>
>(factory: (builder: HookBuilder) => Hooks): Hooks {
	const builder = new HookBuilder()
	return factory(builder)
}
