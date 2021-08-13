'use strict';

var url = require('url'),
    fs = require('fs'),
    http = require('http'),
    path = require('path');

var server = http.createServer(function (req, res) {
  var pathname = __dirname + url.parse(req.url).pathname;

  if (path.extname(pathname) == '') {
    pathname += '/';
  }

  if (pathname.charAt(pathname.length - 1) == '/') {
    pathname += 'index.html';
  }

  fs.exists(pathname, function (exists) {
    if (exists) {
      switch (path.extname(pathname)) {
        case '.html':
          res.writeHead(200, { 'Content-Type': 'text/html' });
          break;
        case '.js':
          res.writeHead(200, { 'Content-Type': 'text/javascript' });
          break;
        case '.css':
          res.writeHead(200, { 'Content-Type': 'text/css' });
          break;
        case '.gif':
          res.writeHead(200, { 'Content-Type': 'text/gif' });
          break;
        case '.jpg':
          res.writeHead(200, { 'Content-Type': 'text/jpeg' });
          break;
        case '.png':
          res.writeHead(200, { 'Content-Type': 'text/png' });
          break;
        default:
          res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
      }

      fs.readFile(pathname, function (err, data) {
        res.end(data);
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>4040 Not Found</h1>');
    }
  });
});

server.listen(8085);

console.log('server is running at http://localhost:8085 ...');
