(() => {
  const filters = document.getElementById('project-filters');
  const grid = document.getElementById('project-grid');
  if (!filters || !grid || !window.SITE_DATA?.projects) return;

  const projects = SITE_DATA.projects;
  const categories = ['All Projects', ...SITE_DATA.projectCategories];
  let activeCategory = 'Featured';
  let searchTerm = '';

  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);

  const safeURL = value => {
    try {
      const url = new URL(value);
      return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
    } catch (_) {
      return '';
    }
  };

  const shortStatus = status => {
    const value = String(status || '').toLowerCase();
    if (value.includes('complete')) return 'COMPLETED';
    if (value.includes('live')) return 'LIVE';
    if (value.includes('development')) return 'IN DEVELOPMENT';
    if (value.includes('ongoing')) return 'ONGOING';
    if (value.includes('learning')) return 'LEARNING';
    return 'EXPERIMENT';
  };

  const completedCount = projects.filter(project => /complete|live/i.test(project.status || '')).length;
  const activeCount = projects.length - completedCount;

  const consolePanel = document.createElement('div');
  consolePanel.className = 'project-console panel reveal is-visible';
  consolePanel.innerHTML = `
    <div class="project-console__top">
      <div>
        <span class="project-console__eyebrow">PROJECT DATABASE // ACCESS GRANTED</span>
        <h3>Build archive<span class="project-console__cursor">_</span></h3>
        <p>Independent builds, experiments, and systems in progress.</p>
      </div>
      <div class="project-console__signal"><i></i> ARCHIVE ONLINE</div>
    </div>
    <div class="project-console__metrics" aria-label="Project archive statistics">
      <div><strong>${projects.length.toString().padStart(2, '0')}</strong><span>PROJECTS INDEXED</span></div>
      <div><strong>${completedCount.toString().padStart(2, '0')}</strong><span>COMPLETED / LIVE</span></div>
      <div><strong>${activeCount.toString().padStart(2, '0')}</strong><span>ACTIVE / LEARNING</span></div>
    </div>
    <label class="project-search">
      <span aria-hidden="true">⌕</span>
      <input type="search" id="project-search-input" placeholder="Search builds, tools, technologies..." autocomplete="off" aria-label="Search projects">
      <kbd>SEARCH</kbd>
    </label>
  `;
  filters.parentNode.insertBefore(consolePanel, filters);

  filters.innerHTML = categories.map(category =>
    `<button class="filter-btn ${category === activeCategory ? 'is-active' : ''}" type="button" data-filter="${escapeHTML(category)}" aria-pressed="${category === activeCategory}">${escapeHTML(category === 'All Projects' ? 'ALL BUILDS' : category.toUpperCase())}</button>`
  ).join('');

  const searchInput = consolePanel.querySelector('#project-search-input');

  const render = () => {
    const visible = projects.map((project, index) => ({ project, index }))
      .filter(({ project }) => {
        const categoryMatch = activeCategory === 'All Projects'
          || (project.categories || []).includes(activeCategory);
        const haystack = [
          project.title, project.summary, project.problem, project.built,
          project.status, ...(project.stack || []), ...(project.categories || [])
        ].join(' ').toLowerCase();
        return categoryMatch && haystack.includes(searchTerm);
      });

    grid.setAttribute('aria-live', 'polite');
    grid.innerHTML = visible.map(({ project, index }) => {
      const number = String(index + 1).padStart(2, '0');
      const title = escapeHTML(project.title);
      const categoriesHTML = (project.categories || []).filter(item => item !== 'Featured')
        .map(item => `<span class="project-card__category">${escapeHTML(item)}</span>`).join('');
      const tagsHTML = (project.stack || [])
        .map(tag => `<span class="tag">${escapeHTML(tag)}</span>`).join('');
      const challengesHTML = project.challenges?.length
        ? `<div class="project-card__detail-block"><span>LEARNING EDGES</span><ul>${project.challenges.map(item => `<li>${escapeHTML(item)}</li>`).join('')}</ul></div>`
        : '';
      const filesHTML = project.files?.length
        ? `<p class="mono project-card__files">FILES // ${project.files.map(escapeHTML).join(' · ')}</p>`
        : '';
      const githubURL = safeURL(project.links?.github);
      const liveURL = safeURL(project.links?.live);
      const actions = [
        githubURL ? `<a class="project-card__action" href="${escapeHTML(githubURL)}" target="_blank" rel="noopener noreferrer">SOURCE CODE <span aria-hidden="true">↗</span></a>` : '',
        liveURL ? `<a class="project-card__action project-card__action--primary" href="${escapeHTML(liveURL)}" target="_blank" rel="noopener noreferrer">LIVE DEMO <span aria-hidden="true">↗</span></a>` : ''
      ].filter(Boolean).join('');

      return `
        <article class="project-card reveal is-visible">
          <div class="project-card__scan" aria-hidden="true"></div>
          <div class="project-card__topline"><span>BUILD // ${number}</span><span class="project-card__state"><i></i>${escapeHTML(shortStatus(project.status))}</span></div>
          <div class="project-card__heading">
            <div><div class="project-card__categories">${categoriesHTML}</div><h3>${title}</h3></div>
            <span class="project-card__number">${number}</span>
          </div>
          <p class="project-card__summary">${escapeHTML(project.summary)}</p>
          <div class="project-card__tags">${tagsHTML}</div>
          <details class="project-card__details">
            <summary><span>INSPECT THE BUILD</span><span class="project-card__expand" aria-hidden="true">+</span></summary>
            <div class="project-card__detail-content">
              <div class="project-card__detail-block"><span>01 // PROBLEM</span><p>${escapeHTML(project.problem)}</p></div>
              <div class="project-card__detail-block"><span>02 // IMPLEMENTATION</span><p>${escapeHTML(project.built)}</p></div>
              ${challengesHTML}
              ${filesHTML}
            </div>
          </details>
          ${actions ? `<div class="project-card__actions">${actions}</div>` : '<div class="project-card__no-link">SOURCE / DEMO LINK NOT PUBLISHED</div>'}
          <div class="project-card__status"><span>STATUS //</span> ${escapeHTML(project.status)}</div>
        </article>`;
    }).join('') || `
      <div class="project-empty panel">
        <span>NO MATCHING BUILDS // 404</span>
        <p>No project matches that query. Try another keyword or reset the filters.</p>
        <button class="filter-btn" type="button" data-reset-projects>RESET ARCHIVE</button>
      </div>`;

    const count = document.getElementById('project-result-count');
    if (count) count.textContent = `${visible.length} / ${projects.length} BUILDS`;
  };

  const countLabel = document.createElement('div');
  countLabel.className = 'project-result-count mono';
  countLabel.id = 'project-result-count';
  filters.insertAdjacentElement('afterend', countLabel);

  filters.addEventListener('click', event => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;
    activeCategory = button.dataset.filter;
    filters.querySelectorAll('[data-filter]').forEach(item => {
      const selected = item === button;
      item.classList.toggle('is-active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    render();
  });

  grid.addEventListener('click', event => {
    if (!event.target.closest('[data-reset-projects]')) return;
    activeCategory = 'All Projects';
    searchTerm = '';
    searchInput.value = '';
    filters.querySelectorAll('[data-filter]').forEach(item => {
      const selected = item.dataset.filter === activeCategory;
      item.classList.toggle('is-active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    render();
  });

  searchInput.addEventListener('input', () => {
    searchTerm = searchInput.value.trim().toLowerCase();
    render();
  });

  render();
})();