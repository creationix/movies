
var Http = require('http'),
    Stack = require('stack'),
    Creationix = require('creationix');
var fs = require('fs');
var Kernel = require('kernel');

var handler = Stack(
  Creationix.log(),
  Creationix.static('/', __dirname),
  function (req, res, next) {
    if (req.url !== "/") return next();
    Kernel("index.html", function (err, template) {
      if (err) return next(ett);
      template({movies:movies}, function (err, html) {
        if (err) return next(err);
        res.setHeader("Content-Type", "text/html");
        res.setHeader("Content-Length", Buffer.byteLength(html));
        res.end(html);
      });
    });
  }
);
var isRoot = !process.getuid();
var PORT = isRoot ? 80 : 8080;
Http.createServer(handler).listen(PORT, function () {
  console.log("Serving %s at http://localhost:%s/", __dirname, PORT);
});
if (isRoot) {
  var stat = require('fs').statSync(__filename);
  process.setgid(stat.gid);
  process.setuid(stat.uid);
}

function movies(_, block, callback) {
  console.log(arguments);
  fs.readdir(__dirname + "/videos", function (err, files) {
    if (err) return callback(err);
    var index = files.length;
    var parts = new Array(index--);
    files.forEach(function (part, i) {
      block({
        href: "/videos/" + part,
        src30: "/thumbs/" + part + "-30.png",
        src90: "/thumbs/" + part + "-90.png",
        src180: "/thumbs/" + part + "-180.png",
        name: part.substr(0, part.lastIndexOf("."))
      }, function (err, result) {
        if (err) return error(err);
        parts[i] = result;
        check();
      });
    });
    var done;
    check();
    function error(err) {
      if (done) return;
      done = true;
      callback(err);
    }
    function check() {
      if (done) return;
      while (parts.hasOwnProperty(index)) { index--; }
      if (index < 0) {
        done = true;
        callback(null, parts.join(""));
      }
    }
  });
}
