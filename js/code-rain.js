/* Falling red/violet code rain behind the whole site.
   Light on CPU: ~20 fps, pauses when tab is hidden, disabled for reduced-motion. */
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const canvas = document.createElement('canvas');
  canvas.className = 'code-rain';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');
  const glyphs = '01<>{}[]/\\|;:=+*#$%&アイウエオカキクケコサシスセソ'.split('');
  const size = 15;
  let cols = 0, drops = [], w = 0, h = 0, last = 0, running = true;

  const css = (name, fallback) => getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
  let rgb1 = '255,31,61', rgb2 = '168,85,247';
  const readColors = () => { rgb1 = css('--accent-rgb', rgb1); rgb2 = css('--accent-2-rgb', rgb2); };

  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    w = innerWidth; h = innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, w, h);
    cols = Math.ceil(w / size);
    drops = Array.from({ length: cols }, () => Math.random() * -50);
  };

  const frame = (t) => {
    if (!running) return;
    requestAnimationFrame(frame);
    if (t - last < 50) return;           // ~20 fps
    last = t;
    ctx.fillStyle = 'rgba(0,0,0,.12)';   // trailing fade keeps the background pure black
    ctx.fillRect(0, 0, w, h);
    ctx.font = `${size}px "JetBrains Mono", monospace`;
    for (let i = 0; i < cols; i++) {
      const y = drops[i] * size;
      if (y > 0) {
        ctx.fillStyle = `rgba(${i % 7 === 0 ? rgb2 : rgb1},${i % 5 === 0 ? .95 : .55})`;
        ctx.fillText(glyphs[(Math.random() * glyphs.length) | 0], i * size, y);
      }
      if (y > h && Math.random() > .975) drops[i] = Math.random() * -20;
      drops[i] += .6 + (i % 4) * .12;
    }
  };

  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    if (running) requestAnimationFrame(frame);
  });
  new MutationObserver(readColors).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  addEventListener('resize', resize);
  readColors(); resize(); requestAnimationFrame(frame);
})();
