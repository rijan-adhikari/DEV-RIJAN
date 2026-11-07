(() => {
  const target = document.getElementById('github-repos');
  const fallback = document.getElementById('github-fallback');
  if (!target) return;

  const liveSites = { 'proposal-website': 'https://proposal-website-g4n8.onrender.com' };
  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
  const safeGitHubURL = value => {
    try {
      const url = new URL(value);
      return url.protocol === 'https:' && url.hostname === 'github.com' ? url.href : '';
    } catch (error) { return ''; }
  };

  fetch(`https://api.github.com/users/${encodeURIComponent(SITE_DATA.social.githubUsername)}/repos?sort=updated&per_page=6`)
    .then(response => {
      if (!response.ok) throw new Error('GitHub data is temporarily unavailable');
      return response.json();
    })
    .then(repos => {
      if (!Array.isArray(repos) || !repos.length) throw new Error('No public repositories returned');
      target.innerHTML = repos.map((repo, index) => {
        const repoUrl = safeGitHubURL(repo.html_url);\n        if (!repoUrl) throw new Error('GitHub returned an invalid repository URL');\n        const name = escapeHTML(repo.name);
        const description = escapeHTML(repo.description || 'I am still working on the description for this repository.');
        const language = escapeHTML(repo.language || 'Repository');
        const updated = repo.updated_at ? new Date(repo.updated_at).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : '';
        const demo = liveSites[repo.name];
        return `<article class="repo">
          <div class="repo__top"><span>REPOSITORY / ${String(index + 1).padStart(2, '0')}</span><span class="repo__state"><i></i> PUBLIC</span></div>
          <a class="repo__source" href="${escapeHTML(repoUrl)}" target="_blank" rel="noopener noreferrer">
            <h3>${name}</h3><p>${description}</p>
          </a>
          <div class="repo__details"><span class="repo__language"><i></i>${language}</span>${updated ? `<span>UPDATED ${escapeHTML(updated)}</span>` : ''}</div>
          <div class="repo__actions">
            <a href="${escapeHTML(repo.html_url)}" target="_blank" rel="noopener noreferrer">SOURCE CODE <span>↗</span></a>
            ${demo ? `<a class="repo__demo" href="${demo}" target="_blank" rel="noopener noreferrer">LIVE PREVIEW <span>↗</span></a>` : ''}
          </div>
        </article>`;
      }).join('');
      if (fallback) fallback.classList.add('visually-hidden');
    })
    .catch(() => { if (fallback) fallback.classList.remove('visually-hidden'); });
})();