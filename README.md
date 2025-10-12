# actepeloc

Full-stack TypeScript application with React frontend and Vercel serverless API proxy backend.

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite 7, Tailwind CSS v4
- **Backend:** Vercel Serverless Functions (Node.js) - API Proxy Layer
- **Database:** Supabase
- **Deployment:** Vercel
- **Security:** CORS + API Key authentication
- **Code Quality:** ESLint, Prettier
- **Fonts:** Custom Futura font family

## Prerequisites

- Node.js >= 22.0.0
- Yarn >= 1.22.0

## Getting Started

### Installation

```bash
yarn install
```

### Environment Variables

Create a `.env` file in the project root:

```env
# Backend Environment Variables
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_API_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Proxy Security
PROXY_API_KEY=your-secret-api-key-here
PROXY_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# Node Environment
NODE_ENV=development

# Frontend Environment Variables (VITE_ prefix)
VITE_PROXY_API_KEY=your-secret-api-key-here
VITE_API_BASE_URL=/api
```

**Important:**

- `SUPABASE_SERVICE_ROLE_KEY` - Admin key (BACKEND ONLY, never expose to frontend!)
- `PROXY_API_KEY` and `VITE_PROXY_API_KEY` should be the same value
- `PROXY_ALLOWED_ORIGINS` - Comma-separated list of allowed origins for CORS
- Get Supabase keys from: Supabase Dashboard → Settings → API

### Development

#### Frontend Only (Port 5173)

```bash
yarn dev
```

Runs Vite dev server. Use this for pure frontend development when you don't need API endpoints.

#### Full Stack with API (Port 3000)

```bash
yarn dev:vercel
```

Runs Vercel dev environment with both frontend and API endpoints. **Required when developing/testing API endpoints.**

- Frontend: `http://localhost:3000`
- API endpoints: `http://localhost:3000/api/*`

### Build

```bash
yarn build
```

Compiles TypeScript and builds production-ready assets to `/dist`.

### Lint & Format

```bash
# Run ESLint
yarn lint

# Format code with Prettier
yarn format

# Check formatting without changes
yarn format:check
```

## Project Structure

```
actepeloc/
├── api/                          # Vercel serverless functions (endpoints only)
│   ├── signup.ts                 # User signup endpoint
│   ├── health.ts                 # Health check with config validation
│   └── tsconfig.json             # TypeScript config for API (Node16)
├── src/
│   ├── api/                      # Shared API code (imported by /api endpoints)
│   │   ├── configuration/        # Configuration management
│   │   │   ├── config.ts         # Config values from env vars
│   │   │   ├── types/            # Config type definitions
│   │   │   └── utils/            # Config validator
│   │   ├── middleware/           # Reusable middleware
│   │   │   ├── withCors.ts       # CORS + API key validation
│   │   │   └── compose.ts        # Middleware composition utility
│   │   ├── supabase/
│   │   │   └── client.ts         # Supabase admin client
│   │   ├── types/                # Shared type definitions
│   │   │   ├── signupRequest.ts
│   │   │   ├── signupResponse.ts
│   │   │   └── ...
│   │   └── validation/           # Request validation
│   │       └── schemas.ts        # Validation schemas
│   └── ui/                       # React frontend
│       ├── lib/
│       │   ├── api.ts            # API client with auth headers
│       │   └── configuration/    # Frontend configuration
│       ├── App.tsx               # Main app component
│       ├── main.tsx              # Entry point
│       └── index.css             # Global styles + font definitions
├── public/
│   └── fonts/                    # Custom font files
├── .vscode/
│   └── settings.json             # VSCode configuration
├── tsconfig.json                 # Root TypeScript config (project references)
├── tsconfig.app.json             # Frontend TypeScript config (src/ui)
├── tsconfig.paths.json           # Shared path aliases
├── vercel.json                   # Vercel deployment config
└── ENV_SETUP.md                  # Environment variables guide
```

## API Endpoints

API endpoints are located in `/api` directory. Each `.ts` file becomes a serverless function protected by CORS and API key authentication.

### Security

All API endpoints require:

- **API Key:** Must be included in `x-api-key` header
- **CORS:** Request origin must be in allowed origins list

The frontend automatically adds the API key via the API client (`src/ui/lib/api.ts`).

### Available Endpoints

- `GET /api/health` - Health check with configuration validation
- `POST /api/signup` - User registration endpoint

#### Health Check

**GET `/api/health`** - Validates configuration and returns service status

Success response (200):

```json
{
  "status": "ok",
  "timestamp": "2025-10-12T...",
  "environment": "development"
}
```

Error response (500):

```json
{
  "status": "error",
  "timestamp": "2025-10-12T...",
  "error": "Service configuration is invalid or incomplete"
}
```

#### User Registration

**POST `/api/signup`** - Create a new user account

Request body:

```json
{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "full_name": "John Doe" // optional
}
```

Success response (201):

```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "created_at": "2025-10-11T..."
  },
  "message": "User created successfully"
}
```

Error response (400/500):

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

**Password Requirements:**

- Minimum 8 characters
- At least one letter
- At least one number

**Example using curl:**

```bash
curl -X POST http://localhost:3000/api/signup \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-secret-api-key" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123",
    "full_name": "Test User"
  }'
```

**Example using frontend API client:**

```typescript
import { api } from "@ui/lib/api";

const result = await api.post("/signup", {
  email: "test@example.com",
  password: "TestPassword123",
  full_name: "Test User",
});
```

### Creating New Endpoints

Create a new file in `/api`:

```typescript
// api/users.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { withCors } from "../src/api/middleware/index.js";
import { config } from "../src/api/configuration/index.js";

async function handler(req: VercelRequest, res: VercelResponse) {
  // Your logic here
  return res.status(200).json({ success: true });
}

// Apply CORS + API key middleware
export default withCors(handler);
```

**Important Notes:**

- Use `.js` extensions in imports from `/api` directory (Node16 ES modules requirement)
- All endpoints in `/api` automatically get CORS + API key protection via `withCors` middleware
- Shared code lives in `/src/api` and is imported into endpoint handlers

### Configuration System

**Backend Configuration** (`src/api/configuration/`)

Access via `config` object:

```typescript
import { config } from "../src/api/configuration/index.js";

// Access typed configuration
const url = config.supabase.url;
const key = config.supabase.key;
const apiKey = config.proxy.apiKey;
```

**Frontend Configuration** (`src/ui/lib/configuration/`)

```typescript
import { config } from "@ui/lib/configuration";

// Access typed configuration
const apiKey = config.apiProxy.apiKey;
const baseUrl = config.apiProxy.baseUrl;
const isDev = config.isDevelopment;
```

Add new variables in the respective `types/` directories.

## Path Aliases

TypeScript path aliases are configured in `tsconfig.paths.json` and shared across the project:

```typescript
// Frontend imports (no .js extensions needed)
import { api } from "@ui/lib/api";
import { config } from "@ui/lib/configuration";

// API imports (require .js extensions)
import { config } from "@api/configuration/index.js";
import { withCors } from "@api/middleware/index.js";
```

**Important Module Resolution Differences:**

- **`src/ui/`** - Vite bundler resolution, **no** `.js` extensions
- **`src/api/`** - Node16 resolution, **requires** `.js` extensions
- **`api/`** - Serverless functions, use relative imports to `/src/api` with `.js` extensions

## Styling

### Tailwind CSS v4

This project uses **Tailwind CSS v4** with CSS-first configuration.

Custom theme values are defined in `src/index.css` using the `@theme` directive:

```css
@theme {
  --font-sans: "Futura", system-ui, -apple-system, sans-serif;
}
```

### Custom Fonts

Futura font family is configured as the default sans-serif font:

- **Regular (400):** `futura-regular.woff2`
- **Bold (700):** `futura-bold.woff2`

Usage:

```tsx
<p>Regular text</p>
<p className="font-bold">Bold text</p>
```

## Code Quality

### Prettier Configuration

- **Quotes:** Double quotes
- **Indentation:** 2 spaces (no tabs)
- **Line Width:** 100 characters
- **Semicolons:** Required
- **Trailing Commas:** ES5
- **Plugins:** `prettier-plugin-tailwindcss` (auto-sorts Tailwind classes)

Format on save is enabled in VSCode. Manual formatting:

```bash
yarn format
```

### ESLint

Configured for React, TypeScript, and hooks. Run linting:

```bash
yarn lint
```

## TypeScript Configuration

This project uses TypeScript project references for better organization:

- **Root (`tsconfig.json`):** Project references to sub-projects
- **Frontend (`tsconfig.app.json`):** Covers `src/ui/`, Vite bundler resolution
- **API Shared (`src/api/tsconfig.json`):** Node16 resolution with `.js` extensions required
- **API Endpoints (`api/tsconfig.json`):** Node16 resolution, imports from `src/api/`
- **Paths (`tsconfig.paths.json`):** Shared path aliases (`@ui`, `@api`)

**Key Rules:**

- `src/ui/` - No `.js` extensions in imports
- `src/api/` - **Requires** `.js` extensions in all relative imports
- Strict mode enabled for type safety

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel Dashboard
3. Add environment variables in Settings → Environment Variables
4. Deploy

Vercel automatically:

- Detects Vite frontend
- Compiles TypeScript API functions
- Serves API endpoints at `/api/*`

### Environment Variables in Production

Add all variables from `.env` to Vercel Dashboard:

1. Go to Project Settings → Environment Variables
2. Add each variable:
   - Backend: `SUPABASE_URL`, `SUPABASE_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `PROXY_API_KEY`, `PROXY_ALLOWED_ORIGINS`
   - Frontend: `VITE_PROXY_API_KEY`, `VITE_API_BASE_URL`
3. For `PROXY_ALLOWED_ORIGINS`, add your production domain (e.g., `https://yourdomain.com`)
4. Select environments (Production, Preview, Development)
5. Redeploy

**Security Note:** The `VITE_PROXY_API_KEY` will be visible in the frontend bundle. This is acceptable since:

- The API is a proxy layer that forwards bearer tokens to the real backend
- CORS restricts which origins can call the API
- Real authentication happens via bearer tokens

## Development Tips

### Testing API Locally

Always use `yarn dev:vercel` when working with API endpoints:

```bash
# Start dev server
yarn dev:vercel

# In another terminal, test endpoint
curl http://localhost:3000/api/health
```

### Module Resolution

- **In `src/ui/`:** Use path aliases (`@ui/*`) or relative imports **without** extensions
- **In `src/api/`:** Use relative imports **with** `.js` extensions
- **In `api/`:** Import from `../src/api/` **with** `.js` extensions

### Hot Module Replacement (HMR)

Vite provides instant HMR for frontend changes. API changes require server restart (handled automatically by Vercel CLI).

## Troubleshooting

### API Endpoint Not Found

- Ensure you're running `yarn dev:vercel`, not `yarn dev`
- Check file is in `/api` directory and exports a default handler
- Verify imports use `.js` extensions

### Font Not Loading

- Hard refresh browser: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows/Linux)
- Check Network tab in DevTools for font file requests
- Verify font files exist in `public/fonts/`

### Environment Variables Not Working

- Ensure `.env` exists in project root
- Restart dev server after changing `.env`
- Frontend variables must be prefixed with `VITE_`
- For production: add variables in Vercel Dashboard

### CORS Errors

- Ensure your origin is in `PROXY_ALLOWED_ORIGINS`
- Check that `x-api-key` header is being sent with requests
- Use the API client from `@ui/lib/api` which handles headers automatically

### Import Errors in API

- Verify all imports in `src/api/` use `.js` extensions
- Check that imports from `api/` to `src/api/` use relative paths with `.js`
- See `ENV_SETUP.md` for configuration details

## License

Private
