# design-sync notes

- This repo is the **Astro marketing site**, not a component library. There is
  no buildable component `dist/`, no Storybook, no library entry point.
- Per user decision (2026-06-24), only **design tokens** are synced — no
  components. Shape recorded as `tokens-only` (off-script layout, no converter).
- Bundle is hand-built into `ds-bundle/`: `styles.css` (@imports Inter + tokens),
  `tokens/design.css` (copy of `src/styles/design.css` — the token source of
  truth), `README.md` (conventions header).
- Fonts: Inter is Google-hosted (`@import` in styles.css). No local font files.
- No `_ds_sync.json` anchor (nothing to verify in a tokens-only sync); next sync
  re-uploads from `src/styles/design.css`.
- To re-sync after editing tokens: re-copy `src/styles/design.css` →
  `ds-bundle/tokens/design.css` and re-upload.
