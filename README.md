# Volt Store Frontend

A modern e-commerce application built with **Next.js 16**, **TypeScript**, and **Tailwind CSS v4**.

## 🚀 Features

### Client Side
- **Product Catalog:** Browse products with advanced filtering and pagination.
- **Product Details:** Image gallery, detailed information, and reviews.
- **Shopping Cart:** Add items, adjust quantities, and manage cart state.
- **Checkout:** Streamlined checkout process.
- **User Profile:** Manage account details and view order history.
- **Authentication:** Secure Login and Registration flows.

### Admin Panel
- **Dashboard:** Overview of store performance.
- **Product Management:** Create, edit, and delete products.
- **Order Management:** View and update order statuses.
- **Reviews Management:** Moderate user reviews.

## 🛠 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/) (Primitives), [Lucide React](https://lucide.dev/) (Icons)
- **State/Notifications:** [Sonner](https://sonner.emilkowal.ski/) (Toasts)
- **Form Handling:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) validation

## 📦 Getting Started

### Prerequisites

Ensure you have one of the following installed:
- Node.js (v20+ recommended)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd volt-frontendInstall dependencies:
Bash

2. Install dependencies:
npm install
# or
yarn install
# or
pnpm install

3. Set up environment variables: Create a .env file in the root directory and add necessary variables (API URLs, etc.).

4. Run the development server:
npm run dev
5. Open http://localhost:3000 with your browser to see the result.

📜 Scripts

    npm run dev - Starts the development server with Webpack.

    npm run build - Builds the application for production.

    npm run start - Starts the production server.

    npm run lint - Runs ESLint to check for code quality issues.

Project Structure

src/
├── app/          # Next.js App Router pages (Admin, Auth, Shop)
├── components/   # Reusable UI components
│   ├── admin/    # Admin-specific components
│   ├── auth/     # Login/Register forms
│   ├── cart/     # Cart functionality
│   ├── product/  # Product cards, galleries, filters
│   └── ui/       # Shared UI primitives (Buttons, Inputs, etc.)
├── lib/          # Utility functions and API configurations
└── types/        # TypeScript type definitions
