var http = require('http');


var options = {
  hostname: 'www.euronews.com',
};

var req = http.request(options, function(res) {
  var buffer = '';
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');


  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk.length);
    buffer += chunk;
  });

  res.on('end', function () {
    console.log('Request over: ' + buffer.length);
  });
});

req.end();
