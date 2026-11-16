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

The public contact form sends submissions directly to `business.rijan.np@gmail.com` through Resend. Configure both environment variables in the Render web service before testing:

- `RESEND_API_KEY`: private API key from Resend.
- `RESEND_FROM_EMAIL`: a sender address verified with Resend.

The API does not store submissions on the server. If either variable is missing or Resend rejects delivery, the form displays an error instead of claiming the message was sent. Do not put API keys in source code or GitHub.

## Verification

- `/api/health` should return `{"status":"ok"}`.
- The homepage should load at `/`.
- `/data.js` should return the portfolio data script.
- `/admin` and `/api/admin/*` are intentionally unavailable.
- Submit a test message through the public contact form.
