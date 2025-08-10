---
sidebar_position: 3
---

# Core Concepts Overview

This page provides a high-level overview of the key concepts in Brebaje and trusted setup ceremonies.

## What are Zero-Knowledge Proofs?

Zero-knowledge proofs (ZKPs) are cryptographic protocols that allow one party (the prover) to prove to another party (the verifier) that a statement is true without revealing any additional information beyond the validity of the statement itself.

## What is a Trusted Setup Ceremony?

A trusted setup ceremony is a collaborative process where multiple participants contribute to generating the cryptographic parameters needed for zero-knowledge proof systems. The goal is to ensure that no single party knows the secret parameters that could compromise the security of the system.

### Why Trusted Setup?

- **Security**: Distributes trust across multiple participants
- **Transparency**: All contributions are publicly verifiable
- **Decentralization**: No single point of failure or control

## Key Components in Brebaje

### Projects

A project represents a collection of related ceremonies. Projects help organize ceremonies by purpose, team, or application.

### Ceremonies

A ceremony is the main unit of work in Brebaje. It represents a complete trusted setup process with:

- **State Management**: Tracks the current phase of the ceremony
- **Participant Management**: Handles registration and contribution tracking
- **Circuit Management**: Manages the circuits being processed
- **Timeline**: Defines start and end dates

### Circuits

A circuit represents a specific zk-SNARK circuit that needs trusted setup parameters. Circuits have:

- **Metadata**: Name, size, constraints count
- **Timeout Configuration**: How long participants have to contribute
- **Verification Rules**: How contributions are validated
- **Artifacts**: Associated files and parameters

### Participants

Participants are individuals or entities that contribute to the ceremony:

- **Registration**: Participants must register before contributing
- **Status Tracking**: Monitor contribution progress
- **Verification**: Ensure contributions are valid
- **Timeout Handling**: Manage participants who don't complete in time

### Contributions

Contributions are the actual cryptographic work performed by participants:

- **Download**: Get the current state from the previous participant
- **Compute**: Perform the cryptographic operations
- **Upload**: Submit the new state
- **Verify**: Validate the contribution

## Ceremony States

Ceremonies progress through several states:

1. **SCHEDULED**: Ceremony is created but not yet open
2. **OPENED**: Ceremony is accepting participants
3. **PAUSED**: Ceremony is temporarily paused
4. **CLOSED**: Ceremony is no longer accepting new participants
5. **CANCELED**: Ceremony has been canceled
6. **FINALIZED**: Ceremony is complete

## Participant States

Participants have their own state machine:

1. **CREATED**: Participant is registered
2. **WAITING**: Waiting for their turn to contribute
3. **READY**: Ready to start contribution
4. **CONTRIBUTING**: Currently performing contribution
5. **CONTRIBUTED**: Contribution completed
6. **DONE**: All work for this participant is complete
7. **FINALIZING**: Finalizing the ceremony
8. **FINALIZED**: Participant's role is complete
9. **TIMEDOUT**: Participant failed to complete in time
10. **EXHUMED**: Participant was replaced due to timeout

## Contribution Steps

During contribution, participants go through these steps:

1. **DOWNLOADING**: Downloading the current state
2. **COMPUTING**: Performing cryptographic operations
3. **UPLOADING**: Uploading the new state
4. **VERIFYING**: Verifying the contribution
5. **COMPLETED**: Contribution is complete

## Security Considerations

### Trust Distribution

The security of a trusted setup ceremony relies on the assumption that at least one participant is honest and destroys their secret material.

### Verification

All contributions are publicly verifiable, allowing anyone to check that the ceremony was conducted correctly.

### Timeout Mechanisms

Brebaje supports multiple timeout mechanisms:

- **FIXED**: Fixed time window for each participant
- **DYNAMIC**: Dynamic timeout based on previous contributions
- **LOBBY**: Participants wait in a lobby before contributing

## Next Steps

Now that you understand the core concepts, you can:

- **[Trusted Setup Deep Dive](./../concepts/trusted-setup)**: Learn more about trusted setup ceremonies
- **[Ceremonies](./../concepts/ceremonies)**: Understand ceremony management
- **[Circuits](./../concepts/circuits)**: Learn about circuit configuration
- **[Participants](./../concepts/participants)**: Understand participant management
