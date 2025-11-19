# Awesome Next.js 16

This project is a modern web application built with **Next.js 16**, **React 19**, and **Tailwind CSS 4**. It features a robust authentication system, a rich text editor-based feed, and a scalable feature-based architecture.

> [!TIP]
> Please refer to [docs/CONVENTIONS.md](docs/CONVENTIONS.md) for project coding standards and architectural guidelines.

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components:** [Shadcn/ui](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/)
- **Database:** [SQLite](https://www.sqlite.org/) (via [Prisma](https://www.prisma.io/))
- **Authentication:** [Auth.js (NextAuth v5)](https://authjs.dev/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand), [TanStack Query](https://tanstack.com/query/latest)
- **Forms:** [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)
- **Rich Text Editor:** [Tiptap](https://tiptap.dev/)
- **Testing:** [Vitest](https://vitest.dev/), [React Testing Library](https://testing-library.com/)
- **Tooling:** [Biome](https://biomejs.dev/) (Linting/Formatting), [Release-it](https://github.com/release-it/release-it)

## ✨ Features

- **Authentication**: Secure user sign-in using NextAuth v5 with Prisma Adapter.
- **Feed System**:
    - Create, read, update, and delete posts.
    - Rich text editing with Tiptap (Markdown support).
    - Dual content storage (HTML & Plain Text).
- **Modern UI**:
    - Responsive design with Tailwind CSS 4.
    - Smooth animations with Framer Motion.
    - Dark mode support (via `next-themes`).
- **Architecture**: Scalable feature-based folder structure (`src/features`).

## 🛠️ Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js (v20+ recommended) or [Bun](https://bun.sh/)
- npm, yarn, pnpm, or bun

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd awesome-nextjs16
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    bun install
    ```

3.  **Environment Setup:**
    Copy the example environment file and configure it:
    ```bash
    cp .env.local.example .env.local
    ```
    *Note: Ensure `DATABASE_URL` and `AUTH_SECRET` are properly set.*

4.  **Database Setup:**
    Run Prisma migrations to set up your SQLite database:
    ```bash
    npx prisma migrate dev
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    # or
    bun dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

This project follows a **Feature-based Architecture**.

```text
src/
├── app/                # Next.js App Router pages
├── components/         # Shared UI components (Button, Input, etc.)
├── features/           # Feature-specific logic (Feed, Auth, etc.)
│   ├── auth/           # Authentication feature
│   └── feed/           # Feed/Post feature
├── lib/                # Shared utilities (Prisma client, utils)
└── styles/             # Global styles
```

## 📜 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs Biome check for linting.
- `npm run format`: Formats code using Biome.
- `npm test`: Runs tests with Vitest.
- `npm run release`: Automates versioning and package publishing.

## 🤝 Contributing

Contributions are welcome! Please check [docs/CONVENTIONS.md](docs/CONVENTIONS.md) before submitting a Pull Request.
