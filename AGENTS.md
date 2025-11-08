# Project Overview

This project is a personal web application that displays charts of my game playing data, such as game name, totoal play time, play status, etc. It is built using Next.js with TypeScript support, and with Server Side Rendering and Cache Components enabled.

## Folder Structure

- `/`: The root folder, contains project overall configurations. We use `src` folder as the application source code root folder.
- `src`: Contains all of the source code. Do not put source code outside this folder.
- `src/app`: Contains the source code for the Next.js App Router.
- `src/components`: Contains the source code for the Next.js (React) components.
- `src/lib`: Contains the source code for non-UI logic.
- `public`: Contains static assets to be served.

## Libraries and Frameworks

- Next.js (App Router) with server and client components
- Next.js v16 recently introduced Cache Components
- TypeScript for type safety
- Tailwind CSS v4 for styling
- HeroUI v2.8.5 for the components library
- Recharts for the charting library
- motion (framer-motion) for animation
- `pnpm` for package management

## Coding Standards

- Do not use semicolons at the end of each statement.
- Use double quotes for strings.
- Use 2 whitespaces for indentation.
- Always add dangling comma at the end if necessary.
- Avoid using `any` as a type declaration.
- Use absolute importing style. For example, use `@/lib/utils` instead of `../../lib/utils`, the `@` stands for `src` directory.
- Use `<Suspense>` to wrap components that need to perform data fetching.
- Always fetch data on server components, do not expose remote DB server URL and secrets to client.

## Build and Test Commands

- `pnpm run dev`: 
- `pnpm run build`: Build the project.

## Styling

- Use Tailwind CSS with consistent color palette.
- Use responsive design patterns.
- Application should support switching between light and dark mode.
- Application should have a modern and clean design.
- Maintain semantic HTML structure.
- Application should contains rich CSS animation effects.

## Error Handling

- Implement proper error boundaries in React components.
- Always log errors with contextual information.
