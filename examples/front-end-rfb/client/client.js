'use strict';

var ws = new WebSocket('ws://localhost:44455');

ws.onopen = function () {
  ws.send(JSON.stringify({
    host: '10.0.200.222',
    port: 5901,
    type: 'handshake'
  }));
  console.log('Connection opened');
};

function BlobReader(blob) {
  if (!(this instanceof BlobReader)) {
    return new BlobReader(blob);
  }
  this.blob = blob;
  this.position = 0;
  this.queue = [];
  this._pendingTask = false;
}

BlobReader.prototype._invokeNext = function () {
  var current = this.queue.shift();
  if (!current) {
    return;
  }
  var reader = new FileReader();
  this._pendingTask = true;
  reader.onload = function (e) {
    var data = e.target.result;
    this._pendingTask = false;
    this._invokeNext();
    current.cb(data);
  }.bind(this);
  reader.onerror = function () {
    throw new Error('Error while reading the blob');
  };
  reader.readAsBinaryString();
  this.position += current.count;
};

BlobReader.prototype.read = function (count, cb) {
  this.queue.push({
    count: count,
    cb: cb
  });
  if (!this._pendingTask) {
    this._invokeNext();
  }
};

var reader = BlobReader(blob);
reader
  .read(5, function (val) {
    console.log(val);
  })
  .read(10, function (val) {
    console.log(val);
  })
  .read(2, function (val) {
    console.log(val);
  });

var initialized = false;
ws.onmessage = function (e) {
  if (e.data instanceof Blob && initialized) {
    var reader = new FileReader();
    reader.onload = function (e) {
      console.log(e.target.result);
    };
    reader.readAsText(e.data);
  } else {
    try {
      var data = JSON.parse(e.data);
      if (data.type === 'handshake' &&
          data.status === 'success') {
        initialized = true;
        console.info('Handshake completed');
      }
    } catch (e) {
      console.error('Awful error :(');
    }
  }
};

ws.onclose = function () {
  console.log('Connection closed');
};
