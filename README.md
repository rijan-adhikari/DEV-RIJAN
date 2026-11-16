# Rijan Adhikari — Portfolio

A static, no-build-step portfolio served by a small Node.js HTTP server. The site content is maintained through the private admin console and stored separately from the public source files.

## Run locally

Requires Node.js 20 or newer.

```bash
npm start
# open http://localhost:10000
```

## Admin console

Open `/admin` on the deployed site.

- First-run login: **admin / admin**
- The first login requires an immediate username/password change.
- Passwords are stored as salted scrypt hashes, not plaintext.
- Use the Account Settings panel to change your admin username and password.
- The Portfolio Content panel edits the complete site data (profile, about, skills, projects, education, certificates, social links and SEO) as formatted JSON.
- The Messages panel shows submissions from the public contact form.

Choose a unique password of at least 10 characters immediately. Do not reuse the temporary password.

## Data persistence on Render

The server stores editable portfolio data, admin credentials and contact messages under `DATA_DIR`. For durable storage on Render, attach a persistent disk mounted at `/var/data` and set:

```text
DATA_DIR=/var/data
```

Without a persistent disk, the server's local data directory may be reset when Render replaces the instance or deploys a new build. That can reset the admin account to the initial admin/admin login and lose saved edits/messages. Keep a backup of your site data.

## Contact form email notifications

Contact messages are always stored in the admin inbox when the server is running. To send email notifications to `business.rijan.np@gmail.com`, configure these Render environment variables:

- `RESEND_API_KEY`: your Resend API key (keep it private; never commit it)
- `RESEND_FROM_EMAIL`: a sender address verified with Resend, for example `Portfolio <contact@your-verified-domain>`

Until these are configured, messages remain available in `/admin`, but email notifications are not sent. The form reports that status to the visitor.

## Security notes

- Admin routes use an HTTP-only, SameSite session cookie and login rate limiting.
- The initial admin/admin credentials are intentionally temporary and must be changed on first login.
- The `.data/` directory and environment files are excluded from Git.
- Keep the admin URL and credentials private. Use HTTPS (Render provides it for onrender.com domains).
