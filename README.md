# Recite Right — Quran Recitation Backend API

A production-ready RESTful API for Quran recitation tracking, built with Node.js, Express, and MongoDB. Features JWT-based authentication, role-based access control, compound database indexing, and 90%+ test coverage.

Built on the [node-express-boilerplate](https://github.com/hagopj13/node-express-boilerplate) for infrastructure setup, with custom business logic, models, and API design implemented from scratch.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB (Mongoose ODM) |
| Auth | JWT (Access + Refresh tokens) |
| Validation | Joi |
| Testing | Jest + Supertest |
| Linting | ESLint + Prettier + Husky |
| CI | Travis CI |
| Containerization | Docker + Docker Compose |

## Features

- **JWT Authentication** — Access and refresh token flow with secure cookie handling
- **Role-Based Access Control** — Admin, User, and custom roles with route-level enforcement
- **Compound Indexing** — Optimized MongoDB queries with multi-field indexes for fast lookups
- **Input Validation** — Request validation using Joi schemas on all endpoints
- **Error Handling** — Centralized error middleware with structured JSON error responses
- **Pagination & Filtering** — Built-in query parameter support for list endpoints
- **Test Coverage 90%+** — Unit and integration tests with Jest and Supertest
- **Docker Ready** — Multi-stage Docker builds with separate dev/test/prod configurations
- **API Documentation** — Auto-generated Swagger docs
- **Code Quality** — ESLint + Prettier with pre-commit hooks via Husky

## Quick Start

```bash
# Clone
git clone https://github.com/fardanahmed/recite-right.git
cd recite-right

# Install
npm install

# Configure
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Run
npm run dev
```

## Project Structure

```
src/
├── config/         # Environment config, logging, Morgan setup
├── controllers/    # Route handlers
├── middlewares/     # Auth, validation, error handling
├── models/         # Mongoose schemas with compound indexes
├── routes/         # Express route definitions
├── services/       # Business logic layer
├── utils/          # Helpers (pagination, token generation)
└── validations/    # Joi validation schemas
tests/
├── integration/    # API endpoint tests
└── unit/           # Service-level tests
```

## Testing

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run coverage      # Coverage report
```

## Docker

```bash
docker-compose up                           # Development
docker-compose -f docker-compose.prod.yml up  # Production
docker-compose -f docker-compose.test.yml up  # Tests
```

## License

MIT
