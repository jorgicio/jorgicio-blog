/**
 * Workaround for https://github.com/strapi/strapi/issues/26964 — see vite.config.js,
 * which aliases the bare `prismjs` specifier to this module.
 *
 * The content-manager's code block editor imports `prismjs` and then the
 * `prismjs/components/prism-*` language definitions. Those language files are written for
 * a script-tag world and reference a bare global `Prism` at module scope. Rollup inlines
 * their bodies straight into the chunk, but Prism's core is CommonJS so it gets wrapped in
 * a lazily-invoked `requirePrism()` — which runs *after* them. Nothing has published the
 * global by then, so the chunk throws "Prism is not defined" and the admin renders blank.
 *
 * Standing between the two as a real ES module fixes the ordering: this body is evaluated
 * at its position in the import graph, i.e. before the language definitions are inlined,
 * and it forces Prism's core to initialise and publishes it on `window` for them to find.
 *
 * Remove once Strapi ships a fix — the guard in content-manager's Code.tsx already expects
 * `window.Prism` to have been preloaded, but nothing in the published package does it.
 */

// Deep import so the `prismjs` alias doesn't resolve back to this file.
import Prism from "prismjs/prism.js";

if (typeof window !== "undefined" && !window.Prism) {
  window.Prism = Prism;
}

// The language files mutate `Prism.languages` in place, so these bindings stay live.
export const languages = Prism.languages;
export const tokenize = Prism.tokenize;
export const highlight = Prism.highlight;
export const hooks = Prism.hooks;
export const util = Prism.util;
export const Token = Prism.Token;

export default Prism;
