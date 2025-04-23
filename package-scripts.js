/**
 * This file contains unified scripts for running both frontend and backend
 */

module.exports = {
  scripts: {
    // Development scripts
    dev: {
      frontend: "vite",
      backend: "cd nest-src && npm run start:dev",
      default: 'concurrently "npm run dev:frontend" "npm run dev:backend"',
    },

    // Build scripts
    build: {
      frontend: "tsc && vite build",
      backend: "cd nest-src && npm run build",
      default: "npm run build:frontend && npm run build:backend",
    },

    // Start scripts
    start: {
      frontend: "vite preview",
      backend: "cd nest-src && npm run start:prod",
      default: 'concurrently "npm run start:frontend" "npm run start:backend"',
    },

    // Database scripts
    db: {
      create: "cd nest-src && npm run db:create",
      migrate: "cd nest-src && npm run db:migrate",
      seed: "cd nest-src && npm run db:seed",
      reset: "npm run db:create && npm run db:migrate && npm run db:seed",
    },

    // Setup script
    setup: "npm install && cd nest-src && npm install",

    // Lint scripts
    lint: {
      frontend:
        "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
      backend: "cd nest-src && npm run lint",
      default: "npm run lint:frontend && npm run lint:backend",
    },
  },
};
