# ⚡ UltraHooks

**Sistema de hooks asíncronos, extensibles, tipados y declarativos.** Diseñado para arquitecturas modernas basadas en plugins, flujos reactivos y pipelines dinámicos.

---

## 🎯 Objetivo

UltraHooks permite definir, ejecutar y extender flujos de ejecución a través de un sistema de **hooks 100% asíncronos**, con soporte para contexto mutable, control de condiciones, prioridades y reactividad opcional.

---

## ✅ Características

-  ✨ API declarativa con tipado estricto en TypeScript.
-  🔁 Hooks completamente asíncronos.
-  🧠 Contexto mutable, reactivo y tipado.
-  🪝 Múltiples tipos de hooks (async, parallel, waterfall, bail, etc.).
-  🧩 Agnóstico: no depende de ningún framework.
-  🧬 Condicionales y prioridades (`when`, `stage`).
-  🔌 Soporte para plugins y composición avanzada.
-  🧪 Probado y preparado para entornos Node, Bun, Deno y frontend.

---

## 📦 Tecnologías

-  [`TypeScript`](https://www.typescriptlang.org/) estricto.
-  Reactividad opcional con [`nanostores`](https://github.com/nanostores/nanostores), [`zustand`](https://github.com/pmndrs/zustand) o personalizado.
-  ESM-first, compatible con Bun, Node.js y navegadores modernos.

---

## 🚧 Roadmap

| Versión | Descripción                                                                 |
| ------- | --------------------------------------------------------------------------- |
| v0.1    | Implementación base: `async`, `parallel`, `waterfall`, `bail`, `event`      |
| v0.2    | API declarativa con tipado genérico y `ctx` mutable                         |
| v0.3    | Hooks avanzados: `compose`, `sequence`, `timeout`, `guard`, `race`          |
| v0.4    | Soporte para `stage`, `when`, introspección, middleware                     |
| v0.5    | Plugins (`usePlugin`), runtime DSL, fallback hooks                          |
| Future  | Devtools, visualizador de ejecución, integración con entornos (`vite`, etc) |

---

## 🧭 Declaración de Hooks

### Declarativa (recomendada)

```ts
import { createHooks } from 'ultrahooks'

const hooks = createHooks<AppCtx>((h) => ({
	onInit: h.async(),
	onPlugins: h.parallel(),
	onTransform: h.waterfall<{ input: string }>(),
	onShouldExit: h.bail<boolean>(),
	onLoad: h.event(),
}))
```

## Por objeto (alternativa)

```ts
import {
	async,
	parallel,
	waterfall,
	bail,
	event,
	createHooks,
} from 'ultrahooks'

const hooks = createHooks<AppCtx>({
	onInit: async(),
	onPlugins: parallel(),
	onTransform: waterfall<{ input: string }>(),
	onShouldExit: bail<boolean>(),
	onLoad: event(),
})
```

## 🧠 Tipos de Hooks

### Básicos

| Hook        | Método             | Descripción                                                    |
| ----------- | ------------------ | -------------------------------------------------------------- |
| `async`     | `h.async()`        | Ejecuta handlers en serie.                                     |
| `parallel`  | `h.parallel()`     | Ejecuta todos en paralelo.                                     |
| `waterfall` | `h.waterfall<T>()` | Pasa valor y lo transforma secuencialmente.                    |
| `bail`      | `h.bail<T>()`      | Retorna el primer resultado no `undefined` y cancela el resto. |
| `map`       | `h.map<T>()`       | Ejecuta todos y retorna un array con los resultados.           |
| `event`     | `h.event()`        | Notifica sin retornar resultados.                              |

### Avanzados

| Hook       | Método           | Descripción                                           |
| ---------- | ---------------- | ----------------------------------------------------- |
| `compose`  | `h.compose<T>()` | Composición encadenada de múltiples hooks.            |
| `sequence` | `h.sequence()`   | Flujo por etapas con posibilidad de anidar hooks.     |
| `guard`    | `h.guard(fn)`    | Ejecuta solo si la condición se cumple.               |
| `timeout`  | `h.timeout(ms)`  | Descarta handlers que superen el tiempo definido.     |
| `race`     | `h.race<T>()`    | Ejecuta todos y resuelve con el primero en finalizar. |

---

## 🧩 Contexto Mutable & Reactivo

```ts
type AppCtx = {
	env: 'dev' | 'prod'
	config: Store<{ debug: boolean }>
}

hooks.onInit.use(async (ctx) => {
	if (ctx.env === 'dev') ctx.config.set({ debug: true })
})
```

El `ctx` es completamente tipado y puede incluir objetos reactivos si lo necesitas.
También puedes usar módulos personalizados para manejar reactividad.

## 🎛️ Prioridad y Condiciones

```ts
hooks.onInit.use(
	async (ctx) => {
		// Handler prioritario
	},
	{ stage: 10 }
)

hooks.onInit.use(
	async (ctx) => {
		// Solo si estamos en producción
	},
	{ when: (ctx) => ctx.env === 'prod' }
)
```

## 🧪 Ejecución

```ts
await hooks.onInit.run(ctx)

const transformed = await hooks.onTransform.run({ input: 'hola' })

const shouldExit = await hooks.onShouldExit.run(true)
```

## 💡 Casos de Uso

-  Frameworks modulares y basados en plugins

-  Pipelines de transformación (archivos, datos)

-  Automatización de tareas (CLI, backend)

-  Microservicios con lógica desacoplada

-  Extensión dinámica de proyectos

## 🧬 API Final (Ejemplo completo)

```ts
const hooks = createHooks<AppCtx>((hook) => ({
	onInit: hook.async(),
	onLoadPlugins: hook.parallel(),
	onCompile: hook.waterfall<{ code: string }>(),
	onValidate: hook.bail<boolean>(),
	onCleanup: hook.sequence(),
	onRun: hook.compose(),
}))
```

## 🧪 Inspiraciones

-  Tapable (Webpack)

-  Hookable (Nuxt)

-  unplugin / vite-plugin

-  modern-event-emitter

-  RxJS (conceptualmente)

-  Astro / Vite plugin APIs
