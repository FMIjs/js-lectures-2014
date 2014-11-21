var EventEmitter = require('events').EventEmitter,
    http = require('http');

var emitter = Object.create(EventEmitter.prototype);

http.createServer(function (req, res) {
  var buffer = '';
  req.on('data', function (chunk) {
    buffer += chunk.toString();
  });
  req.on('end', function () {
    emitter.emit('request', buffer);

    …

  res.setHeader
    res.write(result);
    res.end();
    res.on('error'
    …
  });
}).listen(3000);


module.exports = emitter;
