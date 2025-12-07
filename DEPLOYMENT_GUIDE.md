# Deployment Guide for Thrill AI

Since this project uses **Next.js** and **Prisma**, the best place to deploy it is **Vercel**.

However, because we currently use **SQLite** (a file-based database), we need to switch to **PostgreSQL** for production deployment. Serverless platforms like Vercel effectively "reset" the file system on every deployment, so an SQLite file would be lost.

Here is the step-by-step guide to deploying with a free Postgres database.

## Phase 1: Prepare for Production

1.  **Switch Database Provider**:
    Open `prisma/schema.prisma` and change the provider from `sqlite` to `postgresql`.

    ```prisma
    // inside prisma/schema.prisma
    datasource db {
      provider = "postgresql"
      url      = env("DATABASE_URL")
    }
    ```

2.  **Clean up Migrations**:
    Delete the existing `prisma/migrations` folder, as those are SQLite migrations.
    ```bash
    rm -rf prisma/migrations
    ```

3.  **Push to GitHub**:
    Create a new repository on GitHub and push your code.

## Phase 2: Deploy to Vercel

1.  **Create Project**:
    - Go to [Vercel](https://vercel.com) and click "Add New... > Project".
    - Import your `thrill-ai-web` repository.

2.  **Add Database**:
    - Before clicking "Deploy", go to the **Storage** tab in your Vercel dashboard (or click "Storage" in the left sidebar after creating the project).
    - Click **Create Database** -> Select **Vercel Postgres** (or a provider like Supabase/Neon).
    - Follow the prompts to create a free database.
    - Once created, Vercel will automatically add the `DATABASE_URL` and other secrets to your project's Environment Variables.

3.  **Deploy**:
    - Now go back to your project and click **Deploy**.
    - Vercel will build your app.

## Phase 3: Final Setup

1.  **Run Migrations**:
    On Vercel, the database starts empty. You need to push your schema to it.
    - You can do this via the Build Command settings in Vercel, OR simply run this locally if you connect to the remote DB:
    ```bash
    # (Optional) If you want to run migration from your local machine to the prod DB
    # Export the Prod Connection string
    export DATABASE_URL="postgres://..." 
    npx prisma db push
    ```

## Alternative: Deploy to a VPS (Keep SQLite)

If you absolutely want to keep SQLite, you must use a VPS (Virtual Private Server) like a DigitalOcean Droplet ($5/mo) or a persistent service:

1.  **Render / Railway**: These services allow persistent volumes (disks). You can mount a volume to store the `dev.db` file so it doesn't get deleted.
2.  **Coolify**: If you have your own server.

**Recommendation**: Stick with **Vercel + Postgres**. It's free, scales better, and is the standard for Next.js.
