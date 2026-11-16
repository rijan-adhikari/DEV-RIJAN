# Deployment Guide

## Current application

The portfolio is served by a Node.js 20+ HTTP server. It serves the static frontend and provides a small authenticated API for the admin console and contact form.

Render Web Service settings:

- Runtime: Node
- Build command: `npm install`
- Start command: `npm start`
- Branch: `main`

## Required persistent storage

The admin credentials, editable portfolio data and contact messages must survive deployments. In the Render service:

1. Attach a persistent disk to the existing web service.
2. Set the disk mount path to `/var/data`.
3. Add the environment variable `DATA_DIR=/var/data`.
4. Save changes and redeploy.

The server creates its data files automatically on first startup. If the persistent disk is not attached, local storage is ephemeral and content/account changes can be lost during a redeploy or instance replacement. Persistent disks may require a paid Render service plan; check the current plan and pricing in the Render Dashboard before attaching one.

## Initial admin setup

1. Open `https://adhikari-rijan.onrender.com/admin`.
2. Sign in with the one-time initial credentials: username `admin`, password `admin`.
3. The console forces an immediate credential change.
4. Choose a unique username and a password with at least 10 characters.
5. Use Portfolio Content to edit the site's JSON data and Save to publish the changes.

The password is stored as a salted scrypt hash in the private data directory. Do not add credentials or the data directory to Git.

## Contact email notifications

The public contact form stores every accepted message in the admin inbox. For email notifications to `business.rijan.np@gmail.com`, set the following environment variables in Render:

- `RESEND_API_KEY`: private API key from Resend.
- `RESEND_FROM_EMAIL`: a sender address verified with Resend.

Do not put API keys in source code, GitHub, or the admin content JSON. If email configuration is absent or fails, the message remains in the admin inbox and the form reports that email notification is not configured.

## Verification after deployment

- `/api/health` should return `{"status":"ok"}`.
- `/admin` should display the sign-in page.
- After the initial credential change, log out and back in with the new credentials.
- Save a harmless test edit in Portfolio Content and confirm it appears on the public site.
- Submit a test contact message and confirm it appears in the Messages inbox.
- Configure Resend and submit another test message to verify email notification.
