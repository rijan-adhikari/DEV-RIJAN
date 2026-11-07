(() => {
  const button = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const DEFAULT = { a: [255, 31, 61], b: [168, 85, 247] };

  // Shared helper: canvases / WebGL read the live accent colours from CSS variables.
  const hex = c => '#' + c.map(v => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0')).join('');
  const readRgb = (styles, name, fallback) => {
    const parts = styles.getPropertyValue(name).replace(/\s/g, '').split(',').map(Number);
    return parts.length === 3 && parts.every(Number.isFinite) ? parts : fallback;
  };
  window.ThemeColors = {
    get() {
      const styles = getComputedStyle(root);
      const a = readRgb(styles, '--accent-rgb', DEFAULT.a);
      const b = readRgb(styles, '--accent-2-rgb', DEFAULT.b);
      return { a, b, aStr: a.join(', '), bStr: b.join(', '), aHex: hex(a), bHex: hex(b), muted: styles.getPropertyValue('--muted').trim() || '#b99aa6' };
    }
  };

  const apply = mode => {
    root.dataset.theme = mode;
    if (button) {
      button.setAttribute('aria-label', mode === 'violet' ? 'Switch accent to red' : 'Switch accent to violet');
      button.setAttribute('aria-pressed', String(mode === 'violet'));
    }
    dispatchEvent(new Event('themechange'));
  };

  let saved = null;
  try { saved = localStorage.getItem('site-theme'); } catch (e) {}
  apply(saved === 'violet' ? 'violet' : 'dark');   // an old "light" value is ignored -> always AMOLED black

  button?.addEventListener('click', () => {
    const next = root.dataset.theme === 'violet' ? 'dark' : 'violet';
    apply(next);
    try { localStorage.setItem('site-theme', next); } catch (e) {}
  });
})();
