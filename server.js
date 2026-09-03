const http = require("http");
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".jpg": "image/jpeg",
  ".mp4": "video/mp4",
  ".mov": "video/quicktime",
};

http.createServer((request, response) => {
  const pathname = decodeURIComponent(request.url.split("?")[0]);
  const requested = pathname === "/" ? "/index.html" : pathname;
  const file = path.resolve(root, `.${requested}`);

  if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }

  const stats = fs.statSync(file);
  const type = types[path.extname(file).toLowerCase()] || "application/octet-stream";
  const range = request.headers.range;

  if (range && type === "video/mp4") {
    const match = range.match(/bytes=(\d+)-(\d*)/);
    const start = Number(match[1]);
    const end = match[2] ? Number(match[2]) : stats.size - 1;
    response.writeHead(206, {
      "Content-Type": type,
      "Content-Range": `bytes ${start}-${end}/${stats.size}`,
      "Accept-Ranges": "bytes",
      "Content-Length": end - start + 1,
    });
    fs.createReadStream(file, { start, end }).pipe(response);
    return;
  }

  response.writeHead(200, {
    "Content-Type": type,
    "Content-Length": stats.size,
    "Accept-Ranges": "bytes",
  });
  fs.createReadStream(file).pipe(response);
}).listen(4173, "127.0.0.1", () => {
  console.log("Piola server running at http://127.0.0.1:4173");
});
