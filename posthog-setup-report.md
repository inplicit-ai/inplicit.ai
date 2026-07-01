# PostHog post-wizard report

The wizard has completed a PostHog integration for the inplicit.ai marketing site. PostHog was already partially wired up in `Layout.astro` (snippet + env var references); the wizard set the environment variable values and added seven client-side capture calls across three components. No new files were created — all changes are targeted additions to existing components via `<script is:inline>` blocks, matching the pattern recommended for static Astro sites.

| Event name | Description | File |
|---|---|---|
| `nav_demo_cta_clicked` | User clicks the 'Book demo' CTA in the sticky nav | `src/components/Nav.astro` |
| `nav_login_clicked` | User clicks the Login link in the nav | `src/components/Nav.astro` |
| `language_switched` | User toggles between EN and DE site versions | `src/components/Nav.astro` |
| `research_nav_clicked` | User clicks the Research link in the nav | `src/components/Nav.astro` |
| `hero_demo_cta_clicked` | User clicks the primary 'Book demo' CTA in the hero | `src/components/Hero.astro` |
| `hero_how_it_works_clicked` | User clicks the 'How it works' secondary CTA in the hero | `src/components/Hero.astro` |
| `cal_booking_section_viewed` | User scrolls the Cal.com booking section into view | `src/components/CalBooking.astro` |

## Next steps

We've built a dashboard and five insights to monitor key engagement and conversion signals:

- **Dashboard**: [Analytics basics (wizard)](https://eu.posthog.com/project/210446/dashboard/776438)
- [Demo Booking Funnel (wizard)](https://eu.posthog.com/project/210446/insights/osPFr7l7) — CTA click → booking section viewed
- [Demo CTA Clicks over time (wizard)](https://eu.posthog.com/project/210446/insights/oIAuQpP8) — hero + nav CTA clicks day-by-day
- [Booking Section Views (wizard)](https://eu.posthog.com/project/210446/insights/6xImUrv0) — unique visitors reaching the Cal embed
- [Login Link Clicks (wizard)](https://eu.posthog.com/project/210446/insights/vHoEAH0D) — existing user interest signal
- [Language Switches (wizard)](https://eu.posthog.com/project/210446/insights/Y8F5Iync) — EN ↔ DE toggle frequency

## Verify before merging

- [ ] Run a full production build (the wizard only verified the files it touched) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `PUBLIC_POSTHOG_KEY` and `PUBLIC_POSTHOG_HOST` to `.env.example` and any onboarding docs so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-astro-static/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
