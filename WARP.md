# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

This is a Nuxt.js application using pnpm as the package manager.

### Setup
```bash
pnpm install
```

### Development Server
```bash
pnpm dev
```
Starts development server on http://localhost:3000

### Build & Production
```bash
pnpm build          # Build for production
pnpm generate       # Generate static site
pnpm preview        # Preview production build locally
```

### Code Quality
```bash
pnpm eslint         # Run ESLint (via @nuxt/eslint module)
```

## Architecture Overview

### Project Structure
- **`app/`** - Main application directory (Nuxt 3 structure)
  - `app.vue` - Root application component
  - `assets/css/main.css` - Global CSS with Tailwind imports
- **`nuxt.config.ts`** - Nuxt configuration with modules and build settings
- **`public/`** - Static assets served at root

### Tech Stack
- **Framework**: Nuxt 3 (Vue.js meta-framework)
- **Package Manager**: pnpm
- **CSS Framework**: Tailwind CSS v4 + Nuxt UI
- **TypeScript**: Fully configured with Nuxt's automatic setup
- **Linting**: ESLint via @nuxt/eslint module

### Key Modules & Features
- `@nuxt/ui` - UI component library
- `@nuxt/fonts` - Web font optimization
- `@nuxt/icon` - Icon management
- `@nuxt/image` - Image optimization
- `@nuxt/scripts` - Third-party script management
- `@nuxt/test-utils` - Testing utilities

### Configuration Notes
- Uses Nuxt 3's `app/` directory structure (not `pages/`)
- Tailwind CSS v4 configured via Vite plugin
- TypeScript configuration references auto-generated `.nuxt/` configs
- ESLint extends from `.nuxt/eslint.config.mjs`

### Development Environment
- Uses Nuxt DevTools (enabled in config)
- Hot module replacement via Vite
- Auto-imports for Vue composition API and Nuxt utilities