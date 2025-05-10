import type { Hook } from "~types/hooks";

/**
 * Creates a collection of typed plugin hooks using a declarative factory pattern.
 *
 * This function allows you to define custom hooks by directly instantiating them
 * using factory functions like `sequence()`, `concurrent()`, `pipeline()`, etc.
 *
 * @template Hooks - An object where each key is the name of a hook, and the value is a Hook instance.
 *
 * @param hooks - An object mapping hook names to hook instances (e.g., created with `sequence()`).
 *
 * @returns The object with typed hooks, ready to be tapped and triggered.
 *
 * @example
 * import { sequence, emit } from '~core/hooks'
 * import { createHooks } from '~core/createHooks'
 *
 * const hooks = createHooks({
 *   onInit: sequence<string>(),   // Executes handlers in order
 *   onExit: emit<void>(),         // Triggers an event with no result
 * })
 *
 * hooks.onInit.tap(async () => 'ready')
 * hooks.onExit.tap(() => console.log('Exiting...'))
 */
export function createHooks<
	Hooks extends Record<string, Hook<(...args: any[]) => unknown, unknown>>,
>(hooks: Hooks): Hooks {
	return hooks;
}
