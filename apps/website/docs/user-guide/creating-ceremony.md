---
sidebar_position: 1
---

# Creating a Ceremony

This guide walks you through the process of creating and managing a trusted setup ceremony using Brebaje.

## Prerequisites

Before creating a ceremony, ensure you have:

- **Brebaje Backend**: Running and accessible
- **Project Created**: A project to associate with the ceremony
- **Circuit Files**: Your zk-SNARK circuit files ready
- **Participants**: Identified participants for the ceremony

## Step 1: Create a Project

First, create a project to organize your ceremony:

```bash
curl -X POST http://localhost:3000/projects \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My ZK Project",
    "contact": "your-email@example.com",
    "coordinatorId": 1
  }'
```

**Response:**

```json
{
  "id": 1,
  "name": "My ZK Project",
  "contact": "your-email@example.com",
  "coordinatorId": 1
}
```

## Step 2: Create the Ceremony

Create the ceremony with appropriate settings:

```bash
curl -X POST http://localhost:3000/ceremonies \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": 1,
    "description": "Trusted setup ceremony for my zk-SNARK circuit",
    "start_date": 1640995200,
    "end_date": 1643673600,
    "penalty": 3600,
    "authProviders": ["discord", "github"]
  }'
```

**Response:**

```json
{
  "id": 1,
  "projectId": 1,
  "description": "Trusted setup ceremony for my zk-SNARK circuit",
  "state": "SCHEDULED",
  "start_date": 1640995200,
  "end_date": 1643673600,
  "penalty": 3600,
  "authProviders": ["discord", "github"]
}
```

### Ceremony Configuration Options

- **start_date**: Unix timestamp when ceremony starts
- **end_date**: Unix timestamp when ceremony should end
- **penalty**: Timeout penalty in seconds (3600 = 1 hour)
- **authProviders**: Authentication methods for participants

## Step 3: Add Circuits

Add your circuits to the ceremony:

```bash
curl -X POST http://localhost:3000/circuits \
  -H "Content-Type: application/json" \
  -d '{
    "ceremonyId": 1,
    "name": "my-circuit",
    "timeoutMechanismType": "FIXED",
    "fixedTimeWindow": 3600,
    "sequencePosition": 1,
    "zKeySizeInBytes": 1048576,
    "constraints": 10000,
    "pot": 10,
    "compiler": {
      "type": "circom",
      "version": "2.1.0"
    },
    "template": {
      "type": "groth16"
    }
  }'
```

### Circuit Configuration Options

- **timeoutMechanismType**: "FIXED", "DYNAMIC", or "LOBBY"
- **fixedTimeWindow**: Time window for fixed timeouts (in seconds)
- **sequencePosition**: Order of circuits in the ceremony
- **zKeySizeInBytes**: Expected size of zKey files
- **constraints**: Number of constraints in the circuit
- **pot**: Power of Tau used for the circuit

## Step 4: Configure Timeout Settings

Choose the appropriate timeout mechanism for your circuit:

### Fixed Timeout (Recommended for Simple Circuits)

```json
{
  "timeoutMechanismType": "FIXED",
  "fixedTimeWindow": 3600
}
```

### Dynamic Timeout (Recommended for Complex Circuits)

```json
{
  "timeoutMechanismType": "DYNAMIC",
  "dynamicThreshold": 1.5
}
```

### Lobby Timeout (For Manual Control)

```json
{
  "timeoutMechanismType": "LOBBY"
}
```

## Step 5: Register Participants

Register participants for the ceremony:

```bash
# Register first participant
curl -X POST http://localhost:3000/participants \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "ceremonyId": 1,
    "status": "CREATED"
  }'

# Register additional participants
curl -X POST http://localhost:3000/participants \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 2,
    "ceremonyId": 1,
    "status": "CREATED"
  }'
```

## Step 6: Open the Ceremony

Once everything is configured, open the ceremony:

```bash
curl -X PATCH http://localhost:3000/ceremonies/1 \
  -H "Content-Type: application/json" \
  -d '{
    "state": "OPENED"
  }'
```

## Step 7: Monitor the Ceremony

Monitor the ceremony progress:

```bash
# Get ceremony status
curl http://localhost:3000/ceremonies/1

# Get participants
curl http://localhost:3000/ceremonies/1/participants

# Get circuits
curl http://localhost:3000/ceremonies/1/circuits
```

## Managing Ceremony State

### Pausing a Ceremony

If you need to pause the ceremony temporarily:

```bash
curl -X PATCH http://localhost:3000/ceremonies/1 \
  -H "Content-Type: application/json" \
  -d '{
    "state": "PAUSED"
  }'
```

### Resuming a Paused Ceremony

```bash
curl -X PATCH http://localhost:3000/ceremonies/1 \
  -H "Content-Type: application/json" \
  -d '{
    "state": "OPENED"
  }'
```

### Closing a Ceremony

When no more participants can join:

```bash
curl -X PATCH http://localhost:3000/ceremonies/1 \
  -H "Content-Type: application/json" \
  -d '{
    "state": "CLOSED"
  }'
```

### Finalizing a Ceremony

When all contributions are complete:

```bash
curl -X PATCH http://localhost:3000/ceremonies/1 \
  -H "Content-Type: application/json" \
  -d '{
    "state": "FINALIZED"
  }'
```

## Best Practices

### Planning

- **Realistic Timeline**: Set realistic start and end dates
- **Participant Capacity**: Ensure you have enough participants
- **Circuit Complexity**: Consider circuit complexity when setting timeouts
- **Backup Plans**: Have backup participants ready

### Configuration

- **Timeout Settings**: Choose appropriate timeout mechanisms
- **Circuit Order**: Order circuits by complexity (simplest first)
- **Authentication**: Configure appropriate authentication providers
- **Documentation**: Document ceremony purpose and requirements

### Monitoring

- **Regular Checks**: Monitor ceremony progress regularly
- **Timeout Alerts**: Set up alerts for potential timeouts
- **Communication**: Keep participants informed
- **Documentation**: Document any issues or delays

## Troubleshooting

### Common Issues

**Ceremony won't open**: Check that all required fields are set and participants are registered.

**Participants can't join**: Verify the ceremony state is "OPENED" and authentication is configured.

**Timeouts occurring**: Consider adjusting timeout settings or adding more participants.

**Verification failures**: Check circuit configuration and verification software settings.

### Getting Help

If you encounter issues:

1. Check the ceremony logs
2. Verify all configuration settings
3. Test with a smaller ceremony first
4. Join our [Discord server](https://discord.gg/brebaje) for support

## Next Steps

Now that you've created a ceremony, you can:

- **[Participating](./participating)**: Guide for ceremony participants
- **[Coordinating](./coordinating)**: Advanced coordination techniques
- **[Monitoring](./monitoring)**: Detailed monitoring and analytics
- **[Examples - Basic Ceremony](./../examples/basic-ceremony)**: Complete ceremony example
