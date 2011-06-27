var http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    console.log("Request received.");
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    
    var postData = "";
    
    request.setEncoding("utf8");

    request.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
      console.log("Received POST data chunk '" + postDataChunk + "'.");
    });

    request.addListener("end", function() {
      route(handle, pathname, response, postData);
    });
  }

  http.createServer(onRequest).listen(process.env.C9_PORT, "0.0.0.0");
  console.log("Server has started.");
}

exports.start = start;