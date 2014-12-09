var fs = require('fs');

function entry() {
  fs.readFile('/etc/passwd', function (err, data) {
    console.trace('fs handler');
    //console.log(data.toString());
  });
  console.trace('entry');
}

entry();

console.trace('global');
