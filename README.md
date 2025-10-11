# actepeloc

Full-stack TypeScript application with React frontend and Vercel serverless API backend.

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite 7, Tailwind CSS v4
- **Backend:** Vercel Serverless Functions (Node.js)
- **Deployment:** Vercel
- **Code Quality:** ESLint, Prettier
- **Fonts:** Custom Futura font family

## Prerequisites

- Node.js >= 20.11.0
- Yarn >= 1.22.0

## Getting Started

### Installation

```bash
yarn install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Supabase Configuration
SUPABASE_URL=your-supabase-url
SUPABASE_API_KEY=your-supabase-key

# Add other environment variables as needed
```

See `.env.example` for reference (if you haven't created one, copy from `.env.local`).

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
├── api/                          # Vercel serverless functions
│   ├── lib/
│   │   ├── configuration/        # Environment config
│   │   │   ├── config.ts         # Config values
│   │   │   ├── types/            # TypeScript types
│   │   │   └── utils/            # Validation utilities
│   │   └── middleware/
│   │       └── withValidation.ts # Config validation middleware
│   ├── health.ts                 # Health check endpoint
│   └── tsconfig.json             # TypeScript config for API
├── src/                          # React frontend
│   ├── App.tsx                   # Main app component
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global styles + font definitions
├── public/
│   └── fonts/                    # Custom font files
│       ├── futura-regular.woff2
│       └── futura-bold.woff2
├── .vscode/
│   └── settings.json             # VSCode configuration
├── vercel.json                   # Vercel deployment config
└── package.json
```

## API Endpoints

API endpoints are located in `/api` directory. Each `.ts` file becomes a serverless function.

### Available Endpoints

- `GET /api/health` - Health check endpoint

### Creating New Endpoints

Create a new file in `/api`:

```typescript
// api/users.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { withValidation } from "./lib/middleware/withValidation.js";
import { config } from "./lib/configuration/config.js";

async function handler(req: VercelRequest, res: VercelResponse) {
  // Your logic here
  return res.status(200).json({ success: true });
}

// Validate required environment variables
export default withValidation(["supabaseUrl", "supabaseKey"], handler);
```

**Important:** Use `.js` extensions in imports within the `/api` directory (ES modules requirement).

### Environment Variables in API

Access via `config` object from `api/lib/configuration/config.ts`:

```typescript
import { config } from "./lib/configuration/config.js";

// Access typed configuration
const url = config.supabaseUrl;
const key = config.supabaseKey;
```

Add new variables in `api/lib/configuration/types/ApiConfig.ts`.

## Path Aliases

TypeScript path aliases are configured for cleaner imports:

```typescript
// Frontend imports
import { MyComponent } from "@ui/components/MyComponent";
import { useMyHook } from "@ui/hooks/useMyHook";

// Import API types in frontend (for shared types)
import type { ApiConfig } from "@api/lib/configuration/types";
```

**Note:** `@api` alias only works when importing **into** the API directory. Within `/api`, use relative imports with `.js` extensions.

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

- **Frontend (`src/`):** Vite bundler resolution, no `.js` extensions needed
- **API (`api/`):** Node16 module resolution, **requires** `.js` extensions in imports
- **Strict mode:** Enabled for type safety

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

Add all variables from `.env.local` to Vercel Dashboard:

1. Go to Project Settings → Environment Variables
2. Add each variable (e.g., `SUPABASE_URL`, `SUPABASE_API_KEY`)
3. Select environments (Production, Preview, Development)
4. Redeploy

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

- **In `/src`:** Use path aliases (`@ui/*`) or relative imports without extensions
- **In `/api`:** Use relative imports **with** `.js` extensions

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

- Ensure `.env.local` exists in project root
- Restart dev server after changing `.env.local`
- For production: add variables in Vercel Dashboard

## License

Private
