var repl = require('repl'),
    http = require('http'),
    prompt = require('prompt'),
    config = {
      lastUpdates: Date.now(),
      messagesUpdateInterval: 2000,
      nickname: undefined,
    };

function removeParentheses(command) {
  return command
    .replace('\n', '')
    .replace(/(^\()|(\)$)/g, '');
}

function commandEval(cmd, context, filename, callback) {
  var command = removeParentheses(cmd),
      options = {
        host: 'localhost',
        port: 3000,
        method: 'POST',
        path: '/message',
        headers: {
          'Content-Type': 'application/json'
        }
      },
      req = http.request(options, function (res) {
        res.on('data', function (data) {
          var responseObject = JSON.parse(data.toString());
          if (responseObject.recieved) {
            callback(null, 'sent');
          } else {
            callback('sending failed', '');
          }
        });
      });

  req.write(JSON.stringify({
    nickname: config.nickname,
    message: command,
  }));

  req.end();
}

function startClient() {
  repl.start({prompt: '# >', eval: commandEval})
    .on('exit', function () {
      console.log('exiting...');
      clearTimeout(config.currentTimeout);
    });

  config.currentTimeout = setTimeout(function getNewMessages() {
    var options = {
          host: 'localhost',
          port: 3000,
          method: 'GET',
          path: '/messages?after=' + config.lastUpdates,
          headers: {
            'Content-Type': 'application/json'
          }
        },
        req = http.request(options, function (res) {
          var buffer = '';

          res.on('data', function (data) {
            buffer += data.toString();
          });

          res.on('end', function () {
            var messages = JSON.parse(buffer),
                notOwnMessages = messages.filter(function (message) {
                  return message.nickname !== config.nickname;
                }),
                messagesString = notOwnMessages.map(function (message) {
                  return message.nickname + ': ' + message.message;
                }).join('\n');

            if (messages.length > 0) {
              console.log(messagesString);
              config.lastUpdates = messages[messages.length - 1].timestamp;
            }
            config.currentTimeout = setTimeout(getNewMessages, config.messagesUpdateInterval);
          });

          res.on('error', function (error) {
            callback(error, 'it broke :([response]');
          });
        });

    req.on('error', function (error) {
      callback(error, 'it broke :([request]');
    });

    req.end();
  }, config.messagesUpdateInterval);
}

prompt.start();

prompt.get(['nickname'], function (error, result) {
  config.nickname = result.nickname;
  startClient();
});
