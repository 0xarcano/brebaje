---
sidebar_position: 1
---

# Installation

This guide will help you install and set up Brebaje on your system.

## Prerequisites

Before installing Brebaje, make sure you have the following prerequisites:

- **Node.js**: Version 22.0 or higher
- **pnpm**: Version 9.0 or higher (recommended package manager)
- **Git**: For cloning the repository
- **SQLite3**: For the database (will be installed automatically)

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/p0tion-tools/brebaje.git
cd brebaje
```

### 2. Install Dependencies

```bash
# Install all dependencies using pnpm
pnpm install
```

### 3. Database Setup

The backend service uses SQLite as the database. The database will be created automatically when you first run the application.

### 4. Environment Configuration

Create environment files for the backend service:

```bash
# Create environment file for backend
cd apps/backend
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# Database
DATABASE_URL=sqlite:./brebaje.db

# Server
PORT=3000
NODE_ENV=development

# Authentication (optional)
JWT_SECRET=your-jwt-secret-here
```

### 5. Build the Project

```bash
# Build the backend service
cd apps/backend
pnpm run build

# Build the website (optional)
cd ../website
pnpm run build
```

## Verification

To verify that your installation is working correctly:

### 1. Start the Backend Service

```bash
cd apps/backend
pnpm run start:dev
```

The backend service should start on `http://localhost:3000`.

### 2. Start the Documentation Website

```bash
cd apps/website
pnpm run start
```

The documentation website should be available at `http://localhost:3000`.

### 3. Test the API

You can test the API endpoints using curl or any HTTP client:

```bash
# Test the health endpoint
curl http://localhost:3000/health

# Expected response: {"status":"ok"}
```

## Troubleshooting

### Common Issues

#### SQLite3 Installation Issues

If you encounter SQLite3 installation problems:

```bash
# Option 1: Use the approve-builds script
pnpm approve-builds

# Option 2: Manual rebuild
cd node_modules/sqlite3/ && pnpm rebuild && cd ../..
```

#### Port Already in Use

If port 3000 is already in use, change the port in your `.env` file:

```env
PORT=3001
```

#### Permission Issues

If you encounter permission issues on Linux/macOS:

```bash
# Fix npm permissions
sudo chown -R $USER:$GROUP ~/.npm
sudo chown -R $USER:$GROUP ~/.pnpm-store
```

### Getting Help

If you're still experiencing issues:

1. Check the [GitHub Issues](https://github.com/NicoSerranoP/brebaje/issues)
2. Join our [Discord server](https://discord.gg/brebaje)
3. Create a new issue with detailed error information

## Next Steps

Now that you have Brebaje installed, you can:

- **[Quick Start](./quickstart)**: Run your first ceremony
- **[Core Concepts](./../concepts/trusted-setup)**: Learn about trusted setup ceremonies
- **[User Guide](./../user-guide/creating-ceremony)**: Create and manage ceremonies
