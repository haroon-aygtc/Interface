# Al Yalayis Hub - Unified Development Setup

## Project Structure

This project consists of two main parts:

- **Frontend**: React application built with Vite (root directory)
- **Backend**: NestJS application (in the `nest-src` directory)

## Setup Instructions

### Initial Setup

To set up both frontend and backend at once:

```bash
npm run setup
```

This will install dependencies for both the frontend and backend projects.

### Development

To run both frontend and backend in development mode simultaneously:

```bash
npm run dev:all
```

This will start:
- Frontend on port 3000 (http://localhost:3000)
- Backend on port 3001 (http://localhost:3001/api)

To run only the frontend in development mode:

```bash
npm run dev:frontend
```

To run only the backend in development mode:

```bash
npm run dev:backend
```

### Building for Production

To build both frontend and backend for production:

```bash
npm run build
```

To build only the frontend:

```bash
npm run build:frontend
```

To build only the backend:

```bash
npm run build:backend
```

### Running in Production Mode

To run both frontend and backend in production mode:

```bash
npm run start
```

## Environment Variables

Make sure to set up the appropriate environment variables:

1. Copy `.env.example` to `.env` in the root directory for frontend variables
2. Copy `nest-src/.env.example` to `nest-src/.env` for backend variables

## Database Setup

The backend uses MySQL. Make sure to set up your database according to the configuration in `nest-src/.env`.

You can run the database initialization script with:

```bash
mysql -u your_username -p your_database < src/scripts/init-mysql.sql
```

## Additional Commands

- `npm run lint`: Lint frontend code
- `npm run lint:backend`: Lint backend code
- `npm run preview`: Preview the built frontend
