(() => {
	const form = document.getElementById('contact-form');
	const toast = document.getElementById('contact-toast');
	if (!form || !toast) return;

	form.addEventListener('submit', event => {
		event.preventDefault();
		const values = Object.fromEntries(new FormData(form));
		let valid = true;

		[
			['name', values.name?.trim() ? '' : 'Please add your name.'],
			['email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email || '') ? '' : 'Enter a valid email.'],
			['message', values.message?.trim().length >= 10 ? '' : 'Enter at least 10 characters.']
		].forEach(([name, error]) => {
			const target = form.querySelector(`[data-error-for="${name}"]`);
			if (target) target.textContent = error;
			if (error) valid = false;
		});

		if (!valid) return;

		const subject = `Portfolio message from ${values.name.trim()}`;
		const body = `${values.message.trim()}\n\nFrom: ${values.name.trim()}\nEmail: ${values.email.trim()}`;
		toast.textContent = 'Opening your email app in a new tab...';
		const mailtoUrl = `mailto:${SITE_DATA.social.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
		const mailLink = document.createElement('a');
		mailLink.href = mailtoUrl;
		mailLink.target = '_blank';
		mailLink.rel = 'noopener noreferrer';
		document.body.appendChild(mailLink);
		mailLink.click();
		mailLink.remove();
	});
})();
