---
sidebar_position: 2
---

# Quick Start

This guide will help you run your first trusted setup ceremony with Brebaje in under 10 minutes.

## Prerequisites

Make sure you have completed the [Installation](./installation) guide before proceeding.

## Step 1: Start the Services

First, start the backend service:

```bash
cd apps/backend
pnpm run start:dev
```

In a new terminal, start the documentation website (optional):

```bash
cd apps/website
pnpm run start
```

## Step 2: Create a Project

Using the API, create a new project for your ceremony:

```bash
curl -X POST http://localhost:3000/projects \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My First Ceremony",
    "contact": "your-email@example.com",
    "coordinatorId": 1
  }'
```

## Step 3: Create a Ceremony

Create a ceremony for your project:

```bash
curl -X POST http://localhost:3000/ceremonies \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": 1,
    "description": "A simple test ceremony",
    "start_date": 1640995200,
    "end_date": 1643673600,
    "penalty": 3600
  }'
```

## Step 4: Add a Circuit

Add a circuit to your ceremony:

```bash
curl -X POST http://localhost:3000/circuits \
  -H "Content-Type: application/json" \
  -d '{
    "ceremonyId": 1,
    "name": "test-circuit",
    "timeoutMechanismType": "FIXED",
    "fixedTimeWindow": 3600,
    "sequencePosition": 1,
    "zKeySizeInBytes": 1024,
    "constraints": 1000,
    "pot": 10
  }'
```

## Step 5: Register a Participant

Register yourself as a participant:

```bash
curl -X POST http://localhost:3000/participants \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "ceremonyId": 1,
    "status": "CREATED"
  }'
```

## Step 6: Monitor the Ceremony

Check the status of your ceremony:

```bash
# Get ceremony details
curl http://localhost:3000/ceremonies/1

# Get participants
curl http://localhost:3000/ceremonies/1/participants

# Get circuits
curl http://localhost:3000/ceremonies/1/circuits
```

## Step 7: Contribute to the Ceremony

As a participant, you can contribute to the ceremony:

```bash
# Update participant status to READY
curl -X PATCH http://localhost:3000/participants/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "READY"
  }'

# Start contributing
curl -X PATCH http://localhost:3000/participants/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "CONTRIBUTING",
    "contributionStep": "DOWNLOADING"
  }'
```

## Understanding the Flow

Here's what happens during a trusted setup ceremony:

1. **Scheduled**: The ceremony is created and scheduled
2. **Opened**: The ceremony is open for participants to join
3. **Contributing**: Participants download, compute, and upload their contributions
4. **Verifying**: Each contribution is verified for correctness
5. **Finalized**: The ceremony is completed and the final parameters are generated

## Next Steps

Now that you've run your first ceremony, you can:

- **[Core Concepts](./../concepts/trusted-setup)**: Learn more about trusted setup ceremonies
- **[User Guide](./../user-guide/creating-ceremony)**: Create more complex ceremonies
- **[API Reference](./../api/backend-api)**: Explore all available API endpoints
- **[Examples](./../examples/basic-ceremony)**: See more detailed examples

## Troubleshooting

### Common Issues

**Service not starting**: Make sure all dependencies are installed and the database is properly configured.

**API errors**: Check that the backend service is running and accessible at `http://localhost:3000`.

**Database errors**: Ensure SQLite is properly installed and the database file is writable.

### Getting Help

If you encounter issues:

1. Check the logs in your terminal
2. Verify all services are running
3. Check the [Troubleshooting](./installation#troubleshooting) section
4. Join our [Discord server](https://discord.gg/brebaje) for support
