// complete example at http://jsfiddle.net/fwgst1jc/

(function() { 
    var tTable = document.getElementById('mytbl');
    
    var highlight = function(e) {
        if(e.target.tagName === 'TD') {
            if (! e.target.parentNode.classList.contains('hover') ) {
                e.target.parentNode.classList.add('hover');
            }
            console.log(e.target.parentNode);
        }
    };

    var lowlight = function(e) {
        if(e.target.tagName === 'TD') {       
         e.target.parentNode.classList.remove('hover');
            console.log(e.target.parentNode);
        }        
    };
    
    tTable.addEventListener('mouseover', highlight);
    tTable.addEventListener('mouseout', lowlight);
})();

