---
sidebar_position: 1
---

# Basic Ceremony Example

This example demonstrates how to run a complete trusted setup ceremony using Brebaje, from setup to completion.

## Overview

We'll create a simple ceremony with:

- 1 project
- 1 ceremony
- 1 circuit
- 3 participants
- Fixed timeout mechanism

## Prerequisites

1. **Brebaje Backend**: Running on `http://localhost:3000`
2. **Circuit Files**: A simple zk-SNARK circuit
3. **Participants**: 3 participants ready to contribute

## Step 1: Setup

### Start the Backend

```bash
cd apps/backend
pnpm run start:dev
```

### Verify Backend is Running

```bash
curl http://localhost:3000/health
```

Expected response:

```json
{
  "status": "ok",
  "timestamp": 1640995200
}
```

## Step 2: Create Project

```bash
curl -X POST http://localhost:3000/projects \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Basic Ceremony Example",
    "contact": "coordinator@example.com",
    "coordinatorId": 1
  }'
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Basic Ceremony Example",
    "contact": "coordinator@example.com",
    "coordinatorId": 1
  }
}
```

## Step 3: Create Ceremony

```bash
curl -X POST http://localhost:3000/ceremonies \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": 1,
    "description": "Basic trusted setup ceremony example",
    "start_date": 1640995200,
    "end_date": 1643673600,
    "penalty": 3600,
    "authProviders": ["discord"]
  }'
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "projectId": 1,
    "description": "Basic trusted setup ceremony example",
    "state": "SCHEDULED",
    "start_date": 1640995200,
    "end_date": 1643673600,
    "penalty": 3600,
    "authProviders": ["discord"]
  }
}
```

## Step 4: Add Circuit

```bash
curl -X POST http://localhost:3000/circuits \
  -H "Content-Type: application/json" \
  -d '{
    "ceremonyId": 1,
    "name": "basic-circuit",
    "timeoutMechanismType": "FIXED",
    "fixedTimeWindow": 3600,
    "sequencePosition": 1,
    "zKeySizeInBytes": 1048576,
    "constraints": 1000,
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

**Response:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "ceremonyId": 1,
    "name": "basic-circuit",
    "timeoutMechanismType": "FIXED",
    "fixedTimeWindow": 3600,
    "sequencePosition": 1,
    "zKeySizeInBytes": 1048576,
    "constraints": 1000,
    "pot": 10
  }
}
```

## Step 5: Register Participants

```bash
# Register Participant 1
curl -X POST http://localhost:3000/participants \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "ceremonyId": 1,
    "status": "CREATED"
  }'

# Register Participant 2
curl -X POST http://localhost:3000/participants \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 2,
    "ceremonyId": 1,
    "status": "CREATED"
  }'

# Register Participant 3
curl -X POST http://localhost:3000/participants \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 3,
    "ceremonyId": 1,
    "status": "CREATED"
  }'
```

## Step 6: Open the Ceremony

```bash
curl -X PATCH http://localhost:3000/ceremonies/1 \
  -H "Content-Type: application/json" \
  -d '{
    "state": "OPENED"
  }'
```

## Step 7: Participant 1 Contribution

### Check Ceremony Status

```bash
curl http://localhost:3000/ceremonies/1
```

### Get Current ZKey (Initial State)

```bash
curl http://localhost:3000/circuits/1/current-zkey
```

**Response:**

```json
{
  "success": true,
  "data": {
    "zkeyFile": "basic-circuit_0000.zkey",
    "zkeyIndex": 0,
    "downloadUrl": "https://storage.example.com/basic-circuit_0000.zkey"
  }
}
```

### Update Participant Status

```bash
# Mark participant as ready
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

### Upload Contribution

```bash
curl -X POST http://localhost:3000/circuits/1/contributions \
  -H "Content-Type: multipart/form-data" \
  -F "zkeyFile=@basic-circuit_0001.zkey" \
  -F "participantId=1" \
  -F "contributionComputationTime=1800" \
  -F "fullContributionTime=2400"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "circuitId": 1,
    "participantId": 1,
    "contributionComputationTime": 1800,
    "fullContributionTime": 2400,
    "zkeyIndex": 1,
    "valid": true
  }
}
```

## Step 8: Participant 2 Contribution

### Update Participant Status

```bash
# Mark participant as ready
curl -X PATCH http://localhost:3000/participants/2 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "READY"
  }'

# Start contributing
curl -X PATCH http://localhost:3000/participants/2 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "CONTRIBUTING",
    "contributionStep": "DOWNLOADING"
  }'
```

### Get Current ZKey (After Participant 1)

```bash
curl http://localhost:3000/circuits/1/current-zkey
```

**Response:**

```json
{
  "success": true,
  "data": {
    "zkeyFile": "basic-circuit_0001.zkey",
    "zkeyIndex": 1,
    "downloadUrl": "https://storage.example.com/basic-circuit_0001.zkey"
  }
}
```

### Upload Contribution

```bash
curl -X POST http://localhost:3000/circuits/1/contributions \
  -H "Content-Type: multipart/form-data" \
  -F "zkeyFile=@basic-circuit_0002.zkey" \
  -F "participantId=2" \
  -F "contributionComputationTime=2000" \
  -F "fullContributionTime=2600"
```

## Step 9: Participant 3 Contribution

### Update Participant Status

```bash
# Mark participant as ready
curl -X PATCH http://localhost:3000/participants/3 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "READY"
  }'

# Start contributing
curl -X PATCH http://localhost:3000/participants/3 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "CONTRIBUTING",
    "contributionStep": "DOWNLOADING"
  }'
```

### Get Current ZKey (After Participant 2)

```bash
curl http://localhost:3000/circuits/1/current-zkey
```

### Upload Contribution

```bash
curl -X POST http://localhost:3000/circuits/1/contributions \
  -H "Content-Type: multipart/form-data" \
  -F "zkeyFile=@basic-circuit_0003.zkey" \
  -F "participantId=3" \
  -F "contributionComputationTime=2200" \
  -F "fullContributionTime=2800"
```

## Step 10: Monitor Progress

### Check Ceremony Status

```bash
curl http://localhost:3000/ceremonies/1
```

### Check Participants

```bash
curl http://localhost:3000/ceremonies/1/participants
```

### Check Contributions

```bash
curl http://localhost:3000/circuits/1/contributions
```

## Step 11: Finalize Ceremony

### Close Ceremony

```bash
curl -X PATCH http://localhost:3000/ceremonies/1 \
  -H "Content-Type: application/json" \
  -d '{
    "state": "CLOSED"
  }'
```

### Finalize Ceremony

```bash
curl -X PATCH http://localhost:3000/ceremonies/1 \
  -H "Content-Type: application/json" \
  -d '{
    "state": "FINALIZED"
  }'
```

## Step 12: Get Final Results

### Get Final ZKey

```bash
curl http://localhost:3000/circuits/1/current-zkey
```

**Response:**

```json
{
  "success": true,
  "data": {
    "zkeyFile": "basic-circuit_0003.zkey",
    "zkeyIndex": 3,
    "downloadUrl": "https://storage.example.com/basic-circuit_0003.zkey"
  }
}
```

### Get All Contributions

```bash
curl http://localhost:3000/circuits/1/contributions
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "circuitId": 1,
      "participantId": 1,
      "contributionComputationTime": 1800,
      "fullContributionTime": 2400,
      "zkeyIndex": 1,
      "valid": true
    },
    {
      "id": 2,
      "circuitId": 1,
      "participantId": 2,
      "contributionComputationTime": 2000,
      "fullContributionTime": 2600,
      "zkeyIndex": 2,
      "valid": true
    },
    {
      "id": 3,
      "circuitId": 1,
      "participantId": 3,
      "contributionComputationTime": 2200,
      "fullContributionTime": 2800,
      "zkeyIndex": 3,
      "valid": true
    }
  ]
}
```

## Summary

This example demonstrates:

1. **Project Creation**: Setting up a project to organize the ceremony
2. **Ceremony Setup**: Creating and configuring the ceremony
3. **Circuit Configuration**: Adding a circuit with appropriate settings
4. **Participant Management**: Registering and managing participants
5. **Contribution Process**: The complete contribution workflow
6. **Monitoring**: Tracking ceremony progress
7. **Finalization**: Completing the ceremony and obtaining results

## Key Points

- **Sequential Contributions**: Each participant builds on the previous contribution
- **Verification**: All contributions are automatically verified
- **State Management**: Brebaje tracks the state of ceremonies, participants, and contributions
- **Timeout Handling**: Fixed timeouts ensure the ceremony progresses
- **Final Parameters**: The final zKey file contains the trusted setup parameters

## Next Steps

- **[Advanced Ceremony](./advanced-ceremony)**: More complex ceremony with multiple circuits
- **[Custom Circuit](./custom-circuit)**: Example with custom circuit configuration
- **[API Reference](./../api/backend-api)**: Complete API documentation
- **[User Guide](./../user-guide/creating-ceremony)**: Detailed ceremony creation guide
