export const TW_CSS_TEMPLATE = `@tailwind base;
@tailwind components;
@tailwind utilities;`

export const TW_POSTCSS_TEMPLATE = `module.exports = {
  plugins: {
    autoprefixer: {},
    tailwindcss: {},
  },
}`

export const LAYOUT_ROUTE_TEMPLATE = `<script>
  import "../styles/tailwind-output.css";
</script>

<slot />`

export const CLIENT_SCRIPTS_TEMPLATE = {
  package: 'svelte-kit package',
  check: 'svelte-check --tsconfig ./tsconfig.json',
  'check:watch': 'svelte-check --tsconfig ./tsconfig.json --watch',
  lint: 'prettier --ignore-path .gitignore --check --plugin-search-dir=. . && eslint --ignore-path .gitignore .',
  format: 'prettier --ignore-path .gitignore --write --plugin-search-dir=. .',
  'dev:only': 'svelte-kit dev',
  'build:only': 'svelte-kit build',
  preview: 'svelte-kit preview',
  'tailwind:watch':
    'cross-env TAILWIND_MODE=watch cross-env NODE_ENV=development postcss src/styles/tailwind.css -o src/styles/tailwind-output.css -w',
  'tailwind:build':
    'cross-env TAILWIND_MODE=build cross-env NODE_ENV=production postcss src/styles/tailwind.css -o src/styles/tailwind-output.css',
  dev: 'concurrently "yarn run dev:only" "yarn run tailwind:watch"',
  build: 'yarn run tailwind:build && yarn run build:only',
}

export const TW_CONFIG_TEMPLATE = `module.exports = {
  content: ["./src/**/*.svelte"],
  darkMode: "media",
  theme: {
    extend: {},
  },
  plugins: [],
}`

export const ENVIRONMENT_VARS_TEMPLATE = `VITE_BASE_API_URL=http://localhost:5000`
