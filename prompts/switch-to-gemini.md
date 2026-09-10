# Implementation prompt: Switch search LLM provider to Google Gemini

## Goal

Enable using a Google Gemini API key (`GEMINI_API_KEY` or `GOOGLE_GENERATIVE_AI_API_KEY`) to power the intelligent search agent in Vertex. Replace the hard-coded `@ai-sdk/openai` provider in `app/api/search/route.ts` with the official `@ai-sdk/google` provider from the Vercel AI SDK, while maintaining strict adherence to the existing search architecture, grounding validation, and zero token-leakage security boundary.

## Skills and docs read

- `AGENTS.md` — §2 (loop, prompt approval before implementation), §5 (search API is a server-only route connecting MCP + LLM + grounding, never exposes tokens to client), §6 (Vercel AI SDK integration, Zod for structured output), §11 (search behavior, query ranking, grounded results), §12 (server-only secret keys, `.env.example` canonical list), §13 (typecheck, lint, build checks).
- `.claude/skills/create-agent-with-sanity-context/SKILL.md` — MCP client integration with Vercel AI SDK; notes that the pattern works with any LLM provider via Vercel AI SDK.
- `lib/search/types.ts` — `ModelAnswerSchema` with strict Zod structured output.
- `app/api/search/route.ts` — search route handler calling `generateText` with tools from `@ai-sdk/mcp` and `Output.object({ schema: ModelAnswerSchema })`.

## Code inspected

- `app/api/search/route.ts`:
  - Currently imports `openai` from `@ai-sdk/openai`.
  - Configures `model: openai(process.env.OPENAI_SEARCH_MODEL || DEFAULT_MODEL)` with `DEFAULT_MODEL = "gpt-5"`.
  - Sets `providerOptions: { openai: { reasoningEffort: "low", textVerbosity: "low" } }`.
- `package.json`:
  - Has `"@ai-sdk/openai": "^4.0.42"`, `"ai": "^7.0.66"`, `"@ai-sdk/mcp": "^2.0.32"`, `"zod": "^4.4.3"`.
- `.env.example` and `.env`:
  - Configured with `OPENAI_API_KEY`.

## Decisions and assumptions

1. **Use `@ai-sdk/google`**:
   - Install `@ai-sdk/google` as the official, standard Vercel AI SDK adapter for Gemini.
   - Retain `@ai-sdk/openai` in package dependencies or keep it as an alternative fallback if desired, but default to Google Gemini when configured.
2. **API Key Flexibility**:
   - Support both `GEMINI_API_KEY` and `GOOGLE_GENERATIVE_AI_API_KEY` so users can paste their key using whichever standard name they prefer.
   - If neither Gemini key is found, fall back gracefully to `OPENAI_API_KEY` if present, ensuring backward compatibility.
3. **Model Selection**:
   - Default model: `gemini-2.5-flash` (fast, cost-effective, excellent tool calling and structured output).
   - Allow override via `GEMINI_SEARCH_MODEL` (or `GOOGLE_SEARCH_MODEL`).
4. **Provider Options**:
   - Strip OpenAI-specific provider options (`reasoningEffort`) when calling Gemini to avoid provider schema mismatch warnings.
5. **No Client Leaks**:
   - Server-only configuration strictly preserved. No API keys reach the client bundle or browser.

## Files to touch

- `package.json` — add `@ai-sdk/google`.
- `app/api/search/route.ts` — initialize `@ai-sdk/google` provider with `GEMINI_API_KEY` / `GOOGLE_GENERATIVE_AI_API_KEY`, support model override, handle tool execution and structured output.
- `.env.example` — document `GEMINI_API_KEY` and optional `GEMINI_SEARCH_MODEL`.
- `README.md` — update configuration and env tables to document Gemini support.

## Security considerations

- `GEMINI_API_KEY` / `GOOGLE_GENERATIVE_AI_API_KEY` is strictly server-only. It must never be prefixed with `NEXT_PUBLIC_` and never imported in any client component.
- All Gemini calls happen within `POST /api/search` inside Next.js Node.js runtime.

## Acceptance criteria

- `package.json` includes `@ai-sdk/google`.
- Search route initializes Gemini model using either `GEMINI_API_KEY` or `GOOGLE_GENERATIVE_AI_API_KEY`.
- `ModelAnswerSchema` structured output and MCP tool calling work seamlessly with Gemini.
- TypeScript typecheck (`npm run typecheck`) passes with 0 errors.
- ESLint (`npm run lint`) passes with 0 errors.
- `.env.example` updated with the new environment variables.

## Checks to run

```bash
npm run typecheck
npm run lint
```

## Manual test steps

1. Add your Gemini API key to `.env` (or `.env.local`):
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key
   ```
2. Start the dev server (`npm run dev`) or check running instance.
3. Perform a search query via the UI or `curl`:
   ```bash
   curl -X POST http://localhost:3000/api/search -H "Content-Type: application/json" -d "{\"query\": \"Next.js routing\"}"
   ```
4. Verify that the response returns 200 OK with `reply`, `count`, and grounded `results`.
