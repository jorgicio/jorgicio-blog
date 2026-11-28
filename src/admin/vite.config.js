'use strict';

const path = require('path');

/**
 * Workaround for https://github.com/strapi/strapi/issues/26964.
 *
 * Strapi's dev server pre-bundles `prismjs` and its language files with esbuild. The language
 * files reference a bare global `Prism`, but esbuild wraps Prism's CommonJS core in a lazily
 * invoked `requirePrism()`, so the global does not exist when the language files execute. The
 * admin then throws "Prism is not defined" and renders a blank page.
 *
 * The production Rollup build is not affected (module ordering is different), so everything
 * here is scoped to `serve`.
 */
module.exports = (config) => {
  // Point the bare `prismjs` specifier at a shim that publishes `window.Prism` and re-exports
  // Prism's API. The regex keeps this to the bare specifier, so subpath imports such as
  // `prismjs/components/prism-*` and the shim's own `prismjs/prism.js` still resolve normally.
  const prismShim = {
    find: /^prismjs$/,
    replacement: path.join(__dirname, '..', '..', 'prism-global.js'),
  };

  const existingAlias = config.resolve?.alias ?? {};
  const alias = Array.isArray(existingAlias)
    ? [prismShim, ...existingAlias]
    : [
        prismShim,
        ...Object.entries(existingAlias).map(([find, replacement]) => ({ find, replacement })),
      ];

  // Vite splits the language definitions into a separate chunk, so the alias alone does not
  // guarantee they run after the core. Loading the shim as its own module before the generated
  // admin entry makes `window.Prism` available by the time the language files execute.
  const base = (config.base || '/admin').replace(/\/+$/, '');
  const prismBootstrapPlugin = {
    name: 'strapi-prism-global-bootstrap',
    apply: 'serve',
    transformIndexHtml(html) {
      const appEntry = /<script type="module" src="([^"]*\.strapi\/client\/app\.js)"><\/script>/;

      if (!appEntry.test(html)) {
        this.warn('Could not find the admin app entry; prismjs shim was not injected.');
        return html;
      }

      return html.replace(
        appEntry,
        `<script type="module" src="${base}/prism-global.js"></script>\n    $&`
      );
    },
  };

  return {
    ...config,
    resolve: {
      ...config.resolve,
      alias,
    },
    plugins: [...(config.plugins ?? []), prismBootstrapPlugin],
  };
};
