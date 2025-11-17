# Flumotion Test App

Modern media player application built with React, TypeScript, Vite, and Tailwind CSS. Features a responsive UI for browsing and playing media content with thumbnails, metadata display, and integrated iframe player.

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Requirements](#-requirements)
- [Installation](#-installation)
- [Configuration](#️-configuration)
- [Running the Application](#-running-the-application)
- [Project Structure](#-project-structure)
- [Components](#-components)
- [Development](#-development)
- [Building for Production](#️-building-for-production)

## 🎯 Overview

This application provides a user-friendly interface for browsing and playing media content. It fetches media data from a REST API, displays thumbnails and metadata, and integrates with an iframe-based media player for smooth playback.

## ✨ Features

- **Media Library** - Browse available media with thumbnails and metadata
- **Responsive Player** - Integrated iframe-based media player with thumbnail preview
- **Media Details** - Display duration, bitrate, file size, description, and tags
- **Error Handling** - Comprehensive error boundary and user-friendly error messages
- **Loading States** - Skeleton loaders for better UX during data fetching
- **Modern UI** - Clean, dark-themed interface with Tailwind CSS
- **Type Safety** - Full TypeScript support with strict type checking
- **Icon System** - Reusable SVG icon components
- **Two-Column Layout** - Metadata and description displayed side-by-side

## 🛠 Tech Stack

- **Framework:** React 19.2
- **Language:** TypeScript 5.9
- **Build Tool:** Vite 7.x
- **Styling:** Tailwind CSS 4.x
- **Error Handling:** react-error-boundary 6.x
- **Dev Server:** Vite Dev Server with HMR

## 📦 Requirements

- Node.js >= 18.0.0
- npm or yarn
- Running API server (see [API README](../api/README.md))

## 🚀 Installation

```bash
# Navigate to the app directory
cd app

# Install dependencies
npm install
```

## ⚙️ Configuration

### Environment Variables

The application uses environment-specific configuration files:

**Development:** [`.env.development`](.env.development)
```bash
VITE_ENV=development
VITE_API_BASE_URL=http://localhost:3000
VITE_IFRAME_PLAYER_URL=https://cdnapi.codev8.net/cms-player/default.iframe
```

**Production:** [`.env.production`](.env.production)
```bash
VITE_ENV=production
VITE_API_BASE_URL=https://your-production-api.com
VITE_IFRAME_PLAYER_URL=https://cdnapi.codev8.net/cms-player/default.iframe
```

### Environment Configuration

The app uses a type-safe environment configuration system in [`src/config/env.ts`](src/config/env.ts):

```typescript
import { env } from './config/env';

// Access configuration
const apiUrl = env.apiBaseUrl;
const playerUrl = env.iframePlayerUrl;
```

## 🏃 Running the Application

### Development Mode

```bash
# Start development server with hot reload
npm run dev
```

The application will be available at `http://localhost:5173`

### Preview Production Build

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
app/
├── public/                          # Static assets
│   └── vite.svg
├── src/
│   ├── components/                  # React components
│   │   ├── icons/                   # SVG icon components
│   │   │   ├── types.ts             # Shared icon interfaces
│   │   │   ├── ClockIcon.tsx
│   │   │   ├── FilmIcon.tsx
│   │   │   ├── DocumentIcon.tsx
│   │   │   ├── PlayCircleIcon.tsx
│   │   │   ├── CheckCircleIcon.tsx
│   │   │   ├── AlertTriangleIcon.tsx
│   │   │   ├── AlertCircleIcon.tsx
│   │   │   └── index.ts             # Barrel exports
│   │   ├── ErrorBoundary.tsx        # Error boundary wrapper
│   │   ├── ErrorMessage.tsx         # Error display component
│   │   ├── LoadingSpinner.tsx       # Loading indicator
│   │   ├── MediaInfo.tsx            # Media metadata display
│   │   ├── MediaList.tsx            # Media gallery/list
│   │   ├── MediaPlayer.tsx          # Iframe player wrapper
│   │   └── MediaThumbnail.tsx       # Media thumbnail card
│   ├── config/                      # Configuration
│   │   └── env.ts                   # Environment config
│   ├── hooks/                       # Custom React hooks
│   │   └── useMedias.ts             # Media data fetching hook
│   ├── services/                    # API services
│   │   └── mediaService.ts          # Media API client
│   ├── types/                       # TypeScript types
│   │   └── media.ts                 # Media interfaces
│   ├── App.css                      # Component styles
│   ├── App.tsx                      # Main app component
│   ├── index.css                    # Global styles
│   └── main.tsx                     # Application entry point
├── .env.development                 # Development config
├── .env.production                  # Production config
├── eslint.config.js                 # ESLint configuration
├── index.html                       # HTML template
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript config
├── tsconfig.app.json                # App-specific TS config
├── tsconfig.node.json               # Node-specific TS config
└── vite.config.ts                   # Vite configuration
```

## 🧩 Components

### Core Components

#### [`App.tsx`](src/App.tsx)
Main application component that orchestrates the media player interface:
- Manages selected media state
- Handles media selection
- Coordinates player, info, and list components

#### [`MediaPlayer.tsx`](src/components/MediaPlayer.tsx)
Iframe-based media player with thumbnail preview:
- Displays media in embedded iframe player
- Shows thumbnail when no media is selected
- Loading states with skeleton loaders

#### [`MediaInfo.tsx`](src/components/MediaInfo.tsx)
Displays media metadata in two-column layout:
- **Left column (50%):** Duration, bitrate, file size, and tags
- **Right column (50%):** Description
- Inline tags display with pill-style design

#### [`MediaList.tsx`](src/components/MediaList.tsx)
Grid-based media gallery:
- Responsive grid layout (1-4 columns)
- Media thumbnails with selection highlight
- Loading skeleton states

#### [`MediaThumbnail.tsx`](src/components/MediaThumbnail.tsx)
Individual media card component:
- Thumbnail image with play icon overlay
- Title and duration display
- Selected state styling

### Utility Components

#### [`ErrorBoundary.tsx`](src/components/ErrorBoundary.tsx)
React error boundary for catching component errors

#### [`ErrorMessage.tsx`](src/components/ErrorMessage.tsx)
User-friendly error display with retry functionality

#### [`LoadingSpinner.tsx`](src/components/LoadingSpinner.tsx)
Animated loading spinner component

### Icon Components

Reusable SVG icon components with TypeScript interfaces:
- `ClockIcon` - Duration indicator
- `FilmIcon` - Media/video indicator
- `DocumentIcon` - File size indicator
- `PlayCircleIcon` - Play button
- `CheckCircleIcon` - Success/selected state
- `AlertTriangleIcon` - Error boundary
- `AlertCircleIcon` - Error messages

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev              # Start dev server with HMR

# Building
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # TypeScript type checking
```

### Custom Hooks

#### [`useMedias`](src/hooks/useMedias.ts)
Custom hook for fetching and managing media data:

```typescript
const { medias, loading, error, refetch } = useMedias();
```

Returns:
- `medias` - Array of media items
- `loading` - Loading state boolean
- `error` - Error message string or null
- `refetch` - Function to refetch data

### API Service

#### [`mediaService.ts`](src/services/mediaService.ts)
API client with error handling:

```typescript
import { fetchMedias, buildPlayerUrl } from './services/mediaService';

// Fetch all media
const medias = await fetchMedias();

// Build player URL
const url = buildPlayerUrl(mediaRoute, thumbnailUrl);
```

### Type Definitions

#### [`media.ts`](src/types/media.ts)
TypeScript interfaces for media data:

```typescript
interface IMedia {
  id: string;
  title: string;
  description: string;
  duration: number;
  tags: string;
  filedata: IFileData;
  thumbnail: IThumbnail;
  mediaroute?: string;
}
```

Helper functions:
- `formatDuration(seconds)` - Convert seconds to MM:SS format
- `getThumbnailUrl(media)` - Get thumbnail URL with fallback
- `parseTags(tags)` - Parse comma-separated tags into array

## 🏗️ Building for Production

```bash
# Build optimized production bundle
npm run build

# Output directory: dist/
# - Minified JavaScript bundles
# - Optimized CSS with Tailwind
# - Static assets
```

The build output can be deployed to any static hosting service (Vercel, Netlify, AWS S3, etc.)

## 🎨 Styling

The application uses Tailwind CSS 4.x with a dark theme:

- **Background:** slate-900
- **Cards:** slate-800
- **Text:** white, slate-300, slate-400
- **Accents:** blue-500, blue-600
- **Border:** slate-700

Custom styles are defined in:
- [`index.css`](src/index.css) - Global styles and Tailwind imports
- [`App.css`](src/App.css) - Component-specific styles

## 🔗 API Integration

The app connects to the Flumotion Test API. Ensure the API server is running before starting the app.

**Development:**
```bash
# In the api directory
cd ../api
npm run dev
```

API will run on `http://localhost:3000`

See [API README](../api/README.md) for more details.

## 📱 Responsive Design

The application is fully responsive:

- **Mobile (< 768px):** Single column layout, full-width components
- **Tablet (768px - 1024px):** Optimized spacing and grid layouts
- **Desktop (> 1024px):** Multi-column grids, enhanced spacing

## 🧪 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is for demonstration purposes.
