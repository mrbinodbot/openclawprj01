# API Documentation

Future API reference and specifications for OpenClaw Project 01 backend.

## Overview

This document outlines the planned API structure and endpoints for the backend service. Currently, the backend contains a simple utility function. As the project scales, these endpoints will be implemented.

## Current State

**Backend Status**: Basic utility functions only
- Entry point: `app.py`
- Current function: `greet(name: str) -> str`

## Planned API Structure

### Base URL

```
Development:  http://localhost:8000/api
Production:   https://api.openclawprj01.com
```

### Authentication

Future implementation will use JWT tokens:

```
Authorization: Bearer <jwt_token>
```

### Response Format

Standard JSON response format:

```json
{
  "success": true,
  "data": {},
  "message": "Operation successful",
  "timestamp": "2026-02-14T12:00:00Z"
}
```

Error response:

```json
{
  "success": false,
  "error": "Error code",
  "message": "Human readable error message",
  "timestamp": "2026-02-14T12:00:00Z"
}
```

## Planned Endpoints

### Todos Management

#### Get All Todos

```http
GET /api/todos
Authorization: Bearer <token>
```

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | integer | 1 | Page number for pagination |
| limit | integer | 20 | Items per page |
| filter | string | all | Filter by status: `all`, `active`, `completed` |
| sort | string | -created_at | Sort field (prefix `-` for descending) |

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "todos": [
      {
        "id": "uuid",
        "text": "Buy groceries",
        "completed": false,
        "created_at": "2026-02-14T12:00:00Z",
        "updated_at": "2026-02-14T12:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 42,
      "pages": 3
    }
  }
}
```

#### Get Single Todo

```http
GET /api/todos/:id
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "text": "Buy groceries",
    "completed": false,
    "created_at": "2026-02-14T12:00:00Z",
    "updated_at": "2026-02-14T12:00:00Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": "NOT_FOUND",
  "message": "Todo not found"
}
```

#### Create Todo

```http
POST /api/todos
Authorization: Bearer <token>
Content-Type: application/json

{
  "text": "Buy groceries"
}
```

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| text | string | Yes | Todo description (1-500 chars) |

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "text": "Buy groceries",
    "completed": false,
    "created_at": "2026-02-14T12:00:00Z",
    "updated_at": "2026-02-14T12:00:00Z"
  },
  "message": "Todo created successfully"
}
```

**Validation Error (400):**
```json
{
  "success": false,
  "error": "VALIDATION_ERROR",
  "message": "Text is required and must be 1-500 characters",
  "details": {
    "text": ["must be 1-500 characters"]
  }
}
```

#### Update Todo

```http
PATCH /api/todos/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "text": "Buy groceries and cook dinner",
  "completed": false
}
```

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| text | string | No | Updated todo description |
| completed | boolean | No | Toggle completion status |

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "text": "Buy groceries and cook dinner",
    "completed": false,
    "created_at": "2026-02-14T12:00:00Z",
    "updated_at": "2026-02-14T12:00:00Z"
  },
  "message": "Todo updated successfully"
}
```

#### Delete Todo

```http
DELETE /api/todos/:id
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Todo deleted successfully"
}
```

#### Bulk Delete Todos

```http
DELETE /api/todos
Authorization: Bearer <token>
Content-Type: application/json

{
  "ids": ["uuid1", "uuid2", "uuid3"]
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "deleted": 3
  },
  "message": "3 todos deleted successfully"
}
```

---

### User Management (Future)

#### Register

```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "secure_password"
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "secure_password"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGc...",
    "user": {
      "id": "uuid",
      "username": "john_doe",
      "email": "john@example.com"
    }
  }
}
```

#### Get Current User

```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### Logout

```http
POST /api/auth/logout
Authorization: Bearer <token>
```

---

### Utility Endpoints

#### Health Check

```http
GET /api/health
```

**Response (200):**
```json
{
  "status": "healthy",
  "timestamp": "2026-02-14T12:00:00Z",
  "uptime": 3600
}
```

#### Greeting (Current)

```http
POST /api/greet
Content-Type: application/json

{
  "name": "Alice"
}
```

**Response (200):**
```json
{
  "message": "Hello, Alice!"
}
```

---

## Error Codes

| Code | HTTP Status | Description |
|------|------------|-------------|
| VALIDATION_ERROR | 400 | Request validation failed |
| UNAUTHORIZED | 401 | Missing or invalid authentication |
| FORBIDDEN | 403 | Insufficient permissions |
| NOT_FOUND | 404 | Resource not found |
| CONFLICT | 409 | Resource already exists |
| RATE_LIMIT | 429 | Too many requests |
| SERVER_ERROR | 500 | Internal server error |
| SERVICE_UNAVAILABLE | 503 | Service temporarily unavailable |

---

## Rate Limiting

Future implementation will include rate limiting:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1645294800
```

**Limits:**
- Anonymous: 100 req/hour
- Authenticated: 1000 req/hour
- Premium: 10000 req/hour

---

## Pagination

List endpoints support cursor-based pagination:

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)

**Response Metadata:**
```json
{
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 42,
    "pages": 3,
    "has_next": true,
    "has_prev": false
  }
}
```

---

## Filtering & Sorting

### Filtering

Supported filter formats:

```
GET /api/todos?filter[completed]=true
GET /api/todos?filter[created_at][$gte]=2026-02-01
GET /api/todos?filter[created_at][$lte]=2026-02-28
```

### Sorting

Sort by multiple fields:

```
GET /api/todos?sort=-created_at,text
```

Prefix with `-` for descending order.

---

## Versioning

API versions will be managed via URL:

```
GET /api/v1/todos
GET /api/v2/todos
```

Current version: **v1** (planned)

---

## CORS Policy

Future CORS policy:

```
Access-Control-Allow-Origin: https://openclawprj01.com
Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400
```

---

## Implementation Timeline

### Phase 1 (Q1 2026)
- [ ] Basic CRUD endpoints for todos
- [ ] Authentication system
- [ ] Input validation

### Phase 2 (Q2 2026)
- [ ] Advanced filtering & sorting
- [ ] Pagination
- [ ] Rate limiting

### Phase 3 (Q3 2026)
- [ ] User management
- [ ] Sharing/collaboration
- [ ] API documentation (Swagger)

---

## Testing the API

### Using cURL

```bash
# Create todo
curl -X POST http://localhost:8000/api/todos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer token" \
  -d '{"text": "Buy milk"}'

# Get todos
curl -X GET http://localhost:8000/api/todos \
  -H "Authorization: Bearer token"

# Update todo
curl -X PATCH http://localhost:8000/api/todos/uuid \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer token" \
  -d '{"completed": true}'

# Delete todo
curl -X DELETE http://localhost:8000/api/todos/uuid \
  -H "Authorization: Bearer token"
```

### Using Postman

1. Import the `postman_collection.json` (to be created)
2. Set environment variables:
   - `base_url`: `http://localhost:8000`
   - `token`: Your JWT token
3. Run requests from the collection

### Using REST Client (VS Code)

Create `requests.rest`:

```http
### Create Todo
POST http://localhost:8000/api/todos
Content-Type: application/json
Authorization: Bearer {{token}}

{
  "text": "Buy groceries"
}

### Get All Todos
GET http://localhost:8000/api/todos
Authorization: Bearer {{token}}

### Update Todo
PATCH http://localhost:8000/api/todos/{{todo_id}}
Content-Type: application/json
Authorization: Bearer {{token}}

{
  "text": "Buy groceries and cook",
  "completed": false
}

### Delete Todo
DELETE http://localhost:8000/api/todos/{{todo_id}}
Authorization: Bearer {{token}}
```

---

## Changelog

### Version 1.0.0 (Planned)
- Initial API release
- Basic CRUD operations
- JWT authentication

---

For implementation details and backend setup, see:
- [DEVELOPMENT.md](DEVELOPMENT.md) - Development guide
- [ARCHITECTURE.md](ARCHITECTURE.md) - Architecture overview
- [README.md](README.md) - Project overview
