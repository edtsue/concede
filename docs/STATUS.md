# concede — status

## Right now

- ✅ **did (2026-11-19):** grey-to-black made stronger after Ed saw too little fade on build `.2`: starts much paler and reaches black about mid-screen. Committed locally as build `2026-11-19.3`; live is still `.2`.
- ❗ **waiting on you:** a look on localhost, then the OK to push (1 push, 1 host build).
- ➡️ **next:** confirm the POV card on edtsue.com is live (other repo, not checked yet).
- ⚠️ **worth knowing:** the animations only play in browsers that support scroll-driven animation; everywhere else the page simply appears, in full black. Nothing is ever hidden.
- 🗂 **where:** `index.html` (the words), `docs/essay.md` (the final copy they must match), `styles.css` (look and motion).

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
- **Motion built in CSS only** (scroll-driven animations behind a feature check),
  with no script fallback: it is decorative, so older browsers get the plain page.
- **Header image:** generated 2026-11-19, "after Magritte, *La reproduction
  interdite*". The originals and every earlier mockup are in
  ~/Creative/linkedin-header on the work laptop (not in this repo).
- **Title in sentence case with a full stop**, as Ed wrote it, matching the
  other POV cards ("Samsung's worst day.").
