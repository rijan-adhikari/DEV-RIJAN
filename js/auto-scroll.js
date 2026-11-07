(() => {
  const button = document.getElementById('auto-scroll-toggle');
  if (!button) return;

  const root = document.documentElement;
  const speed = 500;
  let animationFrame = 0;
  let previousFrame = 0;
  let previousScrollBehavior = '';

  const stop = () => {
    if (!animationFrame && !button.classList.contains('is-running')) return;
    cancelAnimationFrame(animationFrame);
    animationFrame = 0;
    previousFrame = 0;
    root.style.scrollBehavior = previousScrollBehavior;
    button.classList.remove('is-running');
    button.setAttribute('aria-label', 'Start auto-scroll');
    button.setAttribute('aria-pressed', 'false');
    button.title = 'Start auto-scroll tour';
  };

  const advance = timestamp => {
    if (!previousFrame) previousFrame = timestamp;
    const elapsed = Math.min(timestamp - previousFrame, 50);
    previousFrame = timestamp;
    window.scrollBy(0, speed * elapsed / 1000);

    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1) {
      stop();
    } else {
      animationFrame = requestAnimationFrame(advance);
    }
  };

  const start = () => {
    previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1) {
      window.scrollTo(0, 0);
    }
    button.classList.add('is-running');
    button.setAttribute('aria-label', 'Stop auto-scroll');
    button.setAttribute('aria-pressed', 'true');
    button.title = 'Stop auto-scroll';
    animationFrame = requestAnimationFrame(advance);
  };

  button.addEventListener('click', () => {
    if (button.classList.contains('is-running')) stop();
    else start();
  });

  document.addEventListener('pointerdown', event => {
    if (!button.contains(event.target)) stop();
  }, { passive: true });
  window.addEventListener('wheel', stop, { passive: true });
  window.addEventListener('keydown', event => {
    if (['ArrowDown', 'ArrowUp', 'End', 'Home', 'PageDown', 'PageUp', ' '].includes(event.key)) stop();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
  });
})();