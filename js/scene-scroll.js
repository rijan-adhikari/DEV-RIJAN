(() => {
  const sections = [...document.querySelectorAll('.section')];
  if (!sections.length) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let targetScroll = scrollY;
  let currentScroll = targetScroll;
  let frame = 0;

  const measure = () => {
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const center = rect.top + (targetScroll - currentScroll) + rect.height / 2;
      const distance = (center - innerHeight / 2) / (innerHeight + rect.height);
      const progress = Math.max(-1, Math.min(1, distance));
      section.style.setProperty('--scene-progress', progress.toFixed(3));
      section.classList.toggle('section--near', Math.abs(progress) < .58);
    });
    document.documentElement.style.setProperty('--page-progress', `${currentScroll / Math.max(1, document.documentElement.scrollHeight - innerHeight)}`);
  };

  const tick = () => {
    currentScroll += (targetScroll - currentScroll) * .1;
    measure();
    if (Math.abs(targetScroll - currentScroll) > .15) {
      frame = requestAnimationFrame(tick);
    } else {
      currentScroll = targetScroll;
      measure();
      frame = 0;
    }
  };

  const requestMeasure = () => {
    targetScroll = scrollY;
    if (reduced) {
      currentScroll = targetScroll;
      measure();
      return;
    }
    if (!frame) frame = requestAnimationFrame(tick);
  };

  addEventListener('scroll', requestMeasure, { passive: true });
  addEventListener('resize', requestMeasure, { passive: true });
  requestMeasure();
})();
