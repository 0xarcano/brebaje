---
sidebar_position: 2
---

# Actions API

The Brebaje Actions package provides utilities and helpers for CLI, website, and server commands. This page documents the available actions and how to use them.

## Overview

The actions package contains reusable functions for common operations in Brebaje:

- **Ceremony Management**: Actions for creating and managing ceremonies
- **Participant Operations**: Actions for participant registration and management
- **Circuit Operations**: Actions for circuit configuration and management
- **Contribution Processing**: Actions for handling contributions
- **Verification**: Actions for verifying contributions and parameters

## Installation

The actions package is included in the Brebaje monorepo:

```bash
# Install dependencies
pnpm install

# Build the actions package
cd packages/actions
pnpm run build
```

## Usage

### Import Actions

```typescript
import {
  createCeremony,
  registerParticipant,
  addCircuit,
  verifyContribution,
} from "@p0tion/actions";
```

### Basic Example

```typescript
import { createCeremony, addCircuit } from "@p0tion/actions";

// Create a ceremony
const ceremony = await createCeremony({
  projectId: 1,
  description: "My trusted setup ceremony",
  start_date: Date.now(),
  end_date: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
  penalty: 3600,
});

// Add a circuit to the ceremony
const circuit = await addCircuit({
  ceremonyId: ceremony.id,
  name: "my-circuit",
  timeoutMechanismType: "FIXED",
  fixedTimeWindow: 3600,
  sequencePosition: 1,
  zKeySizeInBytes: 1048576,
  constraints: 1000,
  pot: 10,
});
```

## Available Actions

### Ceremony Actions

#### `createCeremony(options)`

Creates a new ceremony.

```typescript
interface CreateCeremonyOptions {
  projectId: number;
  description: string;
  start_date: number;
  end_date: number;
  penalty: number;
  authProviders?: string[];
}

const ceremony = await createCeremony({
  projectId: 1,
  description: "My ceremony",
  start_date: Date.now(),
  end_date: Date.now() + 30 * 24 * 60 * 60 * 1000,
  penalty: 3600,
  authProviders: ["discord", "github"],
});
```

#### `updateCeremonyState(ceremonyId, state)`

Updates the state of a ceremony.

```typescript
type CeremonyState = "SCHEDULED" | "OPENED" | "PAUSED" | "CLOSED" | "CANCELED" | "FINALIZED";

await updateCeremonyState(1, "OPENED");
```

#### `getCeremony(ceremonyId)`

Retrieves ceremony details.

```typescript
const ceremony = await getCeremony(1);
```

### Circuit Actions

#### `addCircuit(options)`

Adds a circuit to a ceremony.

```typescript
interface AddCircuitOptions {
  ceremonyId: number;
  name: string;
  timeoutMechanismType: "FIXED" | "DYNAMIC" | "LOBBY";
  fixedTimeWindow?: number;
  dynamicThreshold?: number;
  sequencePosition: number;
  zKeySizeInBytes: number;
  constraints: number;
  pot: number;
  compiler?: any;
  template?: any;
}

const circuit = await addCircuit({
  ceremonyId: 1,
  name: "my-circuit",
  timeoutMechanismType: "FIXED",
  fixedTimeWindow: 3600,
  sequencePosition: 1,
  zKeySizeInBytes: 1048576,
  constraints: 1000,
  pot: 10,
});
```

#### `getCircuit(circuitId)`

Retrieves circuit details.

```typescript
const circuit = await getCircuit(1);
```

#### `getCurrentZKey(circuitId)`

Gets the current zKey file for a circuit.

```typescript
const zkey = await getCurrentZKey(1);
// Returns: { zkeyFile: "circuit_0001.zkey", zkeyIndex: 1, downloadUrl: "..." }
```

### Participant Actions

#### `registerParticipant(options)`

Registers a participant for a ceremony.

```typescript
interface RegisterParticipantOptions {
  userId: number;
  ceremonyId: number;
  status?: string;
}

const participant = await registerParticipant({
  userId: 1,
  ceremonyId: 1,
  status: "CREATED",
});
```

#### `updateParticipantStatus(participantId, status, contributionStep?)`

Updates participant status and contribution step.

```typescript
await updateParticipantStatus(1, "READY");
await updateParticipantStatus(1, "CONTRIBUTING", "DOWNLOADING");
```

#### `getParticipant(participantId)`

Retrieves participant details.

```typescript
const participant = await getParticipant(1);
```

### Contribution Actions

#### `uploadContribution(options)`

Uploads a contribution for a circuit.

```typescript
interface UploadContributionOptions {
  circuitId: number;
  participantId: number;
  zkeyFile: Buffer | string;
  contributionComputationTime: number;
  fullContributionTime: number;
}

const contribution = await uploadContribution({
  circuitId: 1,
  participantId: 1,
  zkeyFile: fs.readFileSync("circuit_0001.zkey"),
  contributionComputationTime: 1800,
  fullContributionTime: 2400,
});
```

#### `verifyContribution(contributionId, options?)`

Verifies a contribution.

```typescript
interface VerifyContributionOptions {
  verificationSoftware?: {
    type: string;
    version: string;
    options?: any;
  };
}

const result = await verifyContribution(1, {
  verificationSoftware: {
    type: "snarkjs",
    version: "0.7.0",
  },
});
```

#### `getContribution(contributionId)`

Retrieves contribution details.

```typescript
const contribution = await getContribution(1);
```

### Project Actions

#### `createProject(options)`

Creates a new project.

```typescript
interface CreateProjectOptions {
  name: string;
  contact: string;
  coordinatorId: number;
}

const project = await createProject({
  name: "My ZK Project",
  contact: "coordinator@example.com",
  coordinatorId: 1,
});
```

#### `getProject(projectId)`

Retrieves project details.

```typescript
const project = await getProject(1);
```

## Error Handling

All actions throw errors when operations fail:

```typescript
try {
  const ceremony = await createCeremony(options);
} catch (error) {
  console.error("Failed to create ceremony:", error.message);

  if (error.code === "VALIDATION_ERROR") {
    console.error("Validation details:", error.details);
  }
}
```

## Configuration

Actions can be configured with custom settings:

```typescript
import { configureActions } from "@p0tion/actions";

configureActions({
  baseUrl: "http://localhost:3000",
  timeout: 30000,
  retries: 3,
  authToken: "your-auth-token",
});
```

## TypeScript Support

The actions package includes full TypeScript support with type definitions:

```typescript
import type { Ceremony, Circuit, Participant, Contribution } from "@p0tion/actions";

// Type-safe usage
const ceremony: Ceremony = await createCeremony(options);
```

## Testing

Actions can be tested using the provided test utilities:

```typescript
import { createTestCeremony, createTestParticipant } from "@p0tion/actions/test";

// Create test data
const ceremony = await createTestCeremony();
const participant = await createTestParticipant(ceremony.id);
```

## Best Practices

### Error Handling

Always wrap action calls in try-catch blocks:

```typescript
try {
  const result = await someAction(options);
} catch (error) {
  // Handle error appropriately
  console.error("Action failed:", error);
}
```

### Validation

Validate input data before calling actions:

```typescript
import { validateCeremonyOptions } from "@p0tion/actions/validation";

const options = {
  projectId: 1,
  description: "My ceremony",
  start_date: Date.now(),
  end_date: Date.now() + 30 * 24 * 60 * 60 * 1000,
  penalty: 3600,
};

const validation = validateCeremonyOptions(options);
if (!validation.valid) {
  throw new Error(`Validation failed: ${validation.errors.join(", ")}`);
}

const ceremony = await createCeremony(options);
```

### Batch Operations

Use batch operations for multiple items:

```typescript
import { batchRegisterParticipants } from "@p0tion/actions";

const participants = await batchRegisterParticipants([
  { userId: 1, ceremonyId: 1 },
  { userId: 2, ceremonyId: 1 },
  { userId: 3, ceremonyId: 1 },
]);
```

## Next Steps

- **[Backend API](./backend-api)**: Complete backend API documentation
- **[Types](./types)**: TypeScript type definitions
- **[Examples](./../examples/basic-ceremony)**: Usage examples
- **[Contributing](./../contributing/development-setup)**: Development setup guide
