var http = require('http');
var url = require("url");

http.createServer(function (req, res) {
  var pathname = url.parse(req.url).pathname;
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(pathname);
}).listen(process.env.C9_PORT, "0.0.0.0");
console.log('Server running at http://donjaber_github_com.donjaber.cloud9ide.com');