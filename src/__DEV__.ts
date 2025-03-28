// propagate React Native commonly used __DEV__ global var to globalThis so it's available in all environments
// including Next.js with Turbopack as it's not yet possible to inject __DEV__ using turbopack config
globalThis.__DEV__ = process.env.NODE_ENV !== "production";
