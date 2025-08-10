---
sidebar_position: 3
---

# Circuits

Circuits represent the specific zk-SNARK circuits that need trusted setup parameters. This page explains how circuits work in Brebaje and how to configure them.

## What is a Circuit?

A circuit in Brebaje represents a specific zk-SNARK circuit that requires trusted setup parameters. Each circuit has its own configuration, timeout settings, and verification rules.

## Circuit Structure

### Basic Information

Every circuit has:

- **ID**: Unique identifier for the circuit
- **Ceremony ID**: Links the circuit to a ceremony
- **Name**: Human-readable name for the circuit
- **Sequence Position**: Order of the circuit in the ceremony
- **Metadata**: Size, constraints, and other technical details

### Circuit Properties

```typescript
interface Circuit {
  id: number;
  ceremonyId: number;
  name: string;
  timeoutMechanismType: CircuitTimeoutType;
  dynamicThreshold?: number;
  fixedTimeWindow?: number;
  sequencePosition: number;
  zKeySizeInBytes: number;
  constraints: number;
  pot: number;
  averageContributionComputationTime?: number;
  averageFullContributionTime?: number;
  averageVerifyContributionTime?: number;
  compiler?: any;
  template?: any;
  verification?: any;
  artifacts?: any;
  metadata?: any;
  files?: any;
}
```

## Timeout Mechanisms

Brebaje supports three types of timeout mechanisms:

### Fixed Timeout

```json
{
  "timeoutMechanismType": "FIXED",
  "fixedTimeWindow": 3600
}
```

- Each participant has a fixed time window to complete their contribution
- Timeout is the same for all participants
- Simple to understand and implement

### Dynamic Timeout

```json
{
  "timeoutMechanismType": "DYNAMIC",
  "dynamicThreshold": 1.5
}
```

- Timeout is calculated based on previous contribution times
- Uses a multiplier (e.g., 1.5x the average time)
- Adapts to the actual complexity of the circuit

### Lobby Timeout

```json
{
  "timeoutMechanismType": "LOBBY"
}
```

- Participants wait in a lobby before contributing
- Coordinator can manually assign participants
- Provides more control over the ceremony flow

## Creating a Circuit

### API Endpoint

```bash
POST /circuits
```

### Request Body

```json
{
  "ceremonyId": 1,
  "name": "my-circuit",
  "timeoutMechanismType": "FIXED",
  "fixedTimeWindow": 3600,
  "sequencePosition": 1,
  "zKeySizeInBytes": 1024,
  "constraints": 1000,
  "pot": 10,
  "compiler": {
    "type": "circom",
    "version": "2.1.0"
  },
  "template": {
    "type": "groth16"
  }
}
```

### Required Fields

- **ceremonyId**: ID of the ceremony this circuit belongs to
- **name**: Human-readable name for the circuit
- **timeoutMechanismType**: Type of timeout mechanism
- **sequencePosition**: Order of the circuit in the ceremony
- **zKeySizeInBytes**: Size of the zKey file in bytes
- **constraints**: Number of constraints in the circuit
- **pot**: Power of Tau (PoT) used for the circuit

### Optional Fields

- **dynamicThreshold**: Multiplier for dynamic timeouts
- **fixedTimeWindow**: Time window for fixed timeouts
- **compiler**: Compiler configuration
- **template**: Template configuration
- **verification**: Verification configuration
- **artifacts**: Circuit artifacts
- **metadata**: Additional metadata
- **files**: Associated files

## Circuit Configuration

### Compiler Configuration

```json
{
  "compiler": {
    "type": "circom",
    "version": "2.1.0",
    "options": {
      "prime": "bn128",
      "includePath": "./circuits"
    }
  }
}
```

### Template Configuration

```json
{
  "template": {
    "type": "groth16",
    "parameters": {
      "curve": "bn128",
      "protocol": "groth16"
    }
  }
}
```

### Verification Configuration

```json
{
  "verification": {
    "type": "snarkjs",
    "version": "0.7.0",
    "options": {
      "verbose": true,
      "checkContribution": true
    }
  }
}
```

## Managing Circuits

### Getting Circuit Information

```bash
# Get all circuits for a ceremony
GET /ceremonies/{ceremonyId}/circuits

# Get specific circuit details
GET /circuits/{id}

# Get circuit contributions
GET /circuits/{id}/contributions
```

### Updating Circuit Configuration

```bash
PATCH /circuits/{id}
{
  "timeoutMechanismType": "DYNAMIC",
  "dynamicThreshold": 2.0
}
```

### Circuit Statistics

Circuits track various statistics:

- **Average Contribution Time**: Average time for participants to contribute
- **Average Verification Time**: Average time to verify contributions
- **Success Rate**: Percentage of successful contributions
- **Timeout Rate**: Percentage of participants who timeout

## Circuit Artifacts

### File Management

Circuits can have associated files:

```json
{
  "files": {
    "circuit": "circuit.circom",
    "r1cs": "circuit.r1cs",
    "wasm": "circuit.wasm",
    "zkey": "circuit_0001.zkey",
    "vkey": "verification_key.json"
  }
}
```

### Artifact Storage

Brebaje provides secure storage for circuit artifacts:

- **Circuit Files**: Source code and compiled circuits
- **ZKey Files**: Trusted setup parameters
- **Verification Keys**: Keys for verifying proofs
- **Contribution Files**: Individual participant contributions

## Best Practices

### Circuit Design

- **Realistic Constraints**: Set realistic constraint counts
- **Appropriate Timeouts**: Configure timeouts based on circuit complexity
- **Clear Naming**: Use descriptive names for circuits
- **Documentation**: Document circuit purpose and requirements

### Timeout Configuration

- **Fixed Timeouts**: Use for simple, well-understood circuits
- **Dynamic Timeouts**: Use for complex circuits with variable computation times
- **Lobby Timeouts**: Use when you need manual control over participant assignment

### Monitoring

- **Track Statistics**: Monitor contribution times and success rates
- **Adjust Timeouts**: Adjust timeout settings based on actual performance
- **Handle Failures**: Have plans for handling participant timeouts

## API Reference

### Endpoints

- `GET /circuits` - List all circuits
- `POST /circuits` - Create a new circuit
- `GET /circuits/{id}` - Get circuit details
- `PATCH /circuits/{id}` - Update circuit configuration
- `DELETE /circuits/{id}` - Delete a circuit
- `GET /circuits/{id}/contributions` - Get circuit contributions

### Data Types

```typescript
type CircuitTimeoutType = "DYNAMIC" | "FIXED" | "LOBBY";

interface Circuit {
  id: number;
  ceremonyId: number;
  name: string;
  timeoutMechanismType: CircuitTimeoutType;
  dynamicThreshold?: number;
  fixedTimeWindow?: number;
  sequencePosition: number;
  zKeySizeInBytes: number;
  constraints: number;
  pot: number;
  averageContributionComputationTime?: number;
  averageFullContributionTime?: number;
  averageVerifyContributionTime?: number;
  compiler?: any;
  template?: any;
  verification?: any;
  artifacts?: any;
  metadata?: any;
  files?: any;
}
```

## Next Steps

Now that you understand circuits, you can:

- **[Participants](./participants)**: Learn about participant management
- **[Contributions](./contributions)**: Understand the contribution process
- **[User Guide - Creating Ceremonies](./../user-guide/creating-ceremony)**: Practical guide to creating ceremonies with circuits
- **[Examples - Custom Circuit](./../examples/custom-circuit)**: See examples of custom circuit configurations
