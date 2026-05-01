# Blog Platform Frontend

A complete React + TypeScript frontend for a blog platform built with Vite, React Router, and Tailwind CSS.

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Input.tsx        # Input with validation
│   │   ├── Button.tsx       # Loading-aware button
│   │   ├── AppBar.tsx       # Navigation bar
│   │   ├── BlogCard.tsx     # Blog listing card
│   │   ├── ProtectedRoute.tsx
│   │   └── index.ts
│   ├── pages/               # Page components
│   │   ├── Signup.tsx
│   │   ├── Signin.tsx
│   │   ├── Blogs.tsx
│   │   ├── Blog.tsx
│   │   └── Publish.tsx
│   ├── hooks/               # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useFetch.ts
│   │   └── index.ts
│   ├── utils/               # Utilities
│   │   ├── api.ts           # API client
│   │   └── index.ts
│   ├── types/               # TypeScript types
│   │   └── index.ts
│   └── App.tsx              # Root routing
├── package.json
├── tsconfig.json
├── vite.config.js
└── index.html
```

## Features

### Authentication
- Sign up and Sign in pages
- JWT token management in localStorage
- Protected routes redirect to signin if no token
- Auto-inject auth headers in API calls

### Blog Management
- View all blogs with loading state
- View single blog
- Create new blog (protected route)
- Error handling throughout

### Reusable Components
- **Input**: With labels, placeholders, error messages
- **Button**: Primary/secondary variants, loading spinner
- **AppBar**: Dynamic auth-aware navigation
- **BlogCard**: Blog preview with author info
- **ProtectedRoute**: Auth check wrapper

### Custom Hooks
- **useAuth**: Manages signin/signup/logout
- **useFetch**: Generic data fetching with state

## Setup & Running

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview build locally
npm run preview
```

## API Configuration

- Base URL: `http://localhost:8787`
- Uses Fetch API (no axios)
- JWT token automatically added to headers

## Technologies

- React 19.2.5
- TypeScript 6.0
- React Router 7.14.2
- Tailwind CSS 4.2.4
- Vite 8.0.10
