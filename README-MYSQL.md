# MySQL Integration Guide

## Overview

This project is configured to work with both a JSON-based mock database (for development in Tempolab) and a MySQL database (for production). The code is structured to make the transition between these two database types seamless.

## Setup Instructions

### Prerequisites

- MySQL Server 5.7+ or MySQL 8.0+ installed
- Node.js 14+ installed

### Step 1: Install MySQL Dependencies

When deploying to production, you'll need to install the MySQL dependencies:

```bash
npm install mysql2 bcrypt uuid
```

### Step 2: Configure Environment Variables

Create a `.env` file in the root of your project with the following variables:

```
# Database Configuration
DB_MODE=mysql  # Change to 'mysql' to use MySQL instead of the mock database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=auth_db
DB_CONNECTION_LIMIT=10
```

### Step 3: Initialize the Database

Run the initialization script to create the database schema:

```bash
mysql -u root -p < src/scripts/init-mysql.sql
```

### Step 4: Uncomment MySQL Code

The codebase contains commented MySQL implementation code. To enable MySQL, you need to uncomment this code in the following files:

1. `src/utils/mysql.ts` - Uncomment the MySQL connection pool and query functions
2. `src/repositories/*.repository.ts` - Uncomment the MySQL implementation in each repository file

### Step 5: Update Database Mode

In `src/config/database.config.ts`, change the `DB_MODE` to 'mysql':

```typescript
export const DB_MODE = process.env.DB_MODE || 'mysql';
```

## Database Schema

The MySQL database schema consists of the following tables:

### Users Table

```sql
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'user',
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email)
);
```

### Sessions Table

```sql
CREATE TABLE sessions (
  id VARCHAR(36) PRIMARY KEY,
  userId VARCHAR(36) NOT NULL,
  token VARCHAR(255) NOT NULL UNIQUE,
  expiresAt TIMESTAMP NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_token (token),
  INDEX idx_userId (userId),
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
```

### Password Resets Table

```sql
CREATE TABLE password_resets (
  id VARCHAR(36) PRIMARY KEY,
  userId VARCHAR(36) NOT NULL,
  token VARCHAR(255) NOT NULL UNIQUE,
  expiresAt TIMESTAMP NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  used BOOLEAN NOT NULL DEFAULT FALSE,
  INDEX idx_token (token),
  INDEX idx_userId (userId),
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
```

### Permissions Table

```sql
CREATE TABLE permissions (
  id VARCHAR(36) PRIMARY KEY,
  role VARCHAR(50) NOT NULL UNIQUE,
  permissions JSON NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Architecture

The application follows a repository pattern to abstract database operations:

1. **Repositories**: Handle database operations for specific entities (users, sessions, etc.)
2. **Services**: Use repositories to implement business logic
3. **API Layer**: Exposes services to the frontend

This architecture makes it easy to switch between different database implementations without changing the business logic.

## Password Hashing

In production, you should uncomment the password hashing code in the following files:

- `src/services/auth.service.ts`
- `src/services/user.service.ts`

This will ensure that passwords are properly hashed before being stored in the database.

## Troubleshooting

### Connection Issues

If you encounter connection issues with MySQL, check the following:

1. Ensure MySQL server is running
2. Verify the connection details in your `.env` file
3. Check that the user has appropriate permissions

### Migration Issues

If you need to migrate data from the JSON database to MySQL:

1. Export the JSON data
2. Transform it to match the MySQL schema
3. Import it using MySQL's `LOAD DATA` or by writing a migration script

## Security Considerations

1. Always use parameterized queries (already implemented)
2. Enable password hashing in production
3. Use HTTPS for all API requests
4. Implement rate limiting for authentication endpoints
5. Regularly rotate session tokens
