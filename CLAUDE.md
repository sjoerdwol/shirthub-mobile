# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run start        # Start Expo dev server
npm run android      # Run on Android
npm run ios          # Run on iOS
npm test             # Run all tests (jest --silent)
npm run lint         # Lint with Expo ESLint config
```

Run a single test file:
```bash
npm test -- tests/components/buttons/primaryButton.test.tsx
```

Tests require 80% line coverage. Test files live under `/tests/` and mirror the source structure.

## Architecture

**ShirtHub Mobile** is an Expo/React Native app for managing a personal sports jersey collection. Users can add shirts, view their collection, view statistics, and browse an activity feed.

**Stack:** React Native 0.81.5, Expo 54, Expo Router v6 (file-based routing), NativeWind (Tailwind), Supabase (auth + DB), Zustand v5, TanStack React Form, React Native Reanimated.

### Layer structure

```
app/          → Expo Router pages (routing only, minimal logic)
views/        → Page-level view components (own the data-fetching and layout)
components/   → Reusable UI components
services/     → All Supabase API calls (CRUD, auth, statistics)
stores/       → Zustand global stores
contexts/     → React Context (AuthContext only)
utils/        → Data transformation and validation helpers
types/        → TypeScript interfaces and type definitions
tests/        → Jest tests mirroring source structure
```

### Navigation

Expo Router file-based routing. The root `_layout.tsx` uses `useSegments()` + `AuthContext` to guard routes:
- Unauthenticated → redirected to `/(authentication)`
- Authenticated → redirected to `/(tabs)`

Tab groups: `home` (feed), `collection`, `statistics`, `profile`. Modal screens at `shirts/[id]` (detail) and `shirts/manage` (add/edit).

### State management

- **Zustand** for global app state: `useShirtStore` (collection), `useReferenceDataStore` (teams/leagues/sizes), `useUserStatisticsStore` (stats)
- **AuthContext** (React Context) for session/user and signIn/signUp/signOut
- Local `useState` for UI-only state (loading indicators, form inputs)

### Styling conventions

NativeWind (Tailwind CSS) via `className` props. Custom theme defined in `tailwind.config.js`:
- Background: `#151D28` (dark theme)
- Highlight/primary: `rgb(15, 115, 255)`
- Font family: Lexend (custom variants)
- Icons: Expo Vector Icons (Ionicons)

Path alias `@/` maps to the project root.
