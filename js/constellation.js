(() => {
  const canvas = document.getElementById('skills-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const mix = (c, t) => c.map(v => Math.round(v + (255 - v) * t));
  const rgb = c => `rgb(${c.join(',')})`;
  let palette = [];
  let labelColor = '#b99aa6';
  let lineColor = 'rgba(255,31,61,.18)';
  const loadTheme = () => {
    const t = window.ThemeColors ? window.ThemeColors.get() : { a: [255, 31, 61], b: [168, 85, 247], aStr: '255, 31, 61', muted: '#b99aa6' };
    palette = [rgb(t.a), rgb(t.b), rgb(mix(t.a, .35)), rgb(mix(t.b, .35)), rgb(mix(t.a, .6))];
    labelColor = t.muted;
    lineColor = `rgba(${t.aStr}, .2)`;
  };

  const points = SITE_DATA.skillGroups.flatMap((group, groupIndex) =>
    group.skills.slice(0, 7).map((skill, index) => ({
      name: skill.name,
      stage: skill.stage,
      x: .12 + ((index * .14 + groupIndex * .11) % .78),
      y: .15 + ((groupIndex * .17 + index * .09) % .7),
      groupIndex
    })));

  let hovered = -1;
  let rect = canvas.getBoundingClientRect();

  const draw = () => {
    rect = canvas.getBoundingClientRect();
    const scale = devicePixelRatio || 1;
    canvas.width = Math.max(1, rect.width * scale);
    canvas.height = Math.max(1, rect.height * scale);
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.lineWidth = 1;
    ctx.strokeStyle = lineColor;
    points.forEach((point, index) => {
      const next = points[index + 1];
      if (!next) return;
      ctx.beginPath();
      ctx.moveTo(point.x * rect.width, point.y * rect.height);
      ctx.lineTo(next.x * rect.width, next.y * rect.height);
      ctx.stroke();
    });
    ctx.font = '11px JetBrains Mono, monospace';
    points.forEach((point, index) => {
      const x = point.x * rect.width, y = point.y * rect.height;
      const color = palette[point.groupIndex] || labelColor;
      const active = index === hovered;
      ctx.shadowColor = color;
      ctx.shadowBlur = active ? 22 : 8;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, active ? 6 : 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = active ? '#ffffff' : labelColor;
      ctx.fillText(active ? `${point.name} · ${point.stage}` : point.name, x + 10, y + 4);
    });
  };

  const pick = event => {
    const x = event.clientX - rect.left, y = event.clientY - rect.top;
    let best = -1, bestDistance = 16;
    points.forEach((point, index) => {
      const d = Math.hypot(point.x * rect.width - x, point.y * rect.height - y);
      if (d < bestDistance) { bestDistance = d; best = index; }
    });
    if (best !== hovered) { hovered = best; canvas.style.cursor = best >= 0 ? 'pointer' : ''; draw(); }
  };
  canvas.addEventListener('pointermove', pick);
  canvas.addEventListener('pointerdown', pick);
  canvas.addEventListener('pointerleave', () => { if (hovered !== -1) { hovered = -1; canvas.style.cursor = ''; draw(); } });

  addEventListener('resize', draw);
  addEventListener('themechange', () => { loadTheme(); draw(); });
  loadTheme();
  draw();
})();
