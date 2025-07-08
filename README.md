# User Task Dashboard

## SETUP INSTRUCTIONS

- `npm install -g pnpm` to install pnpm globally.
- `pnpm i` to install all the dependencies.
- `pnpm dev` to start the development server.

## Tech used
- Nextjs app directory
- Typescript, TailwindCSS
- Shadcn/ui
- Pnpm as package manager
- Redux toolkit + RTK Query 
- Jest/React-testing-library for testing

## File structure and naming conventions
- all files in lower-camel-case or kebab-case (eg: todo-slice.ts)
- src/lib/features for Redux Slices
- src/lib/services for RTK Query api's
- src/types for type-defintions
- src/hooks for custom hooks
- index.d.ts for global utility types and modules declaration
