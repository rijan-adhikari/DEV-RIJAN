# Render backend

The portfolio includes a self-contained Node/Express service:

- `POST /api/contact` validates and stores messages in `server/data/messages.json`.
- `GET /api/health` is the Render health check.
- `GET /admin` shows the inbox behind HTTP Basic Auth.
- No database or email provider is required for local use.

## Run immediately

```bash
npm install
npm start
```

The server prints a generated admin username and password once. Open `/admin` and use those credentials. The contact form stores messages immediately on the same server.

## Deploy safely

1. Revoke the GitHub token that was pasted into chat. It is compromised and must not be used in a repository, shell command, or environment variable.
2. Push this project using a newly authenticated Git client or GitHub's normal sign-in flow. Never commit `.env` or credentials.
3. Create a Render web service from the repository. `render.yaml` documents the service.
4. In the Render dashboard, set your own `ADMIN_PANEL_USER` and `ADMIN_PANEL_PASSWORD` values manually in the service's **Environment** settings. Do not let Render generate them for you.
5. Add a strong `IP_HASH_SALT` value too. Production refuses to start if `ADMIN_PANEL_USER` or `ADMIN_PANEL_PASSWORD` is missing.
6. Visit `/api/health`, then sign in at `/admin` with your custom credentials. Remove any obsolete `ADMIN_USER` or `ADMIN_PASSWORD` variables from the Render service after the new deployment is healthy.

The backend stores message content, sender name/email, user-agent, referrer, and a salted one-way IP hash. It does not store raw IP addresses. Messages are automatically deleted after 31 days. Update the public privacy wording and retention period before inviting real visitors.

Render's free service can sleep and its local filesystem is not durable. The JSON inbox is appropriate for a one-month preview, but use managed Postgres before relying on it for long-term messages.