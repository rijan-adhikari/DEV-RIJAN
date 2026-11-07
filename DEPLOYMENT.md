# Deployment Plan

## Current shape

This is a static portfolio with no build step. The page is served directly from `index.html`; content is maintained in `data.js`, while the `css/` and `js/` folders provide the UI and interactions.

## Recommended launch path

1. Create a GitHub repository and push this folder to its default branch.
2. Enable **Settings -> Pages -> Deploy from a branch**, selecting the repository root.
3. Open the generated Pages URL and confirm the external CDN assets load.
4. Add the final domain to `SITE_DATA.seo.url`, then add a real Open Graph image under `public/images/gallery/`.
5. Connect the contact form to Formspree, Resend, or a serverless endpoint before publishing the contact CTA as production-ready.

GitHub Pages is the simplest zero-cost option. `netlify.toml` and `vercel.json` are also included for drag-and-drop or connected-repository deployments.

## Pre-launch checklist

- Replace placeholder certification and project URLs in `data.js`.
- Add `public/images/profile/profile.jpg` and the social preview image if desired.
- Test at 375px, 768px, 1024px, and desktop widths.
- Verify reduced motion, keyboard focus, the mobile menu, filters, theme toggle, contact validation, and the hidden terminal.
- Confirm the GitHub API fallback message appears when offline or rate-limited.
- Configure the contact form backend and remove the temporary success message in `js/contact.js`.
