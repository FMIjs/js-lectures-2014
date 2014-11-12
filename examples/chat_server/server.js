var express = require ('express'),
    bodyParser = require('body-parser'),
    app = express(),
    messages = [];

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.write('Hello, world!');
  res.end();
});

//validation of messages
app.use('/message', function (req, res, next) {
  if (req.method !== 'POST') {
    next();
    return;
  }

  if (!req.body.nickname) {
    res.status(401).send('No nickname given');
  } else {
    next();
  }
});

app.post('/message', function (req, res) {
  var message = req.body;

  message.timestamp = Date.now();
  messages.push(req.body);

  res.json({recieved: true});
  res.end();
});

app.get('/message', function (req, res) {
  res.send('Don\'t know what to respond');
});

app.get('/messages', function (req, res) {
  var after = req.query.after || 0;

  res.json(messages.filter(function (message) {
    return message.timestamp > after;
  }));
});

app.listen(3000);
