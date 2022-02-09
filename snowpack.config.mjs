
/** @type {import("snowpack").SnowpackUserConfig } */
const config = {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' },
  },
  alias: {
    Components: './src/components',
    Functions: './src/functions',
    '#': './src/',
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    [
      '@snowpack/plugin-typescript',
      {
        /* Yarn PnP workaround: see https://www.npmjs.com/package/@snowpack/plugin-typescript */
        ...(process.versions.pnp ? { tsc: 'yarn pnpify tsc' } : {}),
      },
    ],
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    knownEntrypoints: ['framer-motion-carousel', 'framesync', 'style-value-types', 'popmotion', 'framer-motion']
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
    jsxInject: '' +
      `const PUBLIC_URL = path => (import.meta.env.SNOWPACK_PUBLIC_API_URL ?? '/') + path\n` +
      `import React, { Fragment } from 'react'`
  },
};

export default config;
