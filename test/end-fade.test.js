import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

// At the bottom of the page every line fades except "And to that cost, I concede."
// These fail if the fade ever catches the last line, or nothing sets it off.
const ROOT = path.join(import.meta.dirname, '..');
const css = fs.readFileSync(path.join(ROOT, 'styles.css'), 'utf8');
const js = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');

test('the end fade spares the last line', () => {
  const rule = css.match(/\.at-end :is\(([^)]*\([^)]*\)[^)]*)\)\s*\{\s*opacity:\s*([\d.]+)/);
  assert.ok(rule, 'the .at-end fade rule is missing from styles.css');
  assert.match(rule[1], /\.body > p:not\(\.last\)/, 'the fade must exclude the last line');
  assert.ok(Number(rule[2]) < 0.5, 'the fade is too faint to notice');
  assert.doesNotMatch(css, /\.at-end[^{]*\.(body|paper)\s*[,{]/, 'fading a parent fades the last line too');
});

test('app.js sets at-end only when the last line is in view', () => {
  assert.match(js, /classList\.toggle\('at-end'/);
  assert.match(js, /querySelector\('\.pull\.last'\)/);
  assert.match(js, /addEventListener\('resize'/);
});
