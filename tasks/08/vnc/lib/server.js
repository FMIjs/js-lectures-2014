/* global require, exports, console, __dirname, Buffer, setInterval */
'use strict';

var express = require('express'),
    http = require('http'),
    rfb = require('rfb'),
    PNG = require('../node_modules/node-png/build/Release/png').Png,
    io = require('socket.io'),
    initialized = false,
    rfbHandler,
    socket;

function handleRect(rect) {
  var buffer = new Buffer(rect.width * rect.height * 3, 'binary'),
      current = 0;
  for (var i = 0; i < rect.fb.length; i += 4) {
    buffer[current++] = rect.fb[i + 2];
    buffer[current++] = rect.fb[i + 1];
    buffer[current++] = rect.fb[i];
  }
  var png = new PNG(buffer, rect.width, rect.height, 'rgb');
  png = png.encodeSync().toString('base64');
  socket.emit('rect', {
    image: png,
    width: rect.width,
    height: rect.height,
    x: rect.x,
    y: rect.y
  });
}

function connect(config) {
  config.securityType = 'vnc';
  var r = rfb(config);
  rfbHandler = r;
  r.on('connection', function () {
    console.log('Successful connection to the VNC server');
  });
  r.on('raw', function (rect) {
    handleRect(rect);
    if (!initialized) {
      initialized = true;
      setInterval(function () {
        console.log('Requesting redraw');
        r.requestRedraw();
      }, 500);
    }
  });
  r.on('*', function () {
    console.error(arguments);
  });
  return r;
}

exports.run = function (config) {
  var app = express(),
      server = http.createServer(app),
      ioServer;


  app.use(express.static(__dirname + '/../static'));
  ioServer = io.listen(server);

  ioServer.on('connection', function (s) {
    socket = s;
    console.log('New connection by client');
    socket.on('vnc-connect', function (data) {
      console.log('New VNC connection');
      connect(data);
    });
    socket.on('mouse', function (data) {
      rfbHandler.sendPointer(data.x, data.y, data.button);
    });
    socket.on('keyboard', function (data) {
      rfbHandler.sendKey(data.keycode, data.isDown);
    });
  });

  console.log('Listening on', config.PORT);
  server.listen(config.PORT);
};
