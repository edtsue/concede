// Reading-progress bar, light/dark toggle and share. Nothing here is needed to read the essay.
const root = document.documentElement;

const bar = document.getElementById('progress-bar');
let queued = false;
function paintProgress() {
  queued = false;
  const max = root.scrollHeight - root.clientHeight;
  bar.style.transform = `scaleX(${max > 0 ? Math.min(1, root.scrollTop / max) : 0})`;
}
addEventListener('scroll', () => {
  if (!queued) { queued = true; requestAnimationFrame(paintProgress); }
}, { passive: true });
paintProgress();

const isDark = () => root.dataset.theme
  ? root.dataset.theme === 'dark'
  : matchMedia('(prefers-color-scheme: dark)').matches;
document.getElementById('theme-toggle').addEventListener('click', () => {
  const next = isDark() ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('concede-theme', next); } catch { /* not saved; still switched */ }
});

const shareBtn = document.getElementById('share');
const shareLabel = document.getElementById('share-label');
shareBtn.addEventListener('click', async () => {
  const data = { title: document.title, url: location.href.split('#')[0] };
  if (navigator.share) {
    try { await navigator.share(data); } catch { /* reader closed the share sheet */ }
    return;
  }
  try {
    await navigator.clipboard.writeText(data.url);
    shareLabel.textContent = 'Link copied';
  } catch {
    shareLabel.textContent = 'Copy failed';
  }
  setTimeout(() => { shareLabel.textContent = 'Share'; }, 2000);
});
