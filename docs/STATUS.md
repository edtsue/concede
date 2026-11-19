# concede — status

## Right now

- ✅ **did (2026-11-19):** end fade — once the reader reaches the bottom with the last line in view, everything else fades to 12% and "And to that cost, I concede." stands alone; scrolling up brings it all back. Checked headless at 5 sizes, light and dark. Build `2026-11-19.4`, committed, NOT pushed.
- ❗ **waiting on you:** say "push" — 2 commits, 1 host project, 1 build.
- ➡️ **next:** after the push, confirm build `.4` is live; then check the POV card on edtsue.com (other repo).
- ⚠️ **worth knowing:** on a phone held sideways the last line can't fit on screen at the page bottom, so the fade doesn't happen there (on purpose: fading with the last line off-screen would leave nothing to read). Readers who ask for reduced motion don't get the fade.
- 🗂 **where:** `index.html` (the words), `docs/essay.md` (the final copy they must match), `styles.css` (look and motion), `app.js` (sets the end state).

---

## Build choices (2026-11-19)

- **Stack: one static page, no build.** A ~480-word essay; nothing to search
  GitHub for — no logins, data or libraries. Same approach as the agency2035 essay.
- **Look: mockup A, "same family, quieter"** (Ed picked A over a full-screen
  gallery opening and a "The Work." typographic opener). Salmon paper and claret
  accent kept (2A). The highlights-and-notes tool left out (3A).
- **Motion: 1 + 2 + 3 + 4** — paragraphs fade in on scroll, the painting fades up
  on load, the pull-quote bar draws itself, the last line lands last. Ruled out:
  fading read text out (gets in the way of re-reading), word-by-word headline
  (gimmicky), a face-to-back-of-head mirror crossfade (needs a second image,
  most readers would miss it).
- **Motion 5, added later the same day: grey to black.** Each paragraph starts
  20% ink (1.52:1 light, 1.77:1 dark, faint on purpose) and is full ink once it has
  risen min(45vh, 400px) above the bottom of the screen, about mid-screen. Read text
  stays black, so fading read text *out* is still ruled out. The 400px cap keeps
  the last line able to finish, checked headless from 760px to 1600px tall.
  Ruled out: the first version (50% start, black by 260px up) showed almost no
  fade, because text was black long before the reader reached it.
- **Motion 6, added 2026-11-19: the end fade.** At the page bottom, with the last
  line visible below the masthead, everything except the last line fades to 12%
  opacity over 1.4s; scroll up and it returns. The More card comes back on hover or
  Tab. **This deliberately reverses "fading read text out is ruled out"** — Ed asked
  for it; it only happens at the very end and undoes on scroll-up, so re-reading is
  unharmed. A small script (app.js) sets the state, since CSS alone cannot tell
  "reached the end". Ruled out: triggering on page bottom alone — on a short
  screen it faded everything with the last line off-screen.
- **Motions 1–5 built in CSS only** (scroll-driven animations behind a feature check),
  with no script fallback: it is decorative, so older browsers get the plain page.
- **Header image:** generated 2026-11-19, "after Magritte, *La reproduction
  interdite*". The originals and every earlier mockup are in
  ~/Creative/linkedin-header on the work laptop (not in this repo).
- **Title in sentence case with a full stop**, as Ed wrote it, matching the
  other POV cards ("Samsung's worst day.").
