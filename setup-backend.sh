#!/bin/bash

# Install NestJS CLI globally if not already installed
if ! command -v nest &> /dev/null; then
  echo "Installing NestJS CLI globally..."
  npm install -g @nestjs/cli
fi

# Navigate to the backend directory
cd nest-src

# Install dependencies
npm install

# Return to the root directory
cd ..

echo "Backend setup completed successfully!"
