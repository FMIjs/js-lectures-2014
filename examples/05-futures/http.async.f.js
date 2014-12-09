
var q = require('q');
var http = require('http');

var cdest = {
    hostname: 'www.abv.bg',
    path: '/',
    port: 80
};


var pHTTPRequest = function() {
    var defer = q.defer(),
        args = Array.prototype.slice.call(arguments);

    args.push(function(res) {
      console.log('resolve request to URL');
      return defer.resolve(res);
    });

    console.log('params to request: ', args);

    var req = http.request.apply(http, args);

    req.on('error', function(e) {
        console.log('resolve error ', e);
        defer.reject(e);
    });

    req.end();

    console.log('deffer request to URL');
    return defer.promise;
};

console.log('start server');

var server = http.createServer(function(srvreq, srvres) {
    console.log('connection established');

    pHTTPRequest(cdest)
        .then(function(getres) {
            var data;
        
            console.log('req. to other server started');
        
            getres.on('data', function(chunk) {
                data = data + chunk;
            });

            var dref = q.defer();

            getres.on('end', function(chunk) {
                console.log('req. to other server finished');
                console.log('resolve with data length ', data.length);
                dref.resolve(data);
            });

            return dref.promise;
        })
        .done(function (datares) {
            console.log('write back data', datares.length);
            srvres.writeHead(200, {'Content-Type': 'text/html'});
            srvres.write(datares);
            srvres.end();
        });

    console.log('end of promise chain here?');
});

server.listen(3000);

