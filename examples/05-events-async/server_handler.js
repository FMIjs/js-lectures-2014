var server = require('./server');

server.on('request', function (data) {
  console.log('Got request');
});
