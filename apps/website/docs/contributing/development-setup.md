---
sidebar_position: 1
---

# Development Setup

This guide helps you set up a development environment for contributing to Brebaje.

## Prerequisites

Before setting up the development environment, ensure you have:

- **Node.js**: Version 22.0 or higher
- **pnpm**: Version 9.0 or higher
- **Git**: For version control
- **SQLite3**: For the database
- **Code Editor**: VS Code, Vim, or your preferred editor

## Getting Started

### 1. Fork and Clone

First, fork the Brebaje repository on GitHub, then clone your fork:

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/brebaje.git
cd brebaje

# Add the upstream repository
git remote add upstream https://github.com/p0tion-tools/brebaje.git
```

### 2. Install Dependencies

Install all dependencies using pnpm:

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm run build
```

### 3. Database Setup

The backend service uses SQLite. The database will be created automatically when you first run the application.

### 4. Environment Configuration

Create environment files for development:

```bash
# Backend environment
cd apps/backend
cp .env.example .env
```

Edit the `.env` file:

```env
# Database
DATABASE_URL=sqlite:./brebaje-dev.db

# Server
PORT=3000
NODE_ENV=development

# Authentication (for development)
JWT_SECRET=dev-secret-key

# Logging
LOG_LEVEL=debug
```

### 5. Start Development Servers

Start the backend service in development mode:

```bash
# Start backend
cd apps/backend
pnpm run start:dev
```

In another terminal, start the documentation website:

```bash
# Start website
cd apps/website
pnpm run start
```

## Project Structure

```
brebaje/
├── apps/
│   ├── backend/           # NestJS backend service
│   │   ├── src/
│   │   │   ├── ceremonies/    # Ceremony management
│   │   │   ├── circuits/      # Circuit management
│   │   │   ├── participants/  # Participant management
│   │   │   ├── contributions/ # Contribution processing
│   │   │   ├── projects/      # Project management
│   │   │   ├── users/         # User management
│   │   │   ├── auth/          # Authentication
│   │   │   └── storage/       # File storage
│   │   └── test/          # Backend tests
│   └── website/           # Docusaurus documentation
│       ├── docs/          # Documentation content
│       ├── src/           # Website source code
│       └── static/        # Static assets
├── packages/
│   └── actions/           # Actions package
│       ├── src/           # Source code
│       ├── lib/           # Compiled output
│       └── __tests__/     # Tests
├── .github/               # GitHub workflows
├── .husky/                # Git hooks
└── docs/                  # Additional documentation
```

## Development Workflow

### 1. Create a Feature Branch

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/your-bug-description
```

### 2. Make Changes

Make your changes in the appropriate directories:

- **Backend Changes**: `apps/backend/src/`
- **Website Changes**: `apps/website/`
- **Actions Changes**: `packages/actions/src/`

### 3. Run Tests

```bash
# Run all tests
pnpm run test

# Run backend tests only
cd apps/backend
pnpm run test

# Run actions tests only
cd packages/actions
pnpm run test

# Run tests with coverage
pnpm run test:cov
```

### 4. Lint and Format

```bash
# Lint all code
pnpm run lint

# Fix linting issues
pnpm run lint:fix

# Format code
pnpm run prettier:fix
```

### 5. Build and Test

```bash
# Build all packages
pnpm run build

# Test the build
cd apps/backend
pnpm run start:prod
```

### 6. Commit Changes

```bash
# Stage changes
git add .

# Commit with conventional commit message
git commit -m "feat: add new ceremony management feature"

# Push to your fork
git push origin feature/your-feature-name
```

### 7. Create Pull Request

1. Go to your fork on GitHub
2. Click "New Pull Request"
3. Select your feature branch
4. Fill out the PR template
5. Submit the PR

## Code Style

### TypeScript

- Use TypeScript for all new code
- Follow strict TypeScript configuration
- Use interfaces for object shapes
- Use types for unions and primitives

### Naming Conventions

- **Files**: kebab-case (e.g., `ceremony-service.ts`)
- **Classes**: PascalCase (e.g., `CeremonyService`)
- **Functions/Variables**: camelCase (e.g., `createCeremony`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_PARTICIPANTS`)

### Code Organization

```typescript
// 1. Imports
import { Injectable } from "@nestjs/common";

// 2. Interfaces/Types
interface CreateCeremonyOptions {
  projectId: number;
  description: string;
}

// 3. Class/Function
@Injectable()
export class CeremonyService {
  // 4. Properties
  private readonly logger = new Logger(CeremonyService.name);

  // 5. Constructor
  constructor() {}

  // 6. Public methods
  async createCeremony(options: CreateCeremonyOptions) {
    // Implementation
  }

  // 7. Private methods
  private validateOptions(options: CreateCeremonyOptions) {
    // Validation logic
  }
}
```

## Testing

### Backend Tests

```bash
# Unit tests
pnpm run test

# E2E tests
pnpm run test:e2e

# Test coverage
pnpm run test:cov

# Watch mode
pnpm run test:watch
```

### Writing Tests

```typescript
import { Test, TestingModule } from "@nestjs/testing";
import { CeremonyService } from "./ceremony.service";

describe("CeremonyService", () => {
  let service: CeremonyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CeremonyService],
    }).compile();

    service = module.get<CeremonyService>(CeremonyService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("createCeremony", () => {
    it("should create a ceremony successfully", async () => {
      const options = {
        projectId: 1,
        description: "Test ceremony",
      };

      const result = await service.createCeremony(options);

      expect(result).toBeDefined();
      expect(result.projectId).toBe(options.projectId);
    });
  });
});
```

### Actions Tests

```bash
cd packages/actions
pnpm run test
```

## Documentation

### Code Documentation

Use JSDoc comments for functions and classes:

```typescript
/**
 * Creates a new trusted setup ceremony
 * @param options - Ceremony creation options
 * @returns Promise resolving to the created ceremony
 * @throws {ValidationError} When options are invalid
 */
async createCeremony(options: CreateCeremonyOptions): Promise<Ceremony> {
  // Implementation
}
```

### API Documentation

Update API documentation when adding new endpoints:

```typescript
/**
 * @api {post} /ceremonies Create ceremony
 * @apiName CreateCeremony
 * @apiGroup Ceremonies
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} projectId Project ID
 * @apiParam {String} description Ceremony description
 * @apiParam {Number} start_date Start timestamp
 * @apiParam {Number} end_date End timestamp
 * @apiParam {Number} penalty Timeout penalty in seconds
 *
 * @apiSuccess {Number} id Ceremony ID
 * @apiSuccess {String} state Ceremony state
 */
@Post()
async create(@Body() createCeremonyDto: CreateCeremonyDto) {
  return this.ceremoniesService.create(createCeremonyDto);
}
```

## Debugging

### Backend Debugging

```bash
# Start with debugging enabled
cd apps/backend
pnpm run start:debug
```

### VS Code Debugging

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Backend",
      "program": "${workspaceFolder}/apps/backend/src/main.ts",
      "runtimeArgs": ["-r", "ts-node/register"],
      "env": {
        "NODE_ENV": "development"
      }
    }
  ]
}
```

## Performance

### Database Queries

- Use indexes for frequently queried fields
- Optimize complex queries
- Use pagination for large result sets

### API Performance

- Implement caching where appropriate
- Use compression for large responses
- Monitor response times

## Security

### Input Validation

Always validate user input:

```typescript
import { IsString, IsNumber, Min, Max } from "class-validator";

export class CreateCeremonyDto {
  @IsNumber()
  projectId: number;

  @IsString()
  @Min(1)
  @Max(1000)
  description: string;
}
```

### Authentication

- Use JWT tokens for authentication
- Implement proper authorization checks
- Validate user permissions

## Troubleshooting

### Common Issues

**Database Connection Issues**:

```bash
# Check database file permissions
ls -la apps/backend/brebaje-dev.db

# Recreate database
rm apps/backend/brebaje-dev.db
```

**Port Already in Use**:

```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

**Build Issues**:

```bash
# Clean and rebuild
pnpm run clean
pnpm install
pnpm run build
```

### Getting Help

If you encounter issues:

1. Check the [GitHub Issues](https://github.com/NicoSerranoP/brebaje/issues)
2. Join our [Discord server](https://discord.gg/brebaje)
3. Create a new issue with detailed information

## Next Steps

- **[Contributing Guidelines](./guidelines)**: Detailed contribution guidelines
- **[Architecture](./architecture)**: System architecture overview
- **[API Reference](./../api/backend-api)**: Backend API documentation
- **[Testing Guide](./../testing)**: Comprehensive testing guide
