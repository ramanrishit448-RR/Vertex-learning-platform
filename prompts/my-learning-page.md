# Goal
Implement the `/my-learning` page, resolving the 404 error when clicking "My Learning" in the navbar. Per `AGENTS.md`, "My Learning" is presentational because learner progress is not tracked yet. Therefore, it will show an empty state matching the theme of the site.

# Code Inspected
- `AGENTS.md`: Confirmed that progress tracking is not yet implemented (Rule 7: "Progress is tracked per learner... kept apart from the read only content above."). It also states: "Some surfaces are presentational only, with no backend of their own: the My Learning page".
- `app/courses/page.tsx`: For layout reference (`PageFrame`, `SiteHeader`, `ChartDecoration`).
- `components/nav/navbar.tsx`: Confirmed the link points to `/my-learning`.
- `app/layout.tsx`: Confirmed Clerk is configured. There is no Next.js `middleware.ts` protecting routes yet.

# Decisions and Assumptions
- Because progress tracking doesn't exist yet, we will build a beautiful presentational placeholder using the existing components.
- The page requires the user to be signed in. We will use Clerk's `currentUser()` on the server side to protect the route. If the user is not signed in, we will show a "Sign in to view your learning progress" state using Clerk's `<SignedOut>` and `<SignedIn>` components, or simply redirect to the home page or a sign-in button. We will use Clerk's `auth().protect()` or similar server-side check.
- We will reuse the `PageFrame`, `SiteHeader` (with `activeHref="/my-learning"`), and standard typographic classes.

# Files to Touch
- `app/my-learning/page.tsx` (NEW)

# Requirements & Acceptance Criteria
- Clicking "My Learning" in the navigation goes to `/my-learning`.
- The page renders without errors.
- The layout perfectly matches the aesthetic of the site (margins, fonts, borders).
- It displays a sensible empty state (e.g., "You haven't started any courses yet").
- The route is protected (if not signed in, prompt to sign in).

# Security Considerations
- `My Learning` data is inherently user-specific. Even though we are just doing an empty state for now, we must ensure it strictly requires a Clerk session.

# Checks to Run
- `npm run lint` and `npm run typecheck`
- Verify the page builds with `npm run build`.

# Manual Test Steps
1. Make sure you are signed in.
2. Click "My Learning" in the top navigation.
3. Verify that you see the new My Learning empty state page.
4. Sign out.
5. Try to visit `/my-learning` directly. Verify that it prompts you to sign in.
