var http = require ('http'),
    https = require('https'),
    printf = require('printf');

function getEmojis(handleEmojiResponse) {
  var options = {
    host: 'api.github.com',
    path: '/emojis',
    method: 'GET',
    headers: {
      'User-Agent': 'OMGEMOJIS!',
    }
  };

  console.log('Requesting emojis');

  var req = https.request(options, function (res) {
    var buffer = '';
    res.on('data', function (data) {
      buffer += data.toString();
    });

    res.on('end', function () {
      handleEmojiResponse(JSON.parse(buffer));
    });
  });

  req.on('error', function (error) {
    console.error('Error requesting emojis:', error);
  });

  req.end();
}

var server = http.createServer(function (req, res) {
  if (req.url.match(/\/emojis$/)) {
    res.writeHead(404);
    res.write('Try /emojis');
    res.end();
  }
  getEmojis(function (emojisObject) {
    var emojiNames = Object.keys(emojisObject),
        chosen = parseInt(Math.random() * emojiNames.length),
        url = emojisObject[emojiNames[chosen]],
        tag = printf(
          '<img src="%s" alt="%s"/>',
          url,
          emojiNames[chosen]
        );

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(tag);
    res.end();
  });
});

server.listen(3000);
