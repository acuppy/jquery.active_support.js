(function($){
  
  /*
    Evaluates if an object or element is blank
    @author http://github.com/jtarchie
    @return Boolean
  */
  $.isBlank = $.isEmpty = function(object) {
    return (
      ($.isPlainObject(object) && $.isEmptyObject(object)) ||
      ($.isArray(object) && object.length == 0) ||
      (object instanceof jQuery && object.length == 0) ||
      ($.type(object) == "string" && $.trim(object) === "") ||
      (!object)
    );
  };

  /*
    Evaluates if an object or element is not blank
    @return Boolean
  */
  $.isPresent = function(){
    return !$.isBlank.apply(this, arguments);
  }

  $.redirect = function(url, opt){
    var opt = opt || {};

    if( ! $.isURL(url) ) $.error('A valid URL expected -- received' + url.toString());

    if( $.type(opt) == 'string' ) opt = { confirm: opt };

    opt = $.extend({
      confirm: false,
      only: [],
      exclude: [] 
    }, opt, arguments[2] || {});

    var included = $.map( opt.only, function(elm, i){
      if( $.inArray( elm, opt.exclude ) == -1 ){
        return elm;
      }
    });

    if( $.isBlank(included) || $.grep( included, function(elm, i){
      switch( $.type(elm) ){
        case 'string': return elm == url; break;
        case 'regexp': return url.search(elm) != -1; break;
      }
    }).length > 0 ){
      if( $.type(opt.confirm) == 'string' ){
        if( window.confirm(opt.confirm) ) $.redirect.runner(url); 
        return;
      }
      $.redirect.runner(url); return;
    };
  }

  $.redirect.runner = (function(){
    return window.location.replace;
  })();

  }

  $.isAddress = function(){

  }

})(jQuery);