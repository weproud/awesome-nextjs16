# Project Conventions

This document outlines the coding conventions and architectural decisions for the **Awesome nextjs 16** project. Following these guidelines ensures consistency, maintainability, and scalability.

## 1. Project Structure

We follow a **Feature-based Architecture**. Code is organized by *business domain (feature)* rather than technical role.

### Directory Layout
```text
src/
├── features/           # Feature modules
│   ├── feed/           # 'Feed' feature
│   │   ├── components/ # UI components specific to Feed
│   │   ├── actions/    # Server actions for Feed
│   │   └── types.ts    # Types shared within Feed
│   └── auth/           # 'Auth' feature
├── components/         # Shared UI components (e.g., buttons, inputs)
└── lib/                # Shared utilities and configurations
```

### Rules
- **Co-location**: Keep related code (components, logic, styles, types) close together.
- **Encapsulation**: Features should be self-contained. Avoid deep cross-feature dependencies where possible.

## 2. Type Management

### Feature-Specific Types
Types that are specific to a feature should be defined within that feature's directory.

- **Preferred**: Create a `types.ts` file in the feature root (e.g., `src/features/feed/types.ts`).
- **Avoid**: Defining large interfaces inside UI component files (e.g., `feed-card.tsx`).
- **Avoid**: Putting all types in a global `src/types` folder unless they are truly global (e.g., generic utility types).

**Example:**
```typescript
// src/features/feed/types.ts
export interface Post {
    id: string;
    title: string;
    // ...
}
```

## 3. Naming Conventions

- **Files**: `kebab-case` (e.g., `feed-list.tsx`, `user-profile.ts`)
- **Components**: `PascalCase` (e.g., `FeedList`, `UserProfile`)
- **Functions/Variables**: `camelCase` (e.g., `getPosts`, `isLoading`)
