(() => {
  const button = document.getElementById('voice-explain-toggle');
  const status = document.getElementById('voice-status');
  if (!button) return;

  const supported = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  const explanation = "Welcome to Rijan dot dev. This is Rijan Adhikari's personal portfolio and a record of what is being built and learned. The About section introduces the developer and current interests. Tech Stack presents programming languages, platforms and tools, along with learning stages. Cyber Lab covers security tools and structured learning tracks for authorised practice. Projects brings together featured builds and experiments, including website development and Android custom ROM work. GitHub shows public repositories. Education and Certificates document the learning path and credentials. Mission Control outlines long-term goals. Behind the Screen shares technical field notes and interests outside coding. Contact provides direct ways to get in touch. Select View Full Website to take a guided tour through every section. The tour stays on this page and never opens links.";
  let speaking = false;

  const reset = message => {
    speaking = false;
    button.classList.remove('is-speaking');
    button.setAttribute('aria-pressed', 'false');
    button.setAttribute('aria-label', 'Hear what is included in this website');
    button.title = 'Voice explanation';
    if (status && message) status.textContent = message;
  };

  button.addEventListener('click', () => {
    if (!supported) {
      if (status) status.textContent = 'Voice explanation is not supported by this browser.';
      return;
    }
    if (speaking || window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      reset('Voice explanation stopped.');
      return;
    }
    const utterance = new SpeechSynthesisUtterance(explanation);
    utterance.lang = 'en-GB';
    utterance.rate = 0.96;
    utterance.pitch = 1;
    utterance.onend = () => reset('Voice explanation complete.');
    utterance.onerror = () => reset('Voice explanation could not be played.');
    speaking = true;
    button.classList.add('is-speaking');
    button.setAttribute('aria-pressed', 'true');
    button.setAttribute('aria-label', 'Stop voice explanation');
    button.title = 'Stop voice explanation';
    if (status) status.textContent = 'Playing the portfolio overview.';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  });

  window.addEventListener('pagehide', () => {
    if (supported) window.speechSynthesis.cancel();
  });
})();