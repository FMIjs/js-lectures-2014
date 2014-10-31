var fs = require('fs');

fs.readFile('/etc/passwd', {encoding: 'utf-8'}, function (err, data) {
  console.log('read file');
});

setTimeout(function () {
  console.log('timeout');
}, 0);

process.nextTick(function () {
  console.log('nextTick');
});

var i = 0;
while(i < 1000000000) {
  i++;
}

console.log('finished global');
