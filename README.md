# Rijan Adhikari — Portfolio

A no-build-step portfolio served by a small Node.js HTTP server. Public portfolio content is maintained in `data.js`; there is no admin panel or content-editing login.

## Run locally

Requires Node.js 20 or newer.

```bash
npm start
# open http://localhost:10000
```

## Portfolio content

Edit the `SITE_DATA` object in `data.js`, then commit and push the changes to the `main` branch. Render will deploy the updated site automatically when auto-deploy is enabled.

## Contact form

The public contact form accepts messages through the server. To send email notifications to `business.rijan.np@gmail.com`, configure these environment variables in Render:

- `RESEND_API_KEY`: your Resend API key (keep it private; never commit it)
- `RESEND_FROM_EMAIL`: a sender address verified with Resend, for example `Portfolio <contact@your-verified-domain>`

Without email configuration, accepted messages are stored in the server's data directory. That directory may be reset when a Render instance is replaced or redeployed unless persistent storage is configured.

## Deployment

Render Web Service settings:

- Runtime: Node
- Build command: `npm install`
- Start command: `npm start`
- Branch: `main`

The public portfolio itself is served from the files in this repository. No admin account, admin route, or paid database is required.
