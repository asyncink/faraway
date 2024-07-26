# App for Faraway Studio Hiring Process

### Features

- List all Star Wars characters with a short summary.
- View full information about a specific character on its page.
- Edit the name of a character locally.
- Ensure all changes are consistent between the client and API (data refetch will preserve local names) via Indexed DB.
- Avoid redundant fetches — all data is stored in Mobx, and fetches won't be triggered if the data has been previously fetched.
- Dark and light themes
- Mobile and desktop screens

### Tech Stack

- TypeScript
- React — core library
- Next.js — core framework
- Mobx — state manager
- Mantine — components
- Feather — icons

### Tooling and conventions

- Conventional Commits
- PostCSS and CSS-modules
- ESLint
- Stylelint
- Prettier
- Yarn

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
