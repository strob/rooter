var http = require('http')
  , app = http.createServer(handle)
  , url = require('url')
  , fs = require('fs')
  , io = require('socket.io').listen(app)
  , rooter = require('rooter').rooter
  , submodules = {}
  , ctx = {rooter: rooter, io: io}; // Passed to all handle() calls

/* Returns a rooter-aware submodule. The first time a submodule is
 * loaded, an init() is called (if it exists).
 */
function get_submodule(name) {
    if(!(name in submodules)) {
        try {
            var submodule = require(name);
            if(!submodule.handle) {
                console.log("Warning: ", name, " does not implement `handle,' ignoring.");
                return false;
            }
            submodules[name] = submodule;
            if(submodules[name].init){
                submodules[name].init(ctx);
            }
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }

    return submodules[name];
}

function handle (req, res) {
    var req_url = url.parse(req.url, true);

    var module = get_submodule(req_url.path.split('/')[1]);

    if(module) {
        return module.handle(req, res, ctx);
    }
    else {
        res.writeHead(404);
        res.end('Not found');
    }
}

app.listen(9000, "127.0.0.1");
console.log('Server running at http://127.0.0.1:9000/');
