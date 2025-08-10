---
sidebar_position: 1
---

# Trusted Setup Ceremonies

Trusted setup ceremonies are fundamental to the security of many zero-knowledge proof systems. This page explains what they are, why they're necessary, and how they work.

## What is a Trusted Setup?

A trusted setup is a cryptographic protocol that generates the public parameters needed for zero-knowledge proof systems like zk-SNARKs. These parameters are essential for creating and verifying proofs, but they must be generated in a way that ensures no single party knows the secret values that could compromise the system's security.

## Why are Trusted Setups Necessary?

### The Problem

Many zk-SNARK systems require a "common reference string" (CRS) or "structured reference string" (SRS) that contains secret values. If anyone knows these secret values, they can:

- Create fake proofs that appear valid
- Extract private information from valid proofs
- Compromise the entire system's security

### The Solution

A trusted setup ceremony distributes the knowledge of these secret values across multiple participants. The security assumption is that at least one participant is honest and destroys their secret material after the ceremony.

## How Trusted Setup Ceremonies Work

### Multi-Party Computation

Trusted setup ceremonies use multi-party computation (MPC) techniques where:

1. **Initial Setup**: The first participant generates the initial parameters
2. **Sequential Contributions**: Each subsequent participant updates the parameters
3. **Final Parameters**: The final parameters are used by the system

### The Contribution Process

Each participant in the ceremony:

1. **Downloads** the current state from the previous participant
2. **Computes** their contribution using their secret randomness
3. **Uploads** the updated state
4. **Verifies** that their contribution was correctly applied

### Mathematical Foundation

The ceremony is based on the principle that if we have a sequence of updates:

```
S₀ → S₁ → S₂ → ... → Sₙ
```

Where each Sᵢ is computed from Sᵢ₋₁ using participant i's secret randomness, then:

- No single participant knows the complete secret
- The final parameters Sₙ are secure if at least one participant was honest
- All intermediate states are publicly verifiable

## Types of Trusted Setups

### Phase 1 (Powers of Tau)

Phase 1 ceremonies generate the basic structured reference string needed for many zk-SNARK systems. These are:

- **Universal**: Can be used for many different circuits
- **Reusable**: Can be used multiple times
- **Large Scale**: Often involve hundreds or thousands of participants

### Phase 2 (Circuit-Specific)

Phase 2 ceremonies are specific to particular circuits and:

- **Use Phase 1 Output**: Build on the results of Phase 1 ceremonies
- **Circuit-Specific**: Generate parameters for specific applications
- **Smaller Scale**: Usually involve fewer participants

## Security Properties

### Trust Distribution

The security of a trusted setup ceremony relies on the assumption that at least one participant is honest. This is often called the "honest majority" assumption.

### Public Verifiability

All contributions in a trusted setup ceremony are publicly verifiable. Anyone can:

- Check that each contribution was computed correctly
- Verify that the final parameters are valid
- Audit the entire ceremony process

### Transparency

The entire ceremony process is transparent:

- All intermediate states are public
- All verification steps are documented
- Anyone can reproduce the verification

## Brebaje's Approach

Brebaje provides a comprehensive platform for running trusted setup ceremonies with:

### Automated Management

- **State Tracking**: Automatically tracks ceremony and participant states
- **Timeout Handling**: Manages participants who don't complete in time
- **Verification**: Automatically verifies contributions
- **Monitoring**: Real-time monitoring of ceremony progress

### Flexible Configuration

- **Multiple Timeout Types**: Support for fixed, dynamic, and lobby timeouts
- **Circuit Support**: Support for various circuit formats
- **Scalability**: Designed to handle large-scale ceremonies

### Security Features

- **Contribution Verification**: All contributions are verified before acceptance
- **Fraud Prevention**: Built-in mechanisms to prevent and detect fraud
- **Audit Trail**: Complete audit trail of all ceremony activities

## Best Practices

### Participant Selection

- **Diversity**: Include participants from different backgrounds and organizations
- **Reputation**: Consider the reputation and trustworthiness of participants
- **Technical Capability**: Ensure participants have the technical ability to contribute

### Ceremony Design

- **Timeline**: Set realistic timelines for the ceremony
- **Timeout Configuration**: Configure appropriate timeout mechanisms
- **Backup Plans**: Have backup participants in case of dropouts

### Monitoring

- **Real-time Monitoring**: Monitor the ceremony progress in real-time
- **Verification**: Verify all contributions as they come in
- **Communication**: Maintain clear communication with participants

## Next Steps

Now that you understand trusted setup ceremonies, you can:

- **[Ceremonies](./ceremonies)**: Learn how to create and manage ceremonies
- **[Circuits](./circuits)**: Understand circuit configuration
- **[Participants](./participants)**: Learn about participant management
- **[Contributions](./contributions)**: Understand the contribution process
