# 369 AI Ventures Portfolio

## Overview

This is a portfolio website for 369 AI Ventures, a software development company specializing in mobile applications and web development. The application showcases projects including mobile apps (iOS/Android) and web platforms, with a focus on clients like ZamZam Electronics and Danube Properties. The site features a modern, dark-themed UI with gold accents and smooth animations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with custom theme configuration
- **UI Components**: Shadcn/ui component library (New York style)
- **Animations**: Framer Motion for page transitions and scroll effects
- **Build Tool**: Vite

The frontend follows a component-based architecture with:
- Pages in `client/src/pages/` (Home, Projects, ProjectDetail, Contact)
- Reusable components in `client/src/components/`
- Custom hooks in `client/src/hooks/`
- Shadcn UI primitives in `client/src/components/ui/`

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Pattern**: RESTful endpoints under `/api/`
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Schema Validation**: Zod with drizzle-zod integration

The backend uses a storage pattern (`server/storage.ts`) that abstracts database operations, making it easy to swap implementations.

### Data Storage
- **Database**: PostgreSQL (configured via DATABASE_URL environment variable)
- **Schema Location**: `shared/schema.ts`
- **Migrations**: Drizzle Kit (`drizzle-kit push` command)

Current schema includes a `projects` table with fields for title, description, category, images (including gallery array), platform, and external links.

### Shared Code
- `shared/schema.ts`: Database schema and TypeScript types
- `shared/routes.ts`: API route definitions with Zod validation schemas

### Build System
- Development: Vite dev server with HMR
- Production: Custom build script using esbuild for server and Vite for client
- Output: `dist/` directory with `index.cjs` (server) and `public/` (client assets)

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Database queries and schema management
- **connect-pg-simple**: PostgreSQL session storage (available but not currently used)

### Frontend Libraries
- **@tanstack/react-query**: Data fetching and caching
- **framer-motion**: Animation library
- **Radix UI**: Accessible component primitives (via Shadcn)
- **Lucide React**: Icon library
- **class-variance-authority**: Component variant styling

### Development Tools
- **Vite**: Development server and bundler
- **TypeScript**: Type checking
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS/Autoprefixer**: CSS processing

### Replit-specific
- **@replit/vite-plugin-runtime-error-modal**: Error overlay in development
- **@replit/vite-plugin-cartographer**: Development tooling
- **@replit/vite-plugin-dev-banner**: Development banner