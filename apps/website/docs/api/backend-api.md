---
sidebar_position: 1
---

# Backend API Reference

This page provides comprehensive documentation for the Brebaje backend API endpoints.

## Base URL

All API endpoints are relative to the base URL of your Brebaje backend service:

```
http://localhost:3000
```

## Authentication

Most endpoints require authentication. Include your authentication token in the request headers:

```bash
Authorization: Bearer <your-token>
```

## Response Format

All API responses follow a consistent format:

### Success Response

```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation completed successfully"
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description",
    "details": {}
  }
}
```

## Projects API

### List Projects

```bash
GET /projects
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "My ZK Project",
      "contact": "your-email@example.com",
      "coordinatorId": 1
    }
  ]
}
```

### Create Project

```bash
POST /projects
Content-Type: application/json

{
  "name": "My ZK Project",
  "contact": "your-email@example.com",
  "coordinatorId": 1
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "My ZK Project",
    "contact": "your-email@example.com",
    "coordinatorId": 1
  }
}
```

### Get Project

```bash
GET /projects/{id}
```

### Update Project

```bash
PATCH /projects/{id}
Content-Type: application/json

{
  "name": "Updated Project Name"
}
```

### Delete Project

```bash
DELETE /projects/{id}
```

## Ceremonies API

### List Ceremonies

```bash
GET /ceremonies
```

**Query Parameters:**

- `projectId` (optional): Filter by project ID
- `state` (optional): Filter by ceremony state
- `limit` (optional): Number of results to return
- `offset` (optional): Number of results to skip

### Create Ceremony

```bash
POST /ceremonies
Content-Type: application/json

{
  "projectId": 1,
  "description": "My trusted setup ceremony",
  "start_date": 1640995200,
  "end_date": 1643673600,
  "penalty": 3600,
  "authProviders": ["discord", "github"]
}
```

**Required Fields:**

- `projectId`: ID of the project
- `description`: Human-readable description
- `start_date`: Unix timestamp when ceremony starts
- `end_date`: Unix timestamp when ceremony ends
- `penalty`: Timeout penalty in seconds

**Optional Fields:**

- `authProviders`: Array of authentication providers

### Get Ceremony

```bash
GET /ceremonies/{id}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "projectId": 1,
    "description": "My trusted setup ceremony",
    "state": "OPENED",
    "start_date": 1640995200,
    "end_date": 1643673600,
    "penalty": 3600,
    "authProviders": ["discord", "github"]
  }
}
```

### Update Ceremony State

```bash
PATCH /ceremonies/{id}
Content-Type: application/json

{
  "state": "OPENED"
}
```

**Valid States:**

- `SCHEDULED`
- `OPENED`
- `PAUSED`
- `CLOSED`
- `CANCELED`
- `FINALIZED`

### Delete Ceremony

```bash
DELETE /ceremonies/{id}
```

### Get Ceremony Participants

```bash
GET /ceremonies/{id}/participants
```

### Get Ceremony Circuits

```bash
GET /ceremonies/{id}/circuits
```

### Get Ceremony Contributions

```bash
GET /ceremonies/{id}/contributions
```

## Circuits API

### List Circuits

```bash
GET /circuits
```

**Query Parameters:**

- `ceremonyId` (optional): Filter by ceremony ID
- `limit` (optional): Number of results to return
- `offset` (optional): Number of results to skip

### Create Circuit

```bash
POST /circuits
Content-Type: application/json

{
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
}
```

**Required Fields:**

- `ceremonyId`: ID of the ceremony
- `name`: Human-readable name
- `timeoutMechanismType`: Type of timeout mechanism
- `sequencePosition`: Order in the ceremony
- `zKeySizeInBytes`: Expected size of zKey files
- `constraints`: Number of constraints
- `pot`: Power of Tau

### Get Circuit

```bash
GET /circuits/{id}
```

### Update Circuit

```bash
PATCH /circuits/{id}
Content-Type: application/json

{
  "timeoutMechanismType": "DYNAMIC",
  "dynamicThreshold": 1.5
}
```

### Delete Circuit

```bash
DELETE /circuits/{id}
```

### Get Circuit Contributions

```bash
GET /circuits/{id}/contributions
```

### Get Current ZKey

```bash
GET /circuits/{id}/current-zkey
```

**Response:**

```json
{
  "success": true,
  "data": {
    "zkeyFile": "circuit_0001.zkey",
    "zkeyIndex": 1,
    "downloadUrl": "https://storage.example.com/circuit_0001.zkey"
  }
}
```

## Participants API

### List Participants

```bash
GET /participants
```

**Query Parameters:**

- `ceremonyId` (optional): Filter by ceremony ID
- `status` (optional): Filter by participant status
- `limit` (optional): Number of results to return
- `offset` (optional): Number of results to skip

### Create Participant

```bash
POST /participants
Content-Type: application/json

{
  "userId": 1,
  "ceremonyId": 1,
  "status": "CREATED"
}
```

**Required Fields:**

- `userId`: ID of the user
- `ceremonyId`: ID of the ceremony
- `status`: Initial status

### Get Participant

```bash
GET /participants/{id}
```

### Update Participant

```bash
PATCH /participants/{id}
Content-Type: application/json

{
  "status": "READY",
  "contributionStep": "DOWNLOADING"
}
```

**Valid Statuses:**

- `CREATED`
- `WAITING`
- `READY`
- `CONTRIBUTING`
- `CONTRIBUTED`
- `DONE`
- `FINALIZING`
- `FINALIZED`
- `TIMEDOUT`
- `EXHUMED`

**Valid Contribution Steps:**

- `DOWNLOADING`
- `COMPUTING`
- `UPLOADING`
- `VERIFYING`
- `COMPLETED`

### Delete Participant

```bash
DELETE /participants/{id}
```

## Contributions API

### List Contributions

```bash
GET /contributions
```

**Query Parameters:**

- `circuitId` (optional): Filter by circuit ID
- `participantId` (optional): Filter by participant ID
- `valid` (optional): Filter by validity
- `limit` (optional): Number of results to return
- `offset` (optional): Number of results to skip

### Create Contribution

```bash
POST /circuits/{circuitId}/contributions
Content-Type: multipart/form-data

{
  "zkeyFile": <file>,
  "participantId": 1,
  "contributionComputationTime": 1800,
  "fullContributionTime": 2400
}
```

**Required Fields:**

- `zkeyFile`: The contribution file
- `participantId`: ID of the participant
- `contributionComputationTime`: Time spent computing
- `fullContributionTime`: Total contribution time

### Get Contribution

```bash
GET /contributions/{id}
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
    "verifyContributionTime": 120,
    "zkeyIndex": 1,
    "valid": true,
    "lastUpdated": 1640995200,
    "files": {
      "zkey": "circuit_0002.zkey",
      "contributionHash": "sha256:abc123..."
    },
    "verificationSoftware": {
      "type": "snarkjs",
      "version": "0.7.0"
    }
  }
}
```

### Update Contribution

```bash
PATCH /contributions/{id}
Content-Type: application/json

{
  "valid": false,
  "verificationSoftware": {
    "type": "snarkjs",
    "version": "0.7.0"
  }
}
```

### Delete Contribution

```bash
DELETE /contributions/{id}
```

### Verify Contribution

```bash
POST /contributions/{id}/verify
Content-Type: application/json

{
  "verificationSoftware": {
    "type": "snarkjs",
    "version": "0.7.0"
  }
}
```

## Users API

### List Users

```bash
GET /users
```

### Create User

```bash
POST /users
Content-Type: application/json

{
  "displayName": "John Doe",
  "provider": "discord"
}
```

### Get User

```bash
GET /users/{id}
```

### Update User

```bash
PATCH /users/{id}
Content-Type: application/json

{
  "displayName": "Updated Name"
}
```

### Delete User

```bash
DELETE /users/{id}
```

## Error Codes

### Common Error Codes

- `400`: Bad Request - Invalid request data
- `401`: Unauthorized - Authentication required
- `403`: Forbidden - Insufficient permissions
- `404`: Not Found - Resource not found
- `409`: Conflict - Resource conflict
- `422`: Unprocessable Entity - Validation error
- `500`: Internal Server Error - Server error

### Validation Errors

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": {
      "field": "description",
      "message": "Description is required"
    }
  }
}
```

## Rate Limiting

API requests are rate-limited to prevent abuse:

- **Authentication**: 100 requests per minute
- **General API**: 1000 requests per minute
- **File Uploads**: 10 requests per minute

Rate limit headers are included in responses:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## Pagination

List endpoints support pagination:

```bash
GET /ceremonies?limit=10&offset=20
```

**Response:**

```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "limit": 10,
    "offset": 20,
    "total": 100,
    "hasMore": true
  }
}
```

## Webhooks

Brebaje supports webhooks for real-time notifications:

### Configure Webhook

```bash
POST /webhooks
Content-Type: application/json

{
  "url": "https://your-app.com/webhook",
  "events": ["ceremony.opened", "participant.contributed"],
  "secret": "your-webhook-secret"
}
```

### Webhook Events

- `ceremony.opened`: Ceremony state changed to OPENED
- `ceremony.closed`: Ceremony state changed to CLOSED
- `participant.contributed`: Participant completed contribution
- `participant.timedout`: Participant timed out
- `contribution.verified`: Contribution verification completed

## Next Steps

- **[Actions API](./actions)**: Documentation for the actions package
- **[Types](./types)**: TypeScript type definitions
- **[Examples](./../examples/basic-ceremony)**: API usage examples
