# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js 15 App Router project. Application routes live in `src/app`, shared React components in `src/components`, Prismic client setup in `src/prismicio.ts`, and checkout logic in `src/checkout.ts`. Prismic slices are organized under `src/slices/<SliceName>` with `index.tsx`, `model.json`, `mocks.json`, and screenshots. Custom Prismic type definitions live in `customtypes/`. Static assets, including GLTF/BIN models, HDR files, textures, and switch sounds, live in `public/`.

## Build, Test, and Development Commands

- `npm run dev`: start the local Next.js dev server with Turbopack.
- `npm run build`: create a production build and run Next.js build-time checks.
- `npm run start`: serve the production build locally.
- `npm run lint`: run the configured Next.js ESLint rules.
- `npm run slicemachine`: start Slice Machine for editing Prismic models and slices.

Use `npm install` to install dependencies from `package-lock.json`; keep the lockfile committed when dependencies change.

## Coding Style & Naming Conventions

Use TypeScript and React function components. Keep component and slice filenames in PascalCase directories or files, such as `src/components/Navbar.tsx` and `src/slices/PurchaseButton/index.tsx`. Use the `@/*` import alias for paths under `src` when it improves readability. Follow the existing Tailwind CSS style in JSX, and let Prettier with `prettier-plugin-tailwindcss` order utility classes. ESLint extends `next/core-web-vitals` and `next/typescript`; fix lint findings before submitting changes.

## Testing Guidelines

There is currently no project test runner or first-party test directory. For now, validate changes with `npm run lint` and `npm run build`. When adding tests, colocate them near the code they cover or use a top-level `tests/` directory, and name files with `.test.ts` or `.test.tsx`. Prefer focused component and integration tests for interactive UI, checkout behavior, and Prismic slice rendering.

## Commit & Pull Request Guidelines

The current Git history uses short, imperative-style summaries such as `Update dependencies` and `Initial commit`. Keep commit messages concise and action-oriented. Pull requests should include a clear description, testing notes with commands run, linked issues when relevant, and screenshots or short recordings for visible UI changes, especially 3D scenes, animations, Slice Machine updates, and responsive layout changes.

## Security & Configuration Tips

Do not commit secrets or local environment files. Keep Stripe and Prismic credentials in environment variables. Treat large assets in `public/` carefully: optimize textures, models, and sounds before committing, and avoid replacing generated Prismic type files unless Slice Machine or Prismic schema changes require it.
