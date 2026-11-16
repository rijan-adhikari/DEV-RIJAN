# Deployment Guide

## Application

The portfolio is a no-build-step Node.js application.

Render Web Service settings:

- Runtime: Node
- Build command: `npm install`
- Start command: `npm start`
- Branch: `main`

The public site content lives in `data.js`. To update it, edit the `SITE_DATA` object, commit the change to `main`, and let Render deploy the new commit.

## Contact form email notifications

To send contact form notifications to `business.rijan.np@gmail.com`, configure these environment variables in Render:

- `RESEND_API_KEY`: private API key from Resend.
- `RESEND_FROM_EMAIL`: a sender address verified with Resend.

Do not put API keys in source code or GitHub. If email configuration is absent, accepted messages are stored in the server's `DATA_DIR`. Render's local filesystem may be reset during deploys or instance replacement; persistent storage is optional if message retention is important and may require a paid plan.

## Verification

- `/api/health` should return `{"status":"ok"}`.
- The homepage should load at `/`.
- `/data.js` should return the portfolio data script.
- `/admin` and `/api/admin/*` are intentionally unavailable.
- Submit a test message through the public contact form.
