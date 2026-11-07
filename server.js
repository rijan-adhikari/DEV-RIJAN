const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const siteRoot = __dirname;
const port = Number(process.env.PORT) || 10000;
const publicDirectories = new Set(['css', 'js', 'public']);
const publicRootFiles = new Set(['cv.html', 'data.js', 'index.html', 'robots.txt']);
const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8'
};

function sendText(response, status, message) {
  response.writeHead(status, {
    'Content-Type': 'text/plain; charset=utf-8',
    'X-Content-Type-Options': 'nosniff'
  });
  response.end(message);
}

const server = http.createServer(async (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.setHeader('Allow', 'GET, HEAD');
    return sendText(response, 405, 'Method not allowed');
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  } catch {
    return sendText(response, 400, 'Bad request');
  }

  const segments = pathname.split('/').filter(Boolean);
  if (segments.some(segment => segment.startsWith('.')) || (segments.length && !publicDirectories.has(segments[0]) && !publicRootFiles.has(segments[0]))) {
    return sendText(response, 404, 'Not found');
  }

  const filePath = path.resolve(siteRoot, `.${pathname}`);
  if (filePath !== siteRoot && !filePath.startsWith(`${siteRoot}${path.sep}`)) {
    return sendText(response, 403, 'Forbidden');
  }

  try {
    let stats = await fs.promises.stat(filePath);
    let resolvedPath = filePath;
    if (stats.isDirectory()) {
      resolvedPath = path.join(filePath, 'index.html');
      stats = await fs.promises.stat(resolvedPath);
    }
    if (!stats.isFile()) return sendText(response, 404, 'Not found');

    response.writeHead(200, {
      'Content-Length': stats.size,
      'Content-Type': mimeTypes[path.extname(resolvedPath).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-cache',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'X-Content-Type-Options': 'nosniff'
    });
    if (request.method === 'HEAD') return response.end();

    const stream = fs.createReadStream(resolvedPath);
    stream.on('error', () => response.destroy());
    stream.pipe(response);
  } catch (error) {
    if (error.code === 'ENOENT' || error.code === 'ENOTDIR') return sendText(response, 404, 'Not found');
    console.error('Static file request failed:', error);
    return sendText(response, 500, 'Internal server error');
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Static portfolio listening on port ${port}`);
});