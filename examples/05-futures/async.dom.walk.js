(function() {
  var aval = 'val';
  var res = [];
  
  Q.longStackSupport = true;

    console.log('start dfs');
  
  function dfs(elem, level) {
    console.log('ENTER: ' + elem.tagName + ' level: ' + level + ' elem has ' + elem.childNodes.length + ' children');
    
    if (elem.getAttribute('att') === 'val') {
      res.push(elem);
    }
    
    var rpromises = [];
    
    [].slice.call(elem.childNodes).forEach(
     function(e) {
       if ( e.tagName !== undefined && e.tagName !== 'SCRIPT' ) {
         rpromises.push(Q.fcall(dfs, e, level + 1));
       }
     }
     );

    if ( rpromises.length ) {
      var pp = Q.allSettled(rpromises).then(function(v) {
        console.log('RESOLVE: all at level '  + level);
      });

      console.log('RETURN: deffered ALL child calls for ' + elem.tagName);

      return pp;
    }
  }
  
  Q.fcall(dfs, document.body, 1)
  .then(function() {
    console.log('FOUND ' + res.length + ' matching elements');
  })
  .fail(function(e) {
      console.log('something went wrong..?! ' + e);
  })
  .done();
  
})();
