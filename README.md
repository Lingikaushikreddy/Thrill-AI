# Thrill AI Web

**Thrill AI Web** is a cutting-edge, AI-powered web application designed to showcase next-generation voice agent technology. Built with **Next.js 16**, **React 19**, and **Tailwind CSS 4**, it features a stunning, high-performance UI that demonstrates real-time AI conversational capabilities, lead generation, and multi-language support.

## 🚀 Features

*   **Advanced AI Voice Agents**: Interactive demos of AI agents capable of conversing in English, Hindi, and Telugu.
*   **Real-time Text-to-Speech (TTS)**: Integration with Google's Generative AI for dynamic voice synthesis.
*   **Modern Aesthetic**: A premium "Aura" design system using Glassmorphism, smooth animations (Framer Motion), and responsive layouts.
*   **Lead Capture System**: Built-in functionality to collect and manage leads using Prisma and SQLite.
*   **Interactive Demos**: Hands-on demonstrations of AI capabilities for different industry verticals (Healthcare, Multi-language).

## 🛠 Tech Stack

*   **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) & [Clsx](https://www.npmjs.com/package/clsx)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **Database**: SQLite (via [Prisma ORM](https://www.prisma.io/))
*   **AI Integration**: [Google Generative AI](https://ai.google.dev/)
*   **Icons**: [Lucide React](https://lucide.dev/)

---

## 📂 Project Structure & File Descriptions

This section provides a detailed explanation of the key files and directories in the project.

### 1. Configuration Files
*   **`package.json`**: Defines the project dependencies (Next.js 16, React 19, Prisma, etc.) and scripts (`dev`, `build`, `postinstall`).
*   **`prisma/schema.prisma`**: The database schema definition. It defines the `Lead` model used to capture user information (email, name, company, plan).
*   **`next.config.ts`**: Configuration for the Next.js server and build process.
*   **`eslint.config.mjs`**: Code linting rules to ensure code quality and consistency.

### 2. Core Application (`src/app`)
The `app` directory contains the application's routes and global layouts.
*   **`layout.tsx`**: The root layout file that wraps the entire application. It includes global font settings (Geist), metadata for SEO, and the `globals.css` import.
*   **`page.tsx`**: The main Landing Page of the application. It serves as the entry point and renders the `LandingPage` component.
*   **`globals.css`**: The global stylesheet. It creates the CSS variables for the color theme, imports Tailwind directives, and sets up base styles for the "dark mode" aesthetic.
*   **`favicon.ico`**: The browser tab icon for the website.

#### API Routes (`src/app/api`)
Backend endpoints handling server-side logic.
*   **`api/agent/route.ts`**: Handles logic for the AI Agent interactions.
*   **`api/leads/route.ts`**: Endpoint to receive and store user lead data into the SQLite database.
*   **`api/tts/route.ts`**: Text-to-Speech endpoint that interfaces with the TTS service to generate audio from text.

#### Demos & Dashboard (`src/app/demos`, `src/app/dashboard`)
*   **`demos/hospital/page.tsx`**: A specialized demo page for Healthcare/Hospital AI use cases.
*   **`demos/languages/page.tsx`**: A demo page showcasing the multi-language capabilities of the AI.
*   **`demos/telugu/page.tsx`**: A specific demo page for the Telugu language voice agent.
*   **`dashboard/`**: Directory containing pages for the user or admin dashboard (if accessible).

### 3. Components (`src/components`)
Reusable UI building blocks and feature-specific modules.

#### Layout & Navigation
*   **`Navbar.tsx`**: The top navigation bar containing links and the "Get Started" call-to-action.
*   **`Footer.tsx`**: The site footer with links, copyright info, and social icons.
*   **`Hero.tsx`**: The hero section of the landing page. Features a high-converting headline, subheadline, and primary CTAs.
*   **`LandingPage.tsx`**: A wrapper component that aggregates all the sections (Hero, Features, Pricing, etc.) to build the full homepage experience.

#### AI & Functional Demos
*   **`VoiceReceptionist.tsx`**: A component simulating an AI receptionist tailored for business inquiries.
*   **`HindiVoiceAgent.tsx`**: An interface for interacting with the Hindi-speaking AI agent.
*   **`TeluguVoiceAgent.tsx`**: An interface for interacting with the Telugu-speaking AI agent.
*   **`InteractiveDemo.tsx`**: A general purpose interactive playground for users to test the AI's capabilities.
*   **`SampleCallPlayer.tsx`**: A media player component designed to play pre-recorded audio samples of AI calls.

#### Feature Showcases
*   **`Features.tsx`**: Displays the core selling points of the product in a grid or list layout.
*   **`MoreFeatures.tsx`**: A secondary features section detailing additional capabilities.
*   **`Comparison.tsx`**: A comparison table or list showing how Thrill AI stacks up against competitors or old methods.
*   **`Pricing.tsx`**: Displays subscription plans, pricing tiers, and included features.
*   **`Gallery.tsx`**: A visual gallery component, likely used to show screenshots or product visuals.
*   **`Blog.tsx`**: A component to display recent blog posts or system updates.

#### UI & Effects
*   **`AnimatedLogo.tsx`**: A custom "Nano Banna" style animated logo component using SVG or Canvas animations.
*   **`FadeIn.tsx`**: A utility component using Framer Motion to add fade-in enter animations to children elements.
*   **`GetStartedModal.tsx`**: A modal popup that appears when users click "Get Started", capturing their lead information.

### 4. Data (`src/data`)
*   **`posts.json`**: A JSON file acting as a lightweight CMS, storing data for blog posts or news items shown in `Blog.tsx`.

---

## 🚀 Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites
*   **Node.js**: Version 18.17.0 or higher is required.

### Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository_url>
    cd thrill-ai-web
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Setup the Database**:
    Initialize the SQLite database using Prisma.
    ```bash
    npx prisma generate
    npx prisma db push
    ```

4.  **Configure Environment Variables**:
    Create a `.env` file in the root directory and add your keys (e.g., `GOOGLE_API_KEY` for AI features).
    ```env
    DATABASE_URL="file:./dev.db"
    # Add other keys as required
    ```

5.  **Run the Development Server**:
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📄 License
This project is proprietary. All rights reserved.
