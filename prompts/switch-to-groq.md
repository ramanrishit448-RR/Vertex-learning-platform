# Goal
Switch the search LLM provider from Google Gemini to Groq (using Llama 3) to overcome Gemini's token limits and benefit from Groq's blazing fast inference.

# Code Inspected
- `app/api/search/route.ts`: Verified how the Vercel AI SDK invokes the model inside `generateText` using `createGoogleGenerativeAI`.
- `package.json`: Checked for AI SDK dependencies. We will install `@ai-sdk/groq` to cleanly connect to the Groq API.
- `.env`: Will need a new `GROQ_API_KEY` variable.

# Decisions and Assumptions
- We will install the official `@ai-sdk/groq` provider.
- We will configure `app/api/search/route.ts` to instantiate the Groq client. We'll set the default model to `llama-3.3-70b-versatile` (which supports tool calling and structured outputs needed by the Sanity MCP).
- We'll keep the fallback structure, checking for `GROQ_API_KEY` before falling back to OpenAI/Gemini.
- Since Groq is known for its speed, this should heavily reduce search latency while providing high-quality LLM-generated search hits via Llama 3.

# Files to Touch
- `package.json` (running `npm i @ai-sdk/groq`)
- `app/api/search/route.ts` [MODIFY]
- `.env` and `.env.example` [MODIFY]

# Requirements & Acceptance Criteria
- Running `npm run build` succeeds without type errors.
- Setting `GROQ_API_KEY` routes searches through the Groq provider.
- Structured search results are correctly returned via the `generateText` function.

# Security Considerations
- `GROQ_API_KEY` must remain server-side only (never prefixed with `NEXT_PUBLIC_`). The existing `app/api/search/route.ts` structure already guarantees this.

# Checks to Run
- `npm run lint` and `npm run typecheck`
- Manual search verification in the browser.

# Manual Test Steps
1. Get a Groq API Key from `console.groq.com/keys` and add it to `.env` as `GROQ_API_KEY`.
2. Restart the Next.js dev server.
3. Perform a search in the UI and verify that results load instantly using Groq.
