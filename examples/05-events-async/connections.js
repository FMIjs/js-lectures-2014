var net = require('net'),
    client = net.connect({host: 'localhost', port: 3000}),
    counter = 0;

client.on('connect', function () {
  console.log('Connected');

  this.write('GET / HTTP/1.1\n\n');
});

client.on('data', function (data) {
  counter++;
  console.log('recieving data');
  console.log(data.toString());
  console.log(counter);

  setTimeout(function () {
    client.write('GET / HTTP/1.1\n\n');
  }, 2000);
});

client.on('end', function () {
  console.log('connection cloed');
});
