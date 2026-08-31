# Implementation prompt: Comprehensive README.md Rewrite

## Goal

Completely rewrite the root `README.md` to provide a production-grade, highly engaging, and clear architectural and developer guide for **Vertex (AI-Powered Learning Platform)**. The updated README will thoroughly cover:

1. **System Architecture & Data Flow** (Dual-workspace architecture: Next.js Web + Sanity Studio, Sanity Context MCP search pipeline, Clerk auth, PostHog telemetry, offline video ingestion).
2. **Why Vertex vs Traditional Learning Platforms** (Comparative breakdown: semantic deep-link video search vs scrubbing, structured content vs rigid page builders, MCP grounding vs LLM hallucination, strict security boundaries).
3. **Key Features & Capabilities** (Intelligent natural language search, deep-linked video playback at exact seconds, course & module hierarchy, learner progress tracking, instructor & category showcases, analytics).
4. **Technology Stack** (Next.js 16 App Router, React 19, TypeScript, Tailwind CSS, Sanity v3 Headless CMS, Clerk Auth, Sanity Context MCP, Vercel AI SDK + OpenAI, PostHog).
5. **Project Structure** (Detailed directory breakdown of both the Web workspace and the Studio workspace).
6. **Environment Variables & Configuration** (Complete table and explanation of client vs server-only keys for Sanity, Clerk, PostHog, Sanity Context MCP, and OpenAI).
7. **Step-by-Step Setup Guide & Execution Examples** (Prerequisites, installation, seeding content, video ingestion scripts, Studio deployment, running local dev server).

## Skills and Docs Read

- `AGENTS.md` — §1 (What you are building), §5 (Workspace structure & separation of responsibilities), §6 (Tech stack), §7 (Decisions made: grounded search, provider embeds, Clerk, PostHog), §8 (Sanity content models: course, module, lesson, instructor, category, video, agentContext), §9 (Video transcript ingestion pipeline), §10 (Search config & MCP), §11 (Search behavior & 2 result kinds), §12 (Security gotchas & client/server boundaries), §13 (Checks to run).
- Existing codebase inspection: `package.json`, `studio/package.json`, `.env.example`, `studio/.env.example`, `app/`, `sanity/`, `lib/search/`, `studio/schemaTypes/`, `studio/scripts/ingest/`.

## Code & Structure Inspected

- **Root Workspace** (`vertex`): Next.js 16 App Router, React 19, `@clerk/nextjs`, `next-sanity`, `@ai-sdk/openai`, `@ai-sdk/mcp`, `posthog-js`, `posthog-node`, `zod`, `tailwindcss` v4.
- **Studio Workspace** (`studio`): Sanity Studio v3, schemas (`course`, `lesson`, `instructor`, `category`, `video`, `agentContext`, `progress`), offline ingestion scripts (`studio/scripts/ingest/` for YouTube, Vimeo, Bunny).
- **Search Pipeline** (`lib/search/`): MCP connection to Sanity Context endpoint, system prompts, grounding validator (`ground.ts`), schema queries, dynamic GROQ generation.

## Implementation Details for README.md

1. **Header & Badges**: Clean presentation with badges for Next.js, React 19, TypeScript, Tailwind CSS, Sanity, Clerk, PostHog, OpenAI, MCP.
2. **Value Proposition & "Why Vertex?"**: Contrast matrix against traditional LMS (Canvas, Moodle, Udemy-style course players) highlighting instant timestamped semantic retrieval, no video scrubbing friction, deterministic grounding without chat hallucinations, and headless extensibility.
3. **Architecture Diagram (ASCII / Mermaid)**: Visual diagram depicting:
   - User -> Next.js Frontend (SSR/Client) -> Clerk (Auth) -> PostHog (Analytics)
   - Next.js Search API Route (`/api/search`) -> Sanity Context MCP Server + OpenAI LLM -> Sanity Private Dataset (GROQ queries) -> Grounded Lesson & Video Moment results
   - Offline Ingestion CLI -> Video Providers (YouTube/Vimeo/Bunny) -> Transcript Chunker & TOC Extractor -> Sanity `video` documents
4. **Key Features**:
   - Natural Language Video Search (moment-level timestamp deep linking)
   - Dual Result Types (Video Moments & Topic Lessons)
   - Grounded & Deterministic AI Engine (zero hallucination)
   - Robust Course & Lesson Hierarchy with rich Portable Text and Resources
   - Learner Progress & Resume tracking
   - Enterprise Auth & Session Management (Clerk)
   - Real-time Product Telemetry (PostHog)
5. **Project Structure Tree**: Clear visual breakdown of `app/`, `components/`, `lib/`, `sanity/`, `studio/`, `prompts/`.
6. **Complete Setup & Installation Guide**:
   - Prerequisites (Node.js 20+, npm/pnpm, Git)
   - Repository cloning & package installation
   - Environment variables setup (`.env.local` for web, `studio/.env` for Sanity Studio)
   - Studio setup & Schema deployment
   - Content seeding & Video transcript ingestion workflow
   - Launching development servers
7. **Environment Variables Reference Table**: Clear demarcation of client-exposed (`NEXT_PUBLIC_*`) vs strictly server-only secrets.

## Acceptance Criteria

- `README.md` is completely rewritten to be accurate, comprehensive, professional, and well-structured.
- Covers all requested items: System Architecture, Why Vertex is better, Key Features, Tech Stack, Project Structure, Setup Guide, Environment Variables, and Examples.
- Formatted with clean GitHub Flavored Markdown, diagrams, tables, and code snippets.
- No broken links or syntax errors.

## Checks to Run

- Verify Markdown formatting and structure.
- Run `npm run lint` and `npm run typecheck` to confirm repository integrity.
