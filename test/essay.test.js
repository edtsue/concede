import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

// The words on the page come from docs/essay.md, Ed's final copy. This fails the
// moment a paragraph on the page drifts from it, gains one, or loses one.
const ROOT = path.join(import.meta.dirname, '..');
const md = fs.readFileSync(path.join(ROOT, 'docs', 'essay.md'), 'utf8');
const page = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

const blocks = md.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean);
const title = blocks[0].replace(/^#\s*/, '');
const sep = blocks.indexOf('///');
const paragraphs = blocks.slice(1, sep);
const disclaimer = blocks[sep + 1];

const text = html => html.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
const bodyHtml = page.match(/<div class="body">([\s\S]*?)<\/div>/)[1];
const onPage = [...bodyHtml.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map(m => text(m[1]));

test('the source copy parses into the shape the page expects', () => {
  assert.ok(sep > 1, 'docs/essay.md lost its /// separator');
  assert.ok(paragraphs.length >= 10, `only ${paragraphs.length} paragraphs read from docs/essay.md`);
});

test('every paragraph on the page matches the final copy, in order', () => {
  assert.deepStrictEqual(onPage, paragraphs);
});

test('title and disclaimer match the final copy', () => {
  assert.strictEqual(text(page.match(/<h1>([\s\S]*?)<\/h1>/)[1]), title);
  assert.strictEqual(text(page.match(/<p class="disclaimer">([\s\S]*?)<\/p>/)[1]), disclaimer);
});

test('the share card and the page point at the live address and real images', () => {
  for (const img of ['images/hero.jpg', 'images/og.jpg']) {
    assert.ok(fs.existsSync(path.join(ROOT, img)), `${img} is missing`);
  }
  assert.match(page, /property="og:image" content="https:\/\/concede\.edtsue\.com\/images\/og\.jpg"/);
  assert.match(page, /rel="canonical" href="https:\/\/concede\.edtsue\.com\/"/);
});

test('nothing outside the page is published', () => {
  const ignored = fs.readFileSync(path.join(ROOT, '.vercelignore'), 'utf8').split('\n').map(s => s.trim());
  for (const p of ['README.md', 'docs', 'test', 'package.json']) {
    assert.ok(ignored.includes(p), `${p} would be a public URL — add it to .vercelignore`);
  }
});
