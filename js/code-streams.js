(() => {
  const streams = {
    telemetry: [
      'const orbit = await scan(sensorGrid);',
      'telemetry.latency = 18ms;',
      'mesh.nodes.filter(node => node.ready);',
      'signal // stable // 98.4%',
      'rendering spatial interface...'
    ],
    security: [
      'watch --interface core0 --quiet',
      'hash verified: 7f:a1:cc:09',
      'firewall.rules.sync();',
      'access: authorized / local lab',
      'threat surface: nominal'
    ]
  };
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-code-stream]').forEach(stream => {
    const lines = streams[stream.dataset.codeStream] || streams.telemetry;
    let cursor = 0;
    const draw = () => {
      if (!document.hidden) {
        const line = document.createElement('span');
        line.className = 'stream-line';
        line.innerHTML = `<b>${String(cursor + 1).padStart(2, '0')}</b> ${lines[cursor % lines.length]}`;
        stream.appendChild(line);
        while (stream.children.length > 5) stream.firstElementChild.remove();
        cursor += 1;
      }
      if (!reduced) setTimeout(draw, 1250 + Math.random() * 900);
    };
    draw();
  });
})();
