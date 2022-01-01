# Anvil

A set of tools you can use to bootstrap a fast, stable, and future-proof web application.

## What does Anvil include?

- [SvelteKit](https://kit.svelte.dev)
  - Framework for building web apps
- [Tailwind CSS](https://tailwindcss.com)
  - Utility class-based CSS
- [TypeScript](http://typescriptlang.org)
  - Type-safe JavaScript code
- [Fastify](https://www.fastify.io)
  - Tried & tested web server framework
- [Prisma](https://www.prisma.io)
  - Database ORM, and much more

## How to use Anvil?

Anvil is just a generator, so all you have to do is run the generation script through npx.

    npx create-anvil-app my-app

### Output

```
├── client
│   ├── node_modules
│   ├── README.md
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.cjs
│   ├── src
│   │   ├── app.html
│   │   ├── global.d.ts
│   │   ├── routes
│   │   │   ├── __layout.svelte
│   │   │   └── index.svelte
│   │   └── styles
│   │       └── tailwind.css
│   ├── static
│   │   └── favicon.png
│   ├── svelte.config.js
│   ├── tailwind.config.cjs
│   └── tsconfig.json
└── server
    ├── node_modules
    ├── index.ts
    ├── package-lock.json
    ├── package.json
    ├── prisma
    │   └── schema.prisma
    └── tsconfig.json
```
