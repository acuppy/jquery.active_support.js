(function($){
 
  /*
    Evaluates if an object or element is blank
    @author http://github.com/jtarchie
    @return Boolean
  */
  $.isBlank = $.isEmpty = function(object) {
    var passed = false;
    $.each($.isBlank._conditions, function(index, condition){
      if( condition(object) ) passed = true;
    })
    return passed;
  };

  /*
    Dynamically adds conditional bindings to the $.isBlank method
  */
  $.isBlank._conditions = $.isEmpty._conditions = [
    function(object){
      return ($.isPlainObject(object) && $.isEmptyObject(object));
    },
    function(object){
      return ($.isArray(object) && object.length == 0);
    },
    function(object){
      return (object instanceof jQuery && object.length == 0);
    },
    function(object){
      return ($.type(object) == "string" && $.trim(object) === "");
    },
    function(object){
      return !object;
    }
  ];

  $.isBlank.addCondition = $.isEmpty.addCondition = function(condition){
    if( $.isFunction(condition) ){
      $.isBlank._conditions.push(condition)
      $.isEmpty._conditions.push(condition)
    }
  }

  /*
    Evaluates if an object or element is not blank
    @return Boolean
  */
  $.isPresent = $.isNotEmpty = function(){
    return !$.isBlank.apply(this, arguments);
  }

  $.isPresent.addCondition = $.isNotEmpty.addCondition = function(condition){
    if( $.isFunction(condition) ){
      $.isBlank._conditions.push(condition)
      $.isEmpty._conditions.push(condition)
    }
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

    if( $.isBlank(included) || $.isPresent( $.grep( included, function(elm, i){
      switch( $.type(elm) ){
        case 'string': return elm == url; break;
        case 'regexp': return url.search(elm) != -1; break;
      }
    })) ){
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

  $.isLink = $.isURL = function(url){
    return true;
  }

  $.isPhone = $.isPhoneNumber = function(number){
    return true;
  }

  $.isAddress = function(address){
    return true;
  }

})(jQuery);