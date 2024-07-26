# App for Faraway Studio Hiring Process

### Features

- List all Star Wars characters with a short summary
- View full information about a specific character on its page
- Edit the name of a character locally
- All changes are consistent between the client and API via Indexed DB
- Data refetches will preserve local names
- No redundant fetches if the data has been previously fetched
- Dark and light color scheme
- Support for mobile and desktop screens

App is deployed on https://faraway-zeta.vercel.app. The code was written in 5 hours, so there are several potential refactorings and features that could be added. Please keep this in mind.

### Tech Stack

- TypeScript
- React — core library
- Next — core framework
- MobX — state management
- Indexed DB — persistent client storage
- Mantine — components
- Feather — icons

### Tooling and conventions

- PostCSS and CSS-modules
- ESLint
- Stylelint
- Prettier
- Yarn
- Conventional Commits

### Commands

- Install deps

  ```sh
  yarn lint
  ```

- Run locally

  ```sh
  yarn start
  ```

- Lint

  ```sh
  yarn lint
  ```

- Format

  ```sh
  yarn format
  ```

- Static type check

  ```sh
  yarn typecheck
  ```

- Analyze build size

  ```sh
  yarn analyze
  ```
