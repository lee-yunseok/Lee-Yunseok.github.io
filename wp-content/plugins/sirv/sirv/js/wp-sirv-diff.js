jQuery( document ).ajaxComplete(function() {
    if (arguments[1].responseText && arguments[1].responseText.match(/class *= *"[^"]*Sirv/gm)) {
        setTimeout(function(){Sirv.start();},100);
    }
});
