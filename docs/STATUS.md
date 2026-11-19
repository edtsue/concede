# concede — status

## Right now

- ✅ **did:** built the essay page (mockup A: same look as the agency2035 essay, the Magritte-style painting, three pull quotes, four subtle animations), tests passing locally.
- ❗ **waiting on you:** the first push, then the host project and the domain — see the latest chat for the steps.
- ➡️ **next:** live check of concede.edtsue.com; the POV card on edtsue.com goes live in the same round.
- ⚠️ **worth knowing:** the animations only play in browsers that support scroll-driven animation; everywhere else the page simply appears. Nothing is ever hidden.
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
- **Motion built in CSS only** (scroll-driven animations behind a feature check),
  with no script fallback: it is decorative, so older browsers get the plain page.
- **Header image:** generated 2026-11-19, "after Magritte, *La reproduction
  interdite*". The originals and every earlier mockup are in
  ~/Creative/linkedin-header on the work laptop (not in this repo).
- **Title in sentence case with a full stop**, as Ed wrote it, matching the
  other POV cards ("Samsung's worst day.").
