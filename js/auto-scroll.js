(() => {
  const launch = document.getElementById('auto-scroll-toggle');
  const panel = document.getElementById('site-tour-panel');
  if (!launch || !panel) return;

  const title = document.getElementById('site-tour-title');
  const description = document.getElementById('site-tour-description');
  const progress = document.getElementById('site-tour-progress');
  const previous = document.getElementById('site-tour-prev');
  const next = document.getElementById('site-tour-next');
  const pause = document.getElementById('site-tour-pause');
  const exit = document.getElementById('site-tour-exit');
  const label = launch.querySelector('.site-tour-launch__label');
  const sections = [...document.querySelectorAll('main > section[id]')];
  const copy = {
    hero: ['Welcome to the build', 'The home screen introduces Rijan, the portfolio identity, the live system visual and the main entry points.'],
    about: ['About the developer', 'A quick look at the person behind the projects, current interests, working style and what drives the learning process.'],
    skills: ['Tech stack and tools', 'Languages, platforms and tools are grouped by area, with learning stages that show what is being explored or practised.'],
    'cyber-lab': ['Cybersecurity lab', 'This section covers security tools, learning tracks and authorised practice areas, with tutorials available when selected.'],
    projects: ['Projects and experiments', 'Browse featured work and experiments, use the project filters, and inspect each build without leaving this page.'],
    github: ['GitHub workbench', 'A live view of public repositories, with direct links available only if you choose to open them yourself.'],
    education: ['Education', 'The education section records the academic path and the institutions connected to it.'],
    certifications: ['Certificates and credentials', 'A structured archive of badges, certificates and module achievements, with document actions where files exist.'],
    journey: ['Mission control', 'A roadmap of the longer-term direction: building technical capability, shipping useful systems and growing into cybersecurity.'],
    interests: ['Behind the screen', 'Field notes cover hands-on technical work, experimentation and interests outside the main projects.'],
    contact: ['Direct connection', 'The final section gathers email and social contact options. The tour will not open any of these links.']
  };
  const duration = 6500;
  let index = 0;
  let timer = 0;
  let running = false;
  let paused = false;
  let activeSection = null;

  const clearTimer = () => {
    if (timer) window.clearTimeout(timer);
    timer = 0;
  };
  const schedule = () => {
    clearTimer();
    if (running && !paused) timer = window.setTimeout(advance, duration);
  };
  const setActive = section => {
    if (activeSection) activeSection.classList.remove('is-tour-active');
    activeSection = section;
    activeSection?.classList.add('is-tour-active');
  };
  const render = () => {
    const section = sections[index];
    if (!section) return;
    const fallbackTitle = section.querySelector('h1, h2, h3')?.textContent?.trim() || section.id;
    const details = copy[section.id] || [fallbackTitle, 'Explore this part of the portfolio.'];
    title.textContent = details[0];
    description.textContent = details[1];
    progress.textContent = `${String(index + 1).padStart(2, '0')} / ${String(sections.length).padStart(2, '0')}`;
    previous.disabled = index === 0;
    next.textContent = index === sections.length - 1 ? 'Finish' : 'Next';
    setActive(section);
    section.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  };
  const stop = () => {
    clearTimer();
    running = false;
    paused = false;
    panel.hidden = true;
    setActive(null);
    launch.classList.remove('is-running');
    launch.setAttribute('aria-pressed', 'false');
    launch.setAttribute('aria-label', 'View full website guided tour');
    launch.title = 'View Full Website';
    if (label) label.textContent = 'View Full Website';
    pause.textContent = 'Pause tour';
  };
  const advance = () => {
    if (!running) return;
    if (index >= sections.length - 1) { stop(); return; }
    index += 1;
    render();
    schedule();
  };
  const start = () => {
    if (!sections.length) return;
    index = 0;
    running = true;
    paused = false;
    panel.hidden = false;
    launch.classList.add('is-running');
    launch.setAttribute('aria-pressed', 'true');
    launch.setAttribute('aria-label', 'Stop guided website tour');
    launch.title = 'Stop guided tour';
    if (label) label.textContent = 'Tour in Progress';
    render();
    schedule();
  };

  launch.addEventListener('click', () => running ? stop() : start());
  next.addEventListener('click', () => {
    if (!running) return;
    if (index === sections.length - 1) { stop(); return; }
    advance();
  });
  previous.addEventListener('click', () => {
    if (!running || index === 0) return;
    index -= 1;
    render();
    schedule();
  });
  pause.addEventListener('click', () => {
    if (!running) return;
    paused = !paused;
    pause.textContent = paused ? 'Resume tour' : 'Pause tour';
    if (paused) clearTimer();
    else schedule();
  });
  exit.addEventListener('click', stop);

  window.addEventListener('wheel', () => { if (running) stop(); }, { passive: true });
  window.addEventListener('touchstart', () => { if (running) stop(); }, { passive: true });
  window.addEventListener('keydown', event => {
    if (running && ['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(event.key)) stop();
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden && running) stop(); });
})();