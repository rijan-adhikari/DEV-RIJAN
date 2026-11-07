(() => {
  const cards = document.querySelectorAll('.project-card, .tool-card, .interest-card');
  const hoverCapable = window.matchMedia?.('(hover: hover) and (pointer: fine)')?.matches;
  if (!cards.length || !hoverCapable) return;

  cards.forEach(card => {
    card.addEventListener('pointerenter', () => {
      card.style.transform = 'translateY(-6px) scale(1.01)';
      card.style.boxShadow = '0 0 28px rgba(var(--accent-rgb), .25), 0 18px 38px rgba(0, 0, 0, .8)';
      card.style.borderColor = 'var(--accent)';
    });

    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
      card.style.borderColor = '';
    });
  });
})();
