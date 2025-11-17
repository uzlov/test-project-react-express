# Flumotion Test API

RESTful API for managing media content with TypeScript, Express, and comprehensive testing.

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Requirements](#-requirements)
- [Installation](#-installation)
- [Configuration](#️-configuration)
- [Running the Application](#-running-the-application)
- [API Endpoints](#-api-endpoints)
- [Testing](#-testing)
- [Project Structure](#-project-structure)
- [Development](#-development)

## 🎯 Overview

This API provides endpoints for managing media resources including videos, thumbnails, and metadata. It features request validation, CORS support, and comprehensive error handling.

## 🛠 Tech Stack

- **Runtime:** Node.js >=23.0.0
- **Framework:** Express 5.x
- **Language:** TypeScript
- **Testing:** Vitest
- **Validation:** jet-validators
- **Security:** Helmet, CORS
- **Logger:** jet-logger
- **Environment:** native node + dotenv (for tests only)

## 📦 Requirements

- Node.js >= 23.0.0
- npm or yarn

## 🚀 Installation

```bash
# Navigate to the API directory
cd api

# Install dependencies
npm install

# Or clean install
npm run clean-install
```

## ⚙️ Configuration

The application uses environment-specific configuration files located in [`config/`](config):

- `.env.development` - Development environment
- `.env.production` - Production environment
- `.env.test` - Test environment

### Environment Variables

```bash
# Server Configuration
NODE_ENV=development
PORT=3000
HOST=localhost
DISABLE_HELMET=TRUE

# Media URLs
MEDIAROUTE_BASE_URL=https://storagecdn.codev8.net/ondemand/b4ab8f95-bc2b-4d88-8ff0-df4df19d206c/
THUMBNAILROUTE_BASE_URL=https://progressive.codev8.net/userdatanew/b4ab8f95-bc2b-4d88-8ff0-df4df19d206c/thumbnails/

# CORS
CORS_ORIGIN=*

# Logging (jet-logger)
JET_LOGGER_MODE=CONSOLE
JET_LOGGER_FILEPATH=jet-logger.log
JET_LOGGER_TIMESTAMP=TRUE
JET_LOGGER_FORMAT=LINE
```

## 🏃 Running the Application

### Development Mode

```bash
# Standard development mode
npm run dev

# Hot reload mode (recommended)
npm run dev:hot
```

### Production Mode

```bash
# Build the project
npm run build

# Start production server
npm start
```

The server will be available at `http://localhost:3000`

## 📡 API Endpoints

### Base URL
```
http://localhost:3000
```

### Media Endpoints

#### Get All Media

Retrieves all media items.

**Endpoint:** `GET /getmedias`

**Response:**
```json
{
  "medias": [
    {
      "id": "63d4ec71-5df7-4a0e-9216-2510d47649e5",
      "title": "Plane sample",
      "description": "Despegue ligero",
      "duration": 1759,
      "tags": "Vuelo, Aviones, Piloto",
      "filedata": {
        "bitrate": 1500,
        "fileSize": 361993216,
        "filename": "63d4ec71-5df7-4a0e-9216-2510d47649e5_Fast_H1500.mp4"
      },
      "thumbnail": {
        "id": "45e237c6-41be-40ec-9e20-0ae3c0bc2b52",
        "name": "thumbnail-media-63d4ec71-5df7-4a0e-9216-2510d47649e5",
        "filename": "63d4ec71-5df7-4a0e-9216-2510d47649e5_3.jpg",
        "thumbnailroute": "..."
      },
      "mediaroute": "..."
    }
  ]
}
```

**Example:**
```bash
curl http://localhost:3000/getmedias
```

#### Add Media

Creates a new media item.

**Endpoint:** `POST /addmedias`

**Request Body:**
```json
{
  "media": {
    "id": "63d4ec71-5df7-4a0e-9216-2510d47649e5",
    "title": "Plane sample",
    "description": "Despegue ligero",
    "duration": 1759,
    "tags": "Vuelo, Aviones, Piloto",
    "filedata": {
      "bitrate": 1500,
      "fileSize": 361993216,
      "filename": "63d4ec71-5df7-4a0e-9216-2510d47649e5_Fast_H1500.mp4"
    },
    "thumbnail": {
      "id": "45e237c6-41be-40ec-9e20-0ae3c0bc2b52",
      "name": "thumbnail-media-63d4ec71-5df7-4a0e-9216-2510d47649e5",
      "filename": "63d4ec71-5df7-4a0e-9216-2510d47649e5_3.jpg"
    }
  }
}
```

**Response:** `201 Created`

**Example:**
```bash
curl -X POST http://localhost:3000/addmedias \
-H "Content-Type: application/json" \
-d '{
  "media": {
    "id": "63d4ec71-5df7-4a0e-9216-2510d47649e5",
    "title": "Plane sample",
    "description": "Despegue ligero",
    "duration": 1759,
    "tags": "Vuelo, Aviones, Piloto",
    "filedata": {
      "bitrate": 1500,
      "fileSize": 361993216,
      "filename": "63d4ec71-5df7-4a0e-9216-2510d47649e5_Fast_H1500.mp4"
    },
    "thumbnail": {
      "id": "45e237c6-41be-40ec-9e20-0ae3c0bc2b52",
      "name": "thumbnail-media-63d4ec71-5df7-4a0e-9216-2510d47649e5",
      "filename": "63d4ec71-5df7-4a0e-9216-2510d47649e5_3.jpg"
    }
  }
}'
```

### Error Responses

**400 Bad Request** - Validation error
```json
{
  "error": "Validation error message"
}
```

## 🧪 Testing

The project uses Vitest for testing with comprehensive test coverage for all endpoints.

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test -- --watch

# Run tests with coverage
npm run test -- --coverage
```

### Test Files

- [`tests/medias.test.ts`](tests/medias.test.ts) - Media endpoint tests
- [`tests/users.test.ts`](tests/users.test.ts) - User endpoint tests

### Example Test Commands

```bash
# Test GET endpoint
npm test -- medias.test.ts -t "GET"

# Test POST endpoint
npm test -- medias.test.ts -t "POST"
```

## 📁 Project Structure

```
api/
├── config/                          # Environment configurations
│   ├── .env.development
│   ├── .env.production
│   └── .env.test
├── scripts/                         # Build scripts
│   └── build.ts
├── src/
│   ├── common/                      # Shared utilities
│   │   ├── constants/               # Constants and enums
│   │   │   ├── ENV.ts               # Environment configuration
│   │   │   ├── HttpStatusCodes.ts   # HTTP status codes
│   │   │   └── Paths.ts             # API path definitions
│   │   └── util/                    # Utility functions
│   │       ├── misc.ts
│   │       ├── route-errors.ts      # Error handling
│   │       └── validators.ts        # Custom validators
│   ├── models/                      # Data models
│   │   ├── Media.ts                 # Media model
│   │   └── User.ts                  # User model
│   ├── repos/                       # Data repositories
│   │   ├── database.json            # Mock database
│   │   ├── medias.json              # Media data
│   │   ├── MediaRepo.ts             # Media repository
│   │   ├── MockOrm.ts               # Mock ORM
│   │   └── UserRepo.ts              # User repository
│   ├── routes/                      # Route handlers
│   │   ├── index.ts                 # Route aggregator
│   │   ├── MediaRoutes.ts           # Media routes
│   │   └── UserRoutes.ts            # User routes
│   ├── services/                    # Business logic
│   │   ├── MediaService.ts          # Media service
│   │   └── UserService.ts           # User service
│   ├── index.ts                     # Application entry
│   └── server.ts                    # Express server setup
├── tests/                           # Test files
│   ├── medias.test.ts
│   └── users.test.ts
├── package.json
├── tsconfig.json                    # TypeScript config
└── vitest.config.mts                # Vitest config
```

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run dev:hot          # Start with hot reload

# Building
npm run build            # Build for production

# Testing
npm test                 # Run tests
npm run type-check       # TypeScript type checking

# Code Quality
npm run lint             # Run ESLint
```

### Code Style

The project uses ESLint with TypeScript support. Configuration is in [`eslint.config.ts`](eslint.config.ts).

### Path Aliases

The project uses path aliases for cleaner imports:

```typescript
import Media from '@src/models/Media';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
```

## 📝 Notes

- **IMPORTANT:** For demo purposes, `helmet` is disabled in production mode when `DISABLE_HELMET=TRUE` is set
- The API uses a mock ORM with JSON file storage for demonstration purposes
- Media and thumbnail URLs are configured via environment variables
- CORS is configured to accept all origins in development (`CORS_ORIGIN=*`)

## 📄 License

This project is for demonstration purposes.
