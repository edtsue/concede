// Runs in <head> before first paint, so the page never flashes the wrong mode.
// The stylesheet keeps its dark colours in one place, [data-theme="dark"]; this
// stamps that attribute from the reader's saved choice, or else the OS setting.
(() => {
  let mode = null;
  try { mode = localStorage.getItem('concede-theme'); } catch { /* storage blocked */ }
  if (mode !== 'light' && mode !== 'dark') {
    mode = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.dataset.theme = mode;
})();
