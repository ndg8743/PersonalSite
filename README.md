# Personal Site Template

A clean, minimal personal portfolio site with interactive particle effects and dark/light theme switching. Built with React + TypeScript, containerized with Docker, and ready to deploy behind Traefik.

**Live Site**: [gopee.dev](https://gopee.dev)

## Quick Start

```bash
npm install          # Install dependencies
npm start            # Start dev server at http://localhost:3000
```

## Make It Yours

Edit these files to personalize the template:

| File                          | What to change                             |
| ----------------------------- | ------------------------------------------ |
| `src/App/config.tsx`          | Your name, title, GitHub URL, LinkedIn URL |
| `src/constants/contact.ts`    | Your email address                         |
| `public/Resume.pdf`           | Your resume                                |
| `public/index.html`           | Page title, meta tags, Open Graph info     |
| `public/manifest.webmanifest` | Site name (for PWA/bookmarks)              |
| `public/icons/favicon.svg`    | Your favicon                               |
| `docker-compose.yml`          | Your domain (replace `gopee.dev`)          |
| `src/components/Footer.tsx`   | Footer name, link, source repo URL         |

Every line you need to change is marked with a `CHANGE THIS` comment.

## Project Structure

```
├── src/
│   ├── App/
│   │   ├── App.tsx              # Root component — assembles the page
│   │   ├── App.scss             # Global styles (SCSS)
│   │   ├── AppContext.tsx        # React Context provider for theme state
│   │   └── config.tsx            # Your personal info — edit this first!
│   ├── components/
│   │   ├── Buttons.tsx           # Social link buttons (GitHub, LinkedIn, etc.)
│   │   ├── Content.tsx           # Main content layout
│   │   ├── Footer.tsx            # Page footer with creator credit
│   │   ├── Particles.tsx         # tsParticles interactive background
│   │   ├── PdfViewer.tsx         # Inline resume PDF viewer
│   │   └── Toggle.tsx            # Dark/light theme switch
│   ├── appearance/
│   │   ├── index.ts              # Re-exports for clean imports
│   │   ├── options.ts            # tsParticles config (particle behavior)
│   │   └── themes.ts             # Dark/light theme color definitions
│   ├── constants/
│   │   └── contact.ts            # Contact info — edit this!
│   ├── icons/                    # SVG icon components (Email, GitHub, etc.)
│   ├── types/                    # TypeScript interfaces
│   ├── Index.test.tsx            # Integration tests
│   ├── index.tsx                 # App entry point
│   └── setupTests.ts             # Jest/Testing Library setup
├── public/
│   ├── icons/favicon.svg         # Favicon
│   ├── index.html                # HTML template with meta/OG tags
│   ├── manifest.webmanifest      # PWA manifest
│   └── Resume.pdf                # Your resume — replace this!
├── Dockerfile                    # Multi-stage build (Node → Nginx)
├── docker-compose.yml            # Production config with Traefik
├── nginx.conf                    # Web server config
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript compiler options
├── eslint.config.mjs             # ESLint flat config
└── README.md                     # You are here
```

## How Docker Works

When you run `npm run docker`, here's what happens step by step:

1. **`docker compose up -d --build`** tells Docker to build the image and start the container in the background
2. **Stage 1 (Dockerfile):** A Node.js Alpine container installs dependencies with `npm ci` and runs `npm run build`, compiling your React/TypeScript app into static HTML, CSS, and JS files
3. **Stage 2 (Dockerfile):** Those static files are copied into a tiny Nginx Alpine container (~10MB RAM vs ~100MB for Node)
4. **Nginx** serves your site on port 80 inside the container, handling client-side routing, gzip compression, caching, and security headers
5. **Traefik** (configured separately on your server) handles HTTPS certificates via Let's Encrypt and proxies traffic to the container

The multi-stage build means your final container has no Node.js, no `node_modules`, and no source code — just the compiled site and Nginx. The `docker-compose.yml` also configures:

- **Read-only filesystem** with tmpfs mounts for Nginx's runtime dirs
- **Resource limits** (1 CPU, 512MB RAM max)
- **Log rotation** (10MB max, 3 files)
- **No-new-privileges** security option

## Deploy to Production

1. Set up [Traefik](https://doc.traefik.io/traefik/) on your server with a `traefik-public` Docker network
2. In `docker-compose.yml`, replace every `gopee.dev` with your domain (marked with `CHANGE THIS`)
3. Run `npm run docker` on your server

Traefik will automatically provision Let's Encrypt SSL certificates for your domain.

## Tech Stack

### Runtime Dependencies

| Library               | Version | What it does                                                                                           |
| --------------------- | ------- | ------------------------------------------------------------------------------------------------------ |
| **React**             | 19      | UI framework — builds the component tree, handles state, and renders the page                          |
| **React DOM**         | 19      | React's browser renderer — translates React components into actual DOM elements                        |
| **react-tsparticles** | 1.x     | Renders the interactive particle background animation using HTML5 Canvas                               |
| **styled-components** | 6.x     | CSS-in-JS library — lets you write CSS inside your components with template literals, supports theming |

### Dev Dependencies

| Library                             | Version | What it does                                                                                              |
| ----------------------------------- | ------- | --------------------------------------------------------------------------------------------------------- |
| **TypeScript**                      | 4.9     | Adds static types to JavaScript — catches bugs at compile time, enables autocompletion                    |
| **react-scripts**                   | 5.x     | Create React App's build toolchain — bundles Webpack, Babel, Jest, and dev server into one package        |
| **SASS**                            | 1.x     | CSS preprocessor — adds variables, nesting, and mixins to stylesheets (used for `App.scss`)               |
| **ESLint**                          | 9.x     | JavaScript/TypeScript linter — finds code quality issues and enforces consistent style                    |
| **@eslint/js**                      | 9.x     | ESLint's official recommended JavaScript rules                                                            |
| **typescript-eslint**               | 8.x     | ESLint plugin that adds TypeScript-specific linting rules                                                 |
| **eslint-plugin-perfectionist**     | 4.x     | ESLint plugin that auto-sorts imports, object keys, and other lists alphabetically                        |
| **Prettier**                        | 3.x     | Opinionated code formatter — handles indentation, quotes, semicolons, line width                          |
| **Stylelint**                       | 16.x    | CSS/SCSS linter — catches errors and enforces conventions in stylesheets                                  |
| **stylelint-config-standard-scss**  | 14.x    | Stylelint preset with standard SCSS rules                                                                 |
| **stylelint-config-prettier-scss**  | 1.x     | Disables Stylelint rules that conflict with Prettier                                                      |
| **Husky**                           | 9.x     | Git hooks manager — runs scripts automatically on git events (commit, push, checkout)                     |
| **lint-staged**                     | 15.x    | Runs linters only on staged files — keeps commits clean without linting the whole project                 |
| **@commitlint/cli**                 | 19.x    | Validates commit messages follow [Conventional Commits](https://www.conventionalcommits.org/) format      |
| **@commitlint/config-conventional** | 19.x    | Commitlint preset — enforces `feat:`, `fix:`, `docs:`, etc. prefixes                                      |
| **@testing-library/react**          | 16.x    | Testing utilities for React — renders components and queries the DOM the way a user would                 |
| **@testing-library/jest-dom**       | 6.x     | Custom Jest matchers for DOM assertions (`toBeVisible`, `toHaveTextContent`, etc.)                        |
| **@testing-library/user-event**     | 14.x    | Simulates real user interactions (clicks, typing) in tests                                                |
| **@types/jest**                     | 29.x    | TypeScript type definitions for Jest's API                                                                |
| **@types/node**                     | 22.x    | TypeScript type definitions for Node.js built-in modules                                                  |
| **@types/react**                    | 19.x    | TypeScript type definitions for React                                                                     |
| **@types/react-dom**                | 19.x    | TypeScript type definitions for React DOM                                                                 |
| **jest-canvas-mock**                | 2.x     | Mocks the HTML5 Canvas API in tests — needed because tsParticles uses Canvas and jsdom doesn't support it |

### Infrastructure

| Tool               | What it does                                                                                                     |
| ------------------ | ---------------------------------------------------------------------------------------------------------------- |
| **Docker**         | Containerization — packages the app and its runtime into a portable image                                        |
| **Docker Compose** | Multi-container orchestration — defines how to build and run the container with one command                      |
| **Nginx**          | Web server — serves static files, handles gzip, caching, security headers, and React Router fallback             |
| **Traefik**        | Reverse proxy — handles HTTPS/TLS certificates (Let's Encrypt), routing, rate limiting, and security middlewares |

### CI/CD & Git Hooks

| Tool                          | Trigger        | What it does                                                                  |
| ----------------------------- | -------------- | ----------------------------------------------------------------------------- |
| **GitHub Actions** (`ci.yml`) | Push / PR      | Runs `npm ci`, checks for duplicate dependencies, runs tests                  |
| **Husky pre-commit**          | `git commit`   | Runs lint-staged (ESLint + Prettier + Stylelint on staged files)              |
| **Husky commit-msg**          | `git commit`   | Validates commit message format via commitlint                                |
| **Husky post-checkout**       | `git checkout` | Runs `nvm install` and `npm install` to sync dependencies after branch switch |

### Config Files

| File                | What it configures                                                             |
| ------------------- | ------------------------------------------------------------------------------ |
| `tsconfig.json`     | TypeScript compiler — sets `src/` as base URL for imports, enables strict mode |
| `eslint.config.mjs` | ESLint flat config — combines JS, TypeScript, and perfectionist rule sets      |
| `.prettierrc.mjs`   | Prettier — single quotes                                                       |
| `.stylelintrc.mjs`  | Stylelint — standard SCSS rules + Prettier compat                              |
| `.commitlintrc.mjs` | Commitlint — conventional commits, 65-char header limit                        |
| `.lintstagedrc.mjs` | lint-staged — which linters run on which file types                            |
| `.editorconfig`     | Editor settings — UTF-8, 2-space indent, LF line endings                       |
| `.nvmrc`            | Node version — tells nvm/CI which Node.js version to use (`lts/*`)             |
| `.dockerignore`     | Docker build context — excludes node_modules, tests, IDE files from the image  |

## Available Commands

| Command                 | Description                                         |
| ----------------------- | --------------------------------------------------- |
| `npm start`             | Start development server at `http://localhost:3000` |
| `npm run build`         | Build production bundle to `/build`                 |
| `npm test`              | Run tests in watch mode                             |
| `npm run test:coverage` | Run tests with coverage report                      |
| `npm run lint`          | Lint and auto-fix with ESLint                       |
| `npm run format`        | Format all files with Prettier                      |
| `npm run docker`        | Build Docker image and start container              |

## License

[MIT](LICENSE)
