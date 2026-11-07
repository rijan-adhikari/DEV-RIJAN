require('dotenv').config();

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const port = Number(process.env.PORT || 10000);
const siteRoot = path.resolve(__dirname, '..');
const dataDir = path.join(__dirname, 'data');
const messagesFile = path.join(dataDir, 'messages.json');
const credentialsFile = path.join(__dirname, '.admin-credentials');
const retentionDays = Number(process.env.CONTACT_RETENTION_DAYS || 31);
const ipSalt = process.env.IP_HASH_SALT || 'local-development-salt-change-before-public-deployment';
const sessions = new Map();

fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(messagesFile)) fs.writeFileSync(messagesFile, '[]\n', { mode: 0o600 });

function readMessages() {
  try { return JSON.parse(fs.readFileSync(messagesFile, 'utf8')); }
  catch { return []; }
}
function writeMessages(messages) {
  const temporaryFile = `${messagesFile}.tmp`;
  fs.writeFileSync(temporaryFile, `${JSON.stringify(messages, null, 2)}\n`, { mode: 0o600 });
  fs.renameSync(temporaryFile, messagesFile);
}
function getAdminCredentials() {
  if (process.env.ADMIN_PANEL_USER && process.env.ADMIN_PANEL_PASSWORD) {
    return { user: process.env.ADMIN_PANEL_USER, password: process.env.ADMIN_PANEL_PASSWORD };
  }
  if (process.env.NODE_ENV === 'production') {
    console.warn('Admin panel disabled: ADMIN_PANEL_USER and ADMIN_PANEL_PASSWORD are not configured.');
    return null;
  }
  if (fs.existsSync(credentialsFile)) return JSON.parse(fs.readFileSync(credentialsFile, 'utf8'));
  const generated = { user: crypto.randomBytes(9).toString('base64url'), password: crypto.randomBytes(18).toString('base64url') };
  fs.writeFileSync(credentialsFile, `${JSON.stringify(generated)}\n`, { mode: 0o600 });
  console.log(`Admin panel: http://127.0.0.1:${port}/admin`);
  console.log(`Admin username: ${generated.user}`);
  console.log(`Admin password: ${generated.password}`);
  return generated;
}
const admin = getAdminCredentials();

app.set('trust proxy', 1);
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: '32kb' }));
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'));

function hashIp(ip) { return crypto.createHash('sha256').update(`${ipSalt}:${ip}`).digest('hex'); }
function escapeHtml(value) { return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character])); }
function cookieValue(req, name) {
  const cookies = String(req.headers.cookie || '').split(';');
  const entry = cookies.find(item => item.trim().startsWith(`${name}=`));
  return entry ? decodeURIComponent(entry.trim().slice(name.length + 1)) : '';
}
function requireSession(req, res, next) {
  const token = cookieValue(req, 'admin_session');
  if (token && sessions.has(token)) return next();
  res.redirect('/admin/login');
}
function loginPage(error = '') { return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Admin login</title><style>body{min-height:100vh;display:grid;place-items:center;margin:0;background:#000000;color:#f6eef1;font:15px system-ui}.card{width:min(390px,calc(100% - 32px));padding:28px;background:#0a0408;border:1px solid #4a1520;border-radius:10px;box-shadow:0 24px 80px #0008}h1{margin:0 0 8px;font-size:28px}p{color:#b99aa6}.error{color:#ff5470;font-size:13px}label{display:grid;gap:7px;margin-top:16px;color:#b99aa6;font-size:12px}input{padding:12px;border:1px solid #4a1520;border-radius:6px;background:#000000;color:#f6eef1;font:inherit}button{width:100%;margin-top:22px;padding:12px;border:0;border-radius:6px;background:#ff1f3d;color:#000000;font-weight:700;cursor:pointer}</style></head><body><main class="card"><div class="mono" style="color:#ff1f3d;font:11px monospace">RIJAN.DEV / PRIVATE PANEL</div><h1>Welcome back.</h1><p>Sign in to view portfolio messages.</p>${error ? `<p class="error">${escapeHtml(error)}</p>` : ''}<form method="post" action="/admin/login"><label>Username<input name="username" autocomplete="username" required></label><label>Password<input name="password" type="password" autocomplete="current-password" required></label><button type="submit">Log in</button></form></main></body></html>`; }
function validateContact(body) {
  const name = String(body.name || '').trim(); const email = String(body.email || '').trim(); const message = String(body.message || '').trim();
  if (name.length < 2 || name.length > 120) return 'Name must be between 2 and 120 characters.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 320) return 'Enter a valid email address.';
  if (message.length < 10 || message.length > 5000) return 'Message must be between 10 and 5,000 characters.';
  return null;
}

app.get('/api/health', (req, res) => res.json({ ok: true, storage: 'server-json', retentionDays }));
app.post('/api/contact', (req, res) => {
  const error = validateContact(req.body);
  if (error) return res.status(400).json({ ok: false, error });
  const messages = readMessages();
  const ipHash = hashIp(req.ip || req.socket.remoteAddress || 'unknown');
  const recent = messages.filter(item => item.ipHash === ipHash && Date.now() - Date.parse(item.createdAt) < 60 * 60 * 1000);
  if (recent.length >= 5) return res.status(429).json({ ok: false, error: 'Too many messages. Please try again later.' });
  const item = { id: crypto.randomUUID(), name: String(req.body.name).trim(), email: String(req.body.email).trim(), message: String(req.body.message).trim(), ipHash, userAgent: req.get('user-agent') || '', referrer: req.get('referer') || '', createdAt: new Date().toISOString(), status: 'new' };
  messages.unshift(item); writeMessages(messages);
  res.status(201).json({ ok: true, id: item.id });
});
if (admin) {
  app.get('/admin/login', (req, res) => res.send(loginPage()));
  app.post('/admin/login', (req, res) => {
    if (req.body.username !== admin.user || req.body.password !== admin.password) return res.status(401).send(loginPage('Incorrect username or password.'));
    const token = crypto.randomBytes(32).toString('hex');
    sessions.set(token, Date.now() + 8 * 60 * 60 * 1000);
    res.set('Set-Cookie', `admin_session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=28800${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`);
    res.redirect('/admin');
  });
  app.post('/admin/logout', requireSession, (req, res) => { sessions.delete(cookieValue(req, 'admin_session')); res.set('Set-Cookie', 'admin_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0'); res.redirect('/admin/login'); });
  app.get('/admin', requireSession, (req, res) => {
    const rows = readMessages().map(row => `<tr><td>${escapeHtml(row.id.slice(0, 8))}</td><td>${escapeHtml(row.createdAt)}</td><td>${escapeHtml(row.name)}</td><td><a href="mailto:${escapeHtml(row.email)}">${escapeHtml(row.email)}</a></td><td>${escapeHtml(row.message)}</td><td class="mono">${escapeHtml(row.ipHash.slice(0, 12))}…</td><td>${escapeHtml(row.status)}</td></tr>`).join('');
    res.send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Portfolio messages</title><style>body{margin:0;padding:32px;background:#000000;color:#f6eef1;font:14px system-ui}h1{font-size:28px}p{color:#b99aa6}.top{display:flex;justify-content:space-between;gap:16px;align-items:center}.logout{padding:9px 12px;border:1px solid #4a1520;border-radius:6px;background:transparent;color:#f6eef1;cursor:pointer}.table-wrap{overflow:auto}table{width:100%;min-width:900px;border-collapse:collapse}th,td{text-align:left;vertical-align:top;padding:12px;border:1px solid #3a1020}th{color:#ff1f3d}td{white-space:pre-wrap}.mono{font-family:monospace;color:#a855f7}</style></head><body><div class="top"><div><h1>Portfolio inbox</h1><p>Messages are stored on this server for ${retentionDays} days. IP values are salted one-way hashes for abuse protection.</p></div><form method="post" action="/admin/logout"><button class="logout" type="submit">Log out</button></form></div><div class="table-wrap"><table><thead><tr><th>ID</th><th>Received</th><th>Name</th><th>Email</th><th>Message</th><th>IP hash</th><th>Status</th></tr></thead><tbody>${rows || '<tr><td colspan="7">No messages yet.</td></tr>'}</tbody></table></div></body></html>`);
  });
} else {
  app.use('/admin', (req, res) => res.status(404).send('Not found'));
}
app.use('/server', (req, res) => res.status(404).send('Not found'));
app.use(express.static(siteRoot, { index: 'index.html' }));
setInterval(() => { const cutoff = Date.now() - retentionDays * 24 * 60 * 60 * 1000; writeMessages(readMessages().filter(item => Date.parse(item.createdAt) >= cutoff)); }, 24 * 60 * 60 * 1000).unref();
app.listen(port, () => console.log(`Portfolio server listening on ${port}`));
