// Reading-progress bar, light/dark toggle and share. Nothing here is needed to read the essay.
const root = document.documentElement;

const bar = document.getElementById('progress-bar');
const lastLine = document.querySelector('.pull.last');
const masthead = document.querySelector('.masthead');
let queued = false;
// "at-end": the reader has reached the bottom of the page AND can see the last
// line below the sticky masthead. The stylesheet then fades everything else, so
// "And to that cost, I concede." stands alone. Scrolling back up undoes it.
// The visibility half matters on short screens (a landscape phone), where the
// page bottom can sit below the last line and would otherwise fade to nothing.
function paintProgress() {
  queued = false;
  const max = root.scrollHeight - root.clientHeight;
  bar.style.transform = `scaleX(${max > 0 ? Math.min(1, root.scrollTop / max) : 0})`;
  const box = lastLine.getBoundingClientRect();
  const seen = box.top >= masthead.getBoundingClientRect().bottom && box.bottom <= innerHeight;
  root.classList.toggle('at-end', max > 0 && max - root.scrollTop <= 48 && seen);
}
const queue = () => { if (!queued) { queued = true; requestAnimationFrame(paintProgress); } };
addEventListener('scroll', queue, { passive: true });
addEventListener('resize', queue);
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
