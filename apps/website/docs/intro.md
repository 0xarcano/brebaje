---
sidebar_position: 1
---

# Welcome to Brebaje

Brebaje is a comprehensive toolkit for running zero-knowledge proof trusted setup ceremonies. Built on the foundation of P0tion, Brebaje provides a robust, scalable, and user-friendly platform for coordinating and participating in trusted setup ceremonies for zk-SNARK circuits.

## What is Brebaje?

Brebaje is a fork of the P0tion project, enhanced with additional features and improvements for managing trusted setup ceremonies. It consists of:

- **Backend Service**: A NestJS-based API for managing ceremonies, participants, and contributions
- **Actions Package**: A set of utilities and helpers for CLI, website, and server commands
- **Documentation**: Comprehensive guides and API references
- **Frontend**: User interfaces for ceremony coordination and participation

## Key Features

- **Ceremony Management**: Create, configure, and monitor trusted setup ceremonies
- **Participant Coordination**: Manage participant registration, contribution tracking, and verification
- **Circuit Support**: Support for various zk-SNARK circuit formats and compilers
- **Real-time Monitoring**: Track ceremony progress and participant status in real-time
- **Security**: Built-in security measures for contribution verification and fraud prevention
- **Scalability**: Designed to handle large-scale ceremonies with many participants

## Quick Start

Get started with Brebaje in minutes:

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

## What's Next?

- **[Installation Guide](./getting-started/installation)**: Set up Brebaje on your system
- **[Quick Start](./getting-started/quickstart)**: Run your first ceremony
- **[Core Concepts](./concepts/trusted-setup)**: Understand the fundamentals of trusted setup ceremonies
- **[API Reference](./api/backend-api)**: Explore the backend API endpoints

## Community

- **Discord**: Join our [Discord server](https://discord.gg/brebaje) for discussions and support
- **GitHub**: Contribute to the project on [GitHub](https://github.com/NicoSerranoP/brebaje)
- **Twitter**: Follow us on [Twitter](https://twitter.com/brebaje_zk) for updates

## License

Brebaje is licensed under the MIT License. See the [LICENSE](https://github.com/NicoSerranoP/brebaje/blob/main/LICENSE) file for details.
