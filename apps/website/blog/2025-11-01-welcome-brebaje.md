---
slug: welcome-brebaje
title: Welcome to Brebaje - Zero-Knowledge Trusted Setup Ceremony Toolkit
tags: [announcement, zero-knowledge, trusted-setup, zk-snarks]
---

We're excited to announce **Brebaje**, a comprehensive toolkit for running zero-knowledge proof trusted setup ceremonies. Built on the foundation of P0tion, Brebaje provides a robust, scalable, and user-friendly platform for coordinating and participating in trusted setup ceremonies for zk-SNARK circuits.

<!-- truncate -->

## What is Brebaje?

Brebaje is a fork of the P0tion project, enhanced with additional features and improvements for managing trusted setup ceremonies. It consists of:

- **Backend Service**: A NestJS-based API for managing ceremonies, participants, and contributions
- **Actions Package**: A set of utilities and helpers for CLI, website, and server commands
- **Documentation**: Comprehensive guides and API references
- **Frontend**: User interfaces for ceremony coordination and participation

## Why Trusted Setup Ceremonies?

Trusted setup ceremonies are fundamental to the security of many zero-knowledge proof systems. They ensure that the cryptographic parameters needed for zk-SNARKs are generated in a way that no single party knows the secret values that could compromise the system's security.

The security assumption is simple: if at least one participant in the ceremony is honest and destroys their secret material, the system remains secure.

## Key Features

### Ceremony Management

- **Create and Configure**: Easily create and configure trusted setup ceremonies
- **State Tracking**: Automatic tracking of ceremony and participant states
- **Real-time Monitoring**: Monitor ceremony progress in real-time
- **Flexible Configuration**: Support for various timeout mechanisms and circuit types

### Participant Coordination

- **Registration System**: Streamlined participant registration and management
- **Progress Tracking**: Real-time tracking of participant contribution progress
- **Timeout Handling**: Automatic handling of participant timeouts
- **Verification**: Built-in verification of all contributions

### Security Features

- **Contribution Verification**: All contributions are automatically verified
- **Fraud Prevention**: Built-in mechanisms to prevent and detect fraud
- **Audit Trail**: Complete audit trail of all ceremony activities
- **Transparency**: All contributions are publicly verifiable

### Scalability

- **Large-scale Ceremonies**: Designed to handle ceremonies with hundreds of participants
- **Multiple Circuits**: Support for ceremonies with multiple circuits
- **Performance Optimization**: Optimized for high-performance contribution processing
- **Distributed Architecture**: Built for distributed deployment

## Getting Started

Getting started with Brebaje is straightforward:

```bash
# Clone the repository
git clone https://github.com/p0tion-tools/brebaje.git
cd brebaje

# Install dependencies
pnpm install

# Start the backend service
cd apps/backend
pnpm run start:dev

# Start the documentation website
cd ../website
pnpm run start
```

## Documentation

We've created comprehensive documentation to help you get started:

- **[Getting Started](./../docs/getting-started/installation)**: Installation and setup guide
- **[Quick Start](./../docs/getting-started/quickstart)**: Run your first ceremony in minutes
- **[Core Concepts](./../docs/concepts/trusted-setup)**: Understand trusted setup ceremonies
- **[API Reference](./../docs/api/backend-api)**: Complete API documentation
- **[Examples](./../docs/examples/basic-ceremony)**: Practical examples and tutorials

## Community

Brebaje is an open-source project, and we welcome contributions from the community:

- **Discord**: Join our [Discord server](https://discord.gg/brebaje) for discussions and support
- **GitHub**: Contribute to the project on [GitHub](https://github.com/NicoSerranoP/brebaje)
- **Twitter**: Follow us on [Twitter](https://twitter.com/brebaje_zk) for updates

## What's Next?

This is just the beginning for Brebaje. We have exciting plans for the future:

- **Enhanced Frontend**: Improved user interfaces for ceremony coordination
- **Additional Circuit Support**: Support for more circuit formats and compilers
- **Advanced Analytics**: Detailed analytics and reporting features
- **Integration Ecosystem**: Integrations with popular zk-SNARK tools and frameworks

## Acknowledgments

Brebaje builds on the excellent work of the P0tion project. We'd like to thank the original P0tion team for their contributions to the zero-knowledge ecosystem.

## Get Involved

Whether you're a developer looking to contribute, a researcher interested in trusted setup ceremonies, or someone who wants to learn more about zero-knowledge proofs, we'd love to hear from you.

- **Try Brebaje**: Follow our [quick start guide](./../docs/getting-started/quickstart)
- **Report Issues**: Help us improve by reporting bugs on [GitHub](https://github.com/NicoSerranoP/brebaje/issues)
- **Contribute**: Submit pull requests and help shape the future of Brebaje
- **Spread the Word**: Share Brebaje with your network and help grow the community

We're excited to see what the community will build with Brebaje. Let's make trusted setup ceremonies more accessible, secure, and efficient together!

---

_Brebaje is licensed under the MIT License. See the [LICENSE](https://github.com/NicoSerranoP/brebaje/blob/main/LICENSE) file for details._
