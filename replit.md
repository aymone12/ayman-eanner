# Solar Installation Calculator

## Overview

A modern web application for calculating solar installation requirements and costs. The application provides an interactive interface for users to select grid types (single-phase vs three-phase), installation types (on-grid, off-grid, hybrid), and configure their solar energy system based on their specific needs and power usage requirements.

## Recent Changes (September 8, 2025)

### Complete Email Flow Integration
- **Desktop Email Capture**: Enhanced landing page with email input form that carries email through to signup process
- **Mobile Email Capture**: Added email capture functionality to mobile hero section with same integration
- **Unified Authentication**: Both desktop and mobile versions now seamlessly pass email to signup form

### Enhanced Form Validation
- **Required Field Enforcement**: Users cannot proceed without completing all required fields
- **Real-time Validation**: Forms validate as users type with clear error messaging
- **Strong Validation**: Prevention of skipping required form steps

### Mobile Experience Improvements
- **Responsive Email Capture**: Mobile-optimized email capture forms respecting mobile UX patterns
- **Contact Footer Integration**: ContactFooterSection now includes email capture functionality
- **Consistent Navigation**: Mobile and desktop versions share same authentication flow

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React with TypeScript**: Modern component-based architecture using functional components and hooks
- **Vite Build System**: Fast development server and optimized production builds with hot module replacement
- **shadcn/ui Component Library**: Comprehensive UI component system built on Radix UI primitives with Tailwind CSS styling
- **Routing**: Client-side routing implemented with Wouter for lightweight navigation
- **State Management**: React Query (TanStack Query) for server state management with built-in caching, background updates, and error handling
- **Form Handling**: React Hook Form with Zod validation for type-safe form management
- **Styling**: Tailwind CSS with CSS variables for theming and responsive design

### Backend Architecture
- **Express.js Server**: RESTful API server with middleware for JSON parsing, CORS, and request logging
- **TypeScript**: Full type safety across the entire backend codebase
- **Modular Route System**: Centralized route registration with separation of concerns
- **Error Handling**: Global error middleware with proper HTTP status codes and JSON responses
- **Development Hot Reload**: tsx for TypeScript execution in development with automatic restarts

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Management**: Centralized schema definitions in shared directory for frontend/backend consistency
- **Migrations**: Drizzle Kit for database schema migrations and version control
- **Connection**: Neon serverless PostgreSQL for cloud database hosting
- **Development Storage**: In-memory storage implementation for development and testing

### Authentication and Authorization
- **Session Management**: PostgreSQL session store using connect-pg-simple for persistent sessions
- **User Schema**: Basic user authentication with username/password stored securely
- **Type Safety**: Zod schemas for request validation and type inference

### Build and Deployment
- **Production Build**: Vite for frontend bundling, esbuild for backend compilation
- **Static Asset Serving**: Express static file serving for production builds
- **Environment Configuration**: Environment-specific configurations for development and production
- **Code Quality**: TypeScript strict mode with comprehensive type checking

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL database hosting with connection pooling
- **Drizzle ORM**: Type-safe database toolkit with automatic schema generation
- **PostgreSQL**: Primary database for user data and application state

### UI and Styling
- **Radix UI**: Accessible, unstyled UI primitives for complex components
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Lucide React**: Icon library with consistent SVG icons
- **shadcn/ui**: Pre-built component system combining Radix UI and Tailwind CSS

### Development Tools
- **Vite**: Build tool with fast HMR and optimized production builds
- **TypeScript**: Static type checking and enhanced developer experience
- **PostCSS**: CSS processing with Tailwind CSS and Autoprefixer plugins
- **ESBuild**: Fast JavaScript/TypeScript bundler for production builds

### Utility Libraries
- **TanStack React Query**: Server state management with caching and synchronization
- **React Hook Form**: Performant forms with easy validation
- **Zod**: TypeScript-first schema validation library
- **date-fns**: Modern JavaScript date utility library
- **clsx**: Utility for conditionally joining CSS class names