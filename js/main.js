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
  const socialLinks = [['Facebook', data.social.facebook], ['Instagram', data.social.instagram]].map(([name, url]) => url ? `<a class="contact-link" href="${url}" target="_blank" rel="noopener">${name}</a>` : `<span class="contact-link contact-link--pending">${name} / URL pending</span>`).join('');
  const whatsappLink = data.social.whatsapp ? `<a class="contact-link" href="https://wa.me/${data.social.whatsapp}?text=${encodeURIComponent('Hi Rijan, I found your portfolio.') }" target="_blank" rel="noopener">WhatsApp / +977 9708741190</a>` : '';
  html('contact-side', `<h3>Open to thoughtful problems.</h3><p>For collaborations, project conversations, or simply saying hello, email is the fastest route.</p><a class="contact-link" href="mailto:${data.social.email}">${data.social.email}</a>${whatsappLink}<a class="contact-link" href="${data.social.github}" target="_blank" rel="noopener">GitHub / ${data.social.githubUsername}</a>${socialLinks}`);
  const navToggle = document.getElementById('nav-toggle'); const navLinks = document.getElementById('nav-links');
  navToggle?.addEventListener('click', () => { const open = navLinks?.classList.toggle('is-open'); navToggle.setAttribute('aria-expanded', String(Boolean(open))); });
  navLinks?.addEventListener('click', event => { if (event.target.closest('a')) { navLinks.classList.remove('is-open'); navToggle?.setAttribute('aria-expanded', 'false'); } });
})();
