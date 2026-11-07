# Deployment Plan

## Current shape

This is a static portfolio with no build step. The page is served directly from `index.html`; content is maintained in `data.js`, while the `css/` and `js/` folders provide the UI and interactions.

## Recommended launch path

1. Create a GitHub repository and push this folder to its default branch.
2. Enable **Settings -> Pages -> Deploy from a branch**, selecting the repository root, or deploy the static files with Vercel.
3. Open the deployed URL and confirm the external CDN assets load.
4. Add the final domain to the canonical, Open Graph, and sitemap metadata, and use the existing `public/images/gallery/og-cover.jpg` as the social preview image.

GitHub Pages is the simplest zero-cost option. `vercel.json` is retained for static deployments.

## Render Web Service

The repository includes a dependency-free Node server for Render's existing Web Service type. Set the build command to `npm install` and the start command to `npm start`; the server reads Render's `PORT` and serves the static site from the repository root. It does not provide an API, admin panel, or message storage.

## Pre-launch checklist

- Add credential IDs and verification URLs in `data.js` where available.
- The current profile assets are already present at `public/images/profile/Profile.jpg` and `public/images/profile/Profile-Optimized.webp`; the social preview is `public/images/gallery/og-cover.jpg`.
- After choosing a host/domain, set it in `data.js` and add canonical, social preview, and sitemap metadata for that domain.
- Test at 375px, 768px, 1024px, and desktop widths.
- Verify reduced motion, keyboard focus, the mobile menu, filters, theme toggle, direct contact links, and the hidden terminal.
- Confirm the GitHub API fallback message appears when offline or rate-limited.
- The contact section uses direct email and social links. There is no contact form or server-side message storage.
