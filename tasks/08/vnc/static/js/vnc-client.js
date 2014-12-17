/* global document, io, console */

(function () {
  'use strict';

  var socket = io();

  function $(id) {
    return document.getElementById(id);
  }

  $('connect-btn').addEventListener('click', function () {
    console.log('Connecting to the VNC server');
    socket.emit('vnc-connect', {
      host: $('host-input').value,
      password: $('password-input').value,
      port: $('port-input').value
    });
  }, false);


  var canvas = $('canvas');

  socket.on('rect', function (data) {
    canvas.src = 'data:image/png;base64,' + data.image;
  });

  function handleMouseEvent(e) {
    var x = e.pageX,
        y = e.pageY,
        rect = canvas.getBoundingClientRect();
    socket.emit('mouse', {
      x: x - parseInt(rect.left, 10),
      y: y - parseInt(rect.top, 10),
      button: ((isMouseDown) ? parseInt('001', 2) : 0)
    });
  }

  canvas.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });

  canvas.addEventListener('mousemove', function (e) {
    handleMouseEvent(e);
  });

  document.addEventListener('keydown', function (e) {
    socket.emit('keyboard', {
      keycode: e.keyCode,
      isDown: true
    });
  });

  document.addEventListener('keyup', function (e) {
    socket.emit('keyboard', {
      keycode: e.keyCode,
      isDown: false
    });
  });

  var isMouseDown = false;
  canvas.addEventListener('mousedown', function (e) {
    isMouseDown = true;
    handleMouseEvent(e);
  });

  canvas.addEventListener('mouseup', function (e) {
    isMouseDown = false;
    handleMouseEvent(e);
  });

}());

