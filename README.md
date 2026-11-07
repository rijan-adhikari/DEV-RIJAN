# Rijan Adhikari — Portfolio

A static, no-build-step portfolio site. Plain HTML/CSS/JS, GSAP for scroll
animation, Three.js for the hero 3D visual. No framework, bundler, or
external npm dependencies. The optional Node server only serves static files.

## Run it locally

Because the JS uses relative `<script>`/`<link>` tags (not ES modules),
you can usually just double-click `index.html` to open it directly in a
browser. If your browser blocks anything when opened via `file://`, run
a tiny local server instead from this folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

For the same Node static server used by Render, run `npm start` instead.

## Editing your content

Everything personal — name, bio, skills, projects, certifications,
socials, timeline — lives in **`data.js`**. Edit that one file and
the whole site updates; you should not need to touch HTML/CSS for
routine content changes.

## Adding your photo

Drop your photo into `public/images/profile/` as `profile.jpg`. See
that folder's README for details. Project screenshots and certificate
images go in their own subfolders under `public/images/` the same way.

## Structure

```
index.html          entry point, all sections
css/
  variables.css      design tokens: AMOLED black + red/violet accents
  base.css           resets, type utilities, accessibility primitives
  layout.css         nav, HUD rail, section scaffolding
  components.css     buttons, panels, terminal, cursor, badges
  sections.css       hero/about/skills/projects/etc. specific styles
  animations.css     keyframes, reveal base states
  responsive.css     breakpoint fine-tuning
  hacker-theme.css   hacker layer: glow, scanlines, code-rain styles, extra animations (loaded last)
data.js              <- edit this for content changes
js/
  theme.js           red / violet accent toggle (+ ThemeColors helper)
  boot.js            loading screen + hero terminal typing
  hud.js             scroll progress rail, active-section nav state
  cursor.js          custom cursor + magnetic buttons
  three-scene.js      hero 3D cyber core (Three.js)
  constellation.js    skills canvas visualization
  projects.js          project grid + filtering
  github.js             live GitHub repo fetch w/ fallback
  contact.js             front-end form validation
  reveal.js               GSAP ScrollTrigger reveals
  tilt.js                  3D card tilt on hover
  easter-eggs.js            Konami code, hidden terminal, console msg
  code-rain.js              falling red/violet code background
  main.js                    renders data-driven sections from data.js
public/images/               profile / projects / certificates / gallery
```

## Known gaps to fill in

- **Contact form** validates on the front end and opens the visitor's
  default email app; it does not send or store messages automatically.
- **Facebook / Instagram URLs** are blank placeholders in `data.js`
  (`social.facebook`, `social.instagram`) — add them when ready; the
  contact section only shows links that are filled in.
- **Certification credential IDs and verification URLs** are blank in
  `data.js` — add them if you have the Cisco credential records.
- **Deployment domain metadata** is not configured yet; update the URL and
  social preview metadata after choosing the final host/domain. The preview
  image is already at `public/images/gallery/og-cover.jpg`.
- **Project links** (GitHub repos, live URLs) are blank per project in
  `data.js` — add as you publish them. One project description also needs
  its final details.

## Easter eggs

- Press `` ` `` (backtick) to open a hidden terminal. Try `help`.
- Konami code (`↑ ↑ ↓ ↓ ← → ← → b a`) unlocks a small surprise.
- Check the browser dev console.

## Accessibility & performance notes

- Respects `prefers-reduced-motion` — heavy animation, particle motion,
  and the custom cursor are disabled/simplified automatically.
- Custom cursor and card tilt are disabled on touch/coarse-pointer
  devices.
- Particle count and pixel ratio scale down on small viewports.
- Skip link, visible focus states, semantic headings, and ARIA labels
  are in place — re-check with a screen reader before shipping.


## Theme (AMOLED red / violet hacker)

- Pure `#000000` background. Colours live in `css/variables.css` (`--accent` red, `--accent-2` violet).
- The round button in the nav switches the lead colour red <-> violet (saved in localStorage).
  The 3D hero and the skills canvas follow it automatically through `window.ThemeColors` in `js/theme.js`.
- To change the colours, edit only `css/variables.css` (both the `:root` and `[data-theme="violet"]` blocks).
- Remove the code-rain background by deleting the `js/code-rain.js` script tag at the bottom of `index.html`.
