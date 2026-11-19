import test from 'node:test';
import assert from 'node:assert';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = path.join(import.meta.dirname, '..');
const BANNED = /co-authored-by:\s*claude|generated with \[?claude|claude\.ai\/code|written by ai|ai-assisted|agentic worker|superpowers:|\bclaude\b|\banthropic\b/i;
// A commit that edits CLAUDE.md has to name it; a path is not a byline.
const exempt = s => s.replace(/\bCLAUDE\.md\b/gi, '');

test('no commit in this history carries assistant attribution', () => {
  let out;
  try {
    out = execFileSync('git', ['log', '--format=%B%n%an <%ae>%n%cn <%ce>'],
      { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
  } catch { return; }   // runnable from a source drop with no git
  const hits = out.split('\n').map(exempt).filter(l => BANNED.test(l))
    .map(l => l.trim().slice(0, 70));
  assert.deepStrictEqual(hits, [], 'attribution found in the commit log');
});
