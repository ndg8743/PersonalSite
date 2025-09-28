# Nathan Gopee - Personal Website

A modern, minimalist personal portfolio website with interactive particle effects and dark/light theme switching.

**Live Site**: [gopee.dev](https://gopee.dev)

## Tech Stack

- **React 19** with TypeScript
- **Styled Components** for styling
- **React TSParticles** for interactive background
- **SASS** for additional styling
- **React Testing Library** for testing

## Features

- Interactive particle background
- Dark/Light theme toggle with persistence
- Fully responsive design
- WCAG 2.1 accessibility compliant
- Modern UI with smooth animations

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
npm run setup

# Start development server
npm start
```

## Environment Variables

The project uses environment variables to store sensitive information.
Copy `.env.example` to `.env` and update the values:

```bash
# Copy example env file (also available as npm run setup)
cp .env.example .env
```

Available environment variables:

| Variable                | Description                         |
| ----------------------- | ----------------------------------- |
| REACT_APP_CONTACT_EMAIL | Email address displayed on the site |

## Docker Deployment

```bash
# Build the Docker image
npm run docker:build

# Start the Docker container
npm run docker:up

# Restart the Docker container (e.g., after configuration changes)
npm run docker:restart

# Build for production
npm run build

# Run tests
npm test
```

The site will be available at `http://localhost:3000`

## Deployment

Built and deployed to [gopee.dev](https://gopee.dev) using modern web hosting.
