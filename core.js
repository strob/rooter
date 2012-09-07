var http = require('http')
  , url = require('url')
  , fs = require('fs');

var app = http.createServer(handle);

function handle (req, res) {
    var req_url = url.parse(req.url, true);

    var module = req_url.path.split('/')[1];

    try {
        return require(module).handle(req, res);
    }
    catch (e) {
        console.log(e);
        res.writeHead(404);
        res.end('Not found');
    }
}

app.listen(9000, "127.0.0.1");
console.log('Server running at http://127.0.0.1:9000/');
