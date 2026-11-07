(() => {
  const data = SITE_DATA;
  const text = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value; };
  const html = (id, value) => { const el = document.getElementById(id); if (el) el.innerHTML = value; };
  text('nav-brand-text', data.identity.handle); text('hero-title', data.identity.name); text('hero-role', data.identity.title); text('hero-statement', data.identity.statement); text('github-username', `@${data.social.githubUsername}`); text('footer-year', new Date().getFullYear()); text('footer-name', data.identity.name);
  html('about-paragraphs', data.about.paragraphs.map(p => `<p>${p}</p>`).join(''));
  html('trait-list', data.about.traits.map(item => `<span>${item}</span>`).join(''));
  html('focus-list', data.about.currentFocus.map(item => `<div class="focus-item">${item}</div>`).join(''));
  html('stage-key', data.stageOrder.map((stage, index) => `<span style="--swatch: ${['var(--accent)','var(--accent-2)','#ff5c7a','#c084fc'][index] || '#b99aa6'}">${stage}</span>`).join(''));
  html('skill-groups', data.skillGroups.map(group => `<div class="skill-group"><h3>${group.group}</h3><div class="skill-list">${group.skills.map(skill => `<span class="skill-chip" title="${skill.stage}">${skill.name}</span>`).join('')}</div></div>`).join(''));
  text('lab-intro', data.cyberLab.intro); text('lab-exp-title', data.cyberLab.experience.title); text('lab-exp-desc', data.cyberLab.experience.description); text('lab-disclaimer', data.cyberLab.disclaimer);
  html('lab-tools', data.cyberLab.tools.map(tool => `
    <article class="tool-card">
      <div class="tool-card__head">
        <h3>${tool.name}</h3>
      </div>
      <p>${tool.use}</p>
      <div class="tool-card__actions">
        ${tool.link ? `<a class="tool-card__link" href="${tool.link}" target="_blank" rel="noopener">Official site ↗</a>` : ''}
        ${tool.videoEmbedUrl ? `<button class="tool-card__video" type="button" data-video-title="${tool.videoLabel || `${tool.name} tutorial`}" data-video-url="${tool.videoEmbedUrl}">Watch tutorial</button>` : ''}
      </div>
    </article>
  `).join(''));
  html('lab-tracks', (data.cyberLab.tracks || []).map(track => `
    <article class="tool-card lab-track-card">
      <div class="tool-card__head">
        <h3>${track.name}</h3>
      </div>
      <p>${track.objective}</p>
      <ul class="lab-track-card__topics">${track.topics.map(topic => `<li>${topic}</li>`).join('')}</ul>
      <div class="lab-track-card__meta">
        <span>Focus: ${track.tools.join(' · ')}</span>
        <span class="lab-track-card__status">Learning track</span>
      </div>
    </article>
  `).join(''));

  const labTools = document.getElementById('lab-tools');
  const videoModal = document.getElementById('video-modal');
  const videoFrame = document.getElementById('video-frame');
  const videoTitle = document.getElementById('video-modal-title');

  const closeVideoModal = () => {
    if (!videoModal || !videoFrame) return;
    videoModal.classList.remove('is-open');
    videoModal.setAttribute('aria-hidden', 'true');
    videoFrame.src = 'about:blank';
    if (videoTitle) videoTitle.textContent = 'Tutorial';
  };

  labTools?.addEventListener('click', event => {
    const trigger = event.target.closest('[data-video-url]');
    if (!trigger || !videoModal || !videoFrame) return;

    const url = trigger.getAttribute('data-video-url');
    const title = trigger.getAttribute('data-video-title') || 'Tutorial';
    if (!url) return;

    videoFrame.src = url;
    if (videoTitle) videoTitle.textContent = title;
    videoModal.classList.add('is-open');
    videoModal.setAttribute('aria-hidden', 'false');
  });

  videoModal?.addEventListener('click', event => {
    const target = event.target;
    if (target instanceof HTMLElement && (target.matches('[data-close-modal]') || target.closest('[data-close-modal]'))) {
      closeVideoModal();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && videoModal?.classList.contains('is-open')) {
      closeVideoModal();
    }
  });

  html('education-list', data.education.map(item => `<article class="education-item"><strong>${item.level}</strong><span>${item.institutionName ? `<strong>${item.institutionName}</strong><br>` : ''}${item.institution}<br>${item.location}${item.institutionUrl ? `<br><a class="education-link" href="${item.institutionUrl}" target="_blank" rel="noopener">Visit college website ↗</a>` : ''}</span>${item.status ? `<span class="badge">${item.status}</span>` : ''}</article>`).join(''));
  html('cert-list', data.certifications.map(item => {
    const actions = item.file ? `<div class="cert-item__actions"><a href="${item.file}" target="_blank" rel="noopener">Open PDF</a><a href="${item.file}" download>Download PDF</a></div>` : '';
    return `<article class="cert-item"><strong>${item.name}</strong><p>${item.type} · ${item.issuer} · Issued ${item.date}</p>${actions}</article>`;
  }).join(''));
  html('timeline-list', data.timeline.map(item => `<article class="timeline__item"><h3>${item.stage}</h3><p>${item.description}</p></article>`).join(''));
  html('interests-grid', data.interests.map(item => `<article class="interest-card"><h3>${item.name}</h3><p>${item.note}</p></article>`).join(''));
  const profile = document.getElementById('github-profile-link'); if (profile) profile.href = data.social.github;
  const canonical = document.getElementById('canonical-url'); if (canonical && data.seo.url) canonical.href = data.seo.url;
  const socialIcons = {
    GitHub: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.5-1.3-1.24-1.65-1.24-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 .1.76 2.1 3.3 1.51.1-.74.4-1.25.7-1.54-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.1-1.45 3.04-1.15 3.04-1.15.61 1.55.23 2.7.12 2.98.72.78 1.15 1.78 1.15 3 0 4.3-2.61 5.23-5.1 5.5.4.35.75 1.02.75 2.06v3.05c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"/></svg>',
    Facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8h3.4Z"/></svg>',
    Instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle class="icon-fill" cx="17.5" cy="6.7" r="1.1"/></svg>',
    WhatsApp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 11.7a8.2 8.2 0 0 1-12.1 7.2L3 20l1.2-4.9a8.2 8.2 0 1 1 16-3.4Z"/><path d="M9 8.2c.2-.4.4-.4.7-.4h.5c.2 0 .3.1.4.4l.7 1.6c.1.2 0 .4-.1.6l-.5.6c-.2.2-.2.3 0 .6.4.7 1 1.3 1.7 1.7.3.2.4.2.6 0l.7-.8c.2-.2.4-.2.6-.1l1.5.7c.3.1.4.3.4.5 0 .3-.2 1-.6 1.3-.4.4-1 .6-1.6.6-.5 0-1.2-.2-2.1-.6-1.1-.5-2.1-1.4-2.9-2.3-.7-.8-1.2-1.8-1.3-2.5-.1-.8.2-1.5.6-1.9Z"/></svg>',
    Email: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 19V5l9 7 9-7v14h-4V11l-5 4-5-4v8H3Z"/><path d="M3 5h18" /></svg>'
  };
  const socialIcon = name => socialIcons[name] || '';
  const socialLink = (name, url, label = name) => url
    ? `<a class="contact-link social-link" href="${url}" target="_blank" rel="noopener noreferrer"><span class="social-link__icon">${socialIcon(name)}</span><span>${label}</span><span class="social-link__signal" aria-hidden="true">↗</span></a>`
    : `<span class="contact-link contact-link--pending social-link"><span class="social-link__icon">${socialIcon(name)}</span><span>${name} / URL pending</span></span>`;
  const socialLinks = [['Facebook', data.social.facebook], ['Instagram', data.social.instagram]].map(([name, url]) => socialLink(name, url)).join('');
  const whatsappLink = data.social.whatsapp ? socialLink('WhatsApp', `https://wa.me/${data.social.whatsapp}?text=${encodeURIComponent('Hi Rijan, I found your portfolio.')}`, 'WhatsApp / +977 9708741190') : '';
  html('contact-side', `<h3>Open to thoughtful problems.</h3><p>For collaborations, project conversations, or simply saying hello, email is the fastest route.</p>${socialLink('Email', `mailto:${data.social.email}`, data.social.email)}${whatsappLink}${socialLink('GitHub', data.social.github, `GitHub / ${data.social.githubUsername}`)}${socialLinks}`);
  const footerSocialLinks = [
    ['GitHub', `https://github.com/${data.social.githubUsername}`],
    ['Facebook', data.social.facebook],
    ['Instagram', data.social.instagram],
    ['Email', data.social.email ? `mailto:${data.social.email}` : ''],
    ['WhatsApp', data.social.whatsapp ? `https://wa.me/${data.social.whatsapp}` : '']
  ].filter(([, url]) => Boolean(url));
  html('footer-social', footerSocialLinks.map(([name, url]) => `<a class="footer-social-link" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${name}" title="${name}"><span class="social-link__icon">${socialIcon(name)}</span><span>${name}</span></a>`).join(''));
  const navToggle = document.getElementById('nav-toggle'); const navLinks = document.getElementById('nav-links');
  navToggle?.addEventListener('click', () => { const open = navLinks?.classList.toggle('is-open'); navToggle.setAttribute('aria-expanded', String(Boolean(open))); });
  navLinks?.addEventListener('click', event => { if (event.target.closest('a')) { navLinks.classList.remove('is-open'); navToggle?.setAttribute('aria-expanded', 'false'); } });
})();
