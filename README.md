# concede

*The naïveté that costs me.* An essay by Ed Tsue, served at
https://concede.edtsue.com and linked from the POV section of edtsue.com.

One static page, no build step: `index.html`, `styles.css`, `theme.js`
(reading mode, runs before paint), `app.js` (progress bar, light/dark toggle,
share) and `images/`. Run it with `npm run dev` and open http://localhost:5173.

`npm test` runs three checks: the words on the page against the final copy in
`docs/essay.md`, a guard over the working tree, and a guard over the commit log.

## House rules for this repo

- **The words change only when Ed changes the words.** `docs/essay.md` is the
  final copy; change it first, then the page. `npm test` fails if they differ.
- **Ungated, on purpose.** It is a public essay shared on LinkedIn, like the
  other POV essays.
- **No assistant attribution and no vendor names** in committed code, docs,
  comments or package metadata. Say "the host". `npm test` enforces both, over
  the tree and over the commit log.
- **Commit author comes from the remote**, not from a repo-local setting.
  Nothing is pinned here; do not pin one.
- **The repo root is the website.** Anything that is not the page goes in
  `.vercelignore`, or it becomes a public URL. A test checks the main ones.
- **Motion is decorative.** Every animation sits behind a reduced-motion check
  and a feature check, and each scroll range must end at a position the page
  can reach, or the text stays half-faded. Keep the bottom padding if you
  shorten the page.
- Progress and next steps live in `docs/STATUS.md`, committed and pushed.
