var fs = require('fs'),
    events = require('events'),
    emitter = new events.EventEmitter();

emitter.on('new_user', function (username, shell) {
  console.log('Got a new user: ', username, shell);
});

fs.readFile('/etc/passwd', {encoding: 'utf-8'}, function(err, data) {
  var lines = data.split('\n');
  lines.forEach(function (line) {
    var parts = line.split(':');
    emitter.emit('new_user', parts[0], parts[parts.length - 1]);
  });
});  
