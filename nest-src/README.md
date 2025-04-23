# NestJS Authentication API

This is a NestJS-based authentication API with user management, role-based access control, and password reset functionality.

## Features

- User authentication (login, register, logout)
- JWT-based authentication
- Role-based access control
- Password reset functionality
- User management (CRUD operations)
- Permission management
- Session management
- TypeORM integration with MySQL

## Project Structure

```
src/
├── auth/                  # Authentication module
│   ├── decorators/        # Custom decorators
│   ├── dto/               # Data transfer objects
│   ├── guards/            # Authentication guards
│   ├── strategies/        # Passport strategies
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   └── auth.service.ts
├── common/                # Common utilities
│   ├── filters/           # Exception filters
│   └── interceptors/      # Interceptors
├── password-reset/        # Password reset module
├── permissions/           # Permissions module
├── sessions/              # Sessions module
├── users/                 # Users module
├── app.module.ts          # Main application module
└── main.ts                # Application entry point
```

## Installation

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env file with your configuration

# Run database migrations
npm run migration:run

# Start the application
npm run start:dev
```

## API Endpoints

### Authentication

- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register
- `POST /api/auth/logout` - Logout
- `GET /api/auth/profile` - Get current user profile

### Users

- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user (admin only)
- `PATCH /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (admin only)

### Password Reset

- `POST /api/password-reset/forgot` - Request password reset
- `POST /api/password-reset/reset` - Reset password with token

### Permissions

- `GET /api/permissions` - Get all permissions (admin only)
- `POST /api/permissions` - Create permission (admin only)

### Sessions

- `DELETE /api/sessions/user/:userId` - Delete all sessions for a user (admin only)
- `DELETE /api/sessions/:token` - Delete a specific session
