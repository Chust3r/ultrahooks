# ⚡ UltraHooks

**An extensible, strongly-typed, asynchronous, and declarative hook system.** Designed for modern architectures based on plugins, reactive flows, and dynamic pipelines.

---

## 🎯 Objective

UltraHooks allows you to define, execute, and extend execution flows through a system of **100% asynchronous hooks**, supporting mutable context, condition control, priorities, and optional reactivity.

---

## ✅ Features

-  ✨ Declarative API with strict TypeScript typing.
-  🔁 Fully asynchronous hooks.
-  🧠 Mutable, reactive, and typed context.
-  🪝 Multiple types of hooks (`sequence`, `concurrent`, `pipeline`, `race`, `event`, etc.).
-  🧩 Framework-agnostic: does not depend on any particular framework.
-  🧬 Conditionals and priorities (`when`, `stage`).
-  🔌 Support for plugins and advanced composition.
-  🧪 Tested and ready for Node, Bun, Deno, and frontend environments.

---

## 📦 Technologies

-  Strict [`TypeScript`](https://www.typescriptlang.org/).
-  Optional reactivity with [`nanostores`](https://github.com/nanostores/nanostores), [`zustand`](https://github.com/pmndrs/zustand), or custom solutions.
-  ESM-first, compatible with Bun, Node.js, and modern browsers.

---

## 🚧 Roadmap

| Version | Description                                                                |
| ------- | -------------------------------------------------------------------------- |
| v1.0    | Base implementation: `sequence`, `concurrent`, `pipeline`, `race`, `event` |
| v1.1    | Declarative API with generic typing and mutable `ctx`                      |
| v1.2    | Advanced hooks: `compose`, `timeout`, `guard`, `retry`                     |
| v1.3    | Support for `stage`, `when`, introspection, middleware                     |
| v1.4    | Plugins (`usePlugin`), runtime DSL, fallback hooks                         |
| Future  | Devtools, execution visualizer, environment integration (e.g., `vite`)     |

---

## 🧭 Hook Declaration

```ts
import {
	sequence,
	concurrent,
	pipeline,
	race,
	event,
	createHooks,
} from 'ultrahooks'

const hooks = createHooks({
	onInit: sequence(),
	onPlugins: concurrent(),
	onTransform: pipeline<{ input: string }>(),
	onShouldExit: race<boolean>(),
	onLoad: event(),
})
```

# 🧠 Hook Types

## Basic Hooks

| Hook         | Method            | Description                                                                                     |
| ------------ | ----------------- | ----------------------------------------------------------------------------------------------- |
| `sequence`   | `h.sequence()`    | Executes handlers sequentially, ensuring each runs one after the other.                         |
| `concurrent` | `h.concurrent()`  | Executes all handlers in parallel, without waiting for any to finish.                           |
| `pipeline`   | `h.pipeline<T>()` | Passes a value through a series of transformations, each step modifying the data.               |
| `race`       | `h.race<T>()`     | Executes all handlers and resolves with the first one to finish successfully.                   |
| `event`      | `h.event()`       | Notifies listeners without returning any result. Useful for triggering actions or side-effects. |

## Advanced Hooks

| Hook      | Method           | Description                                                                                 |
| --------- | ---------------- | ------------------------------------------------------------------------------------------- |
| `compose` | `h.compose<T>()` | Chain multiple hooks together, ensuring their order of execution is maintained.             |
| `retry`   | `h.retry<T>()`   | Attempts to re-run a handler a specified number of times in case of failure.                |
| `guard`   | `h.guard(fn)`    | Executes a handler only if a specified condition is true. Useful for conditional execution. |
| `timeout` | `h.timeout(ms)`  | Cancels a handler if it exceeds the specified time limit.                                   |
| `batch`   | `h.batch()`      | Groups handlers together, running them in a single batch for more efficient execution.      |

---

# 🧪 Execution

````ts
await hooks.onInit.run()

const transformed = await hooks.onTransform.run({ input: 'hello' })

const shouldExit = await hooks.onShouldExit.run(true)```
````

## 💡 Use Cases

-  Modular frameworks and plugin-based architectures
-  Data transformation pipelines (e.g., files, data)
-  Task automation (e.g., CLI, backend)
-  Microservices with decoupled logic
-  Dynamic project extension

---

## 🧬 Final API

```ts
const hooks = createHooks((hook) => ({
	onInit: hook.sequence(),
	onLoadPlugins: hook.concurrent(),
	onCompile: hook.pipeline<{ code: string }>(),
	onValidate: hook.race<boolean>(),
	onCleanup: hook.sequence(),
	onRun: hook.compose(),
}))
```
