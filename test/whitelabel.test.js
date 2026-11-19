import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.join(import.meta.dirname, '..');

test('nothing committed carries AI or platform attribution', () => {
  const banned = /co-authored-by:\s*claude|generated with \[?claude|claude\.ai\/code|written by ai|ai-assisted|agentic worker|superpowers:|\bclaude\b|\banthropic\b|\bvercel\b/i;
  // docs/ops/ runbooks may name the platform (the operator's carve-out); bylines never.
  const opsBanned = /co-authored-by:\s*claude|generated with \[?claude|claude\.ai\/code|written by ai|ai-assisted|agentic worker|superpowers:/i;
  // These need the name in order to work: read at build time, a template, or
  // this file, which has to spell the patterns out to look for them.
  // history.test.js must spell the same patterns out, so it is exempt too —
  // without it this scan fails on its own sibling.
  // Both guard spellings are listed: a Next.js starter names them *.test.mjs
  // and once .mjs is scanned the guard would read itself.
  const allowed = new Set(['package.json', 'package-lock.json', 'vercel.json', '.env.example', '.vercelignore',
                           'whitelabel.test.js', 'history.test.js',
                           'whitelabel.test.mjs', 'history.test.mjs']);
  const files = [];
  (function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      // Every extension a Next.js app keeps its code in. The old list stopped at
      // .js/.ts, so .tsx pages went unread and the floor below still passed on
      // config and docs alone.
      if (['node_modules', '.git', '.vercel', 'dist', '.next'].includes(e.name)) continue;
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (/\.(js|jsx|ts|tsx|mjs|cjs|css|html|md|json|svg|csv|sql)$/.test(e.name) && !allowed.has(e.name)) files.push(p);
    }
  })(ROOT);

  // A scan that walks the wrong root, or whose allowlist swallowed everything,
  // passes exactly the way a clean tree does. Set this to the number of files a
  // FRESH CLONE has, not the working tree — a git-ignored file inflates the local
  // count and hides a floor set too high, which then goes red on the other laptop
  // and nowhere else. Verify with: git clone <remote> /tmp/x && cd /tmp/x && npm test
  // RAISE IT as the repo grows.
  const MIN_FILES = 9;
  assert.ok(files.length >= MIN_FILES,
    `the whitelabel scan read ${files.length} files, expected at least ${MIN_FILES} — ` +
    'it walked the wrong root, or the allowlist has swallowed the tree');

  const hits = [];
  for (const p of files) {
    // Not badges: a host the code has to dial, and this repo's own instruction
    // file, whose name is not a byline.
    const body = fs.readFileSync(p, 'utf8')
      .replace(/blob\.vercel-storage\.com/g, '')
      .replace(/\bCLAUDE\.md\b/g, '');
    const rel = path.relative(ROOT, p);
    const re = rel.startsWith(path.join('docs', 'ops') + path.sep) ? opsBanned : banned;
    body.split('\n').forEach((line, i) => {
      const m = line.match(re);
      if (m) hits.push(`${path.relative(ROOT, p)}:${i + 1} carries "${m[0]}"`);
    });
  }
  assert.deepStrictEqual(hits, [], 'attribution or platform strings in committed files');
});
