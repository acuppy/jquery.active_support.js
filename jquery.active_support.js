(function($){
  
  /*
    Evaluates if an object or element is blank
    @author http://github.com/jtarchie
    @return Boolean
  */
  $.isBlank = function(object) {
    return (
      ($.isPlainObject(object) && $.isEmptyObject(object)) ||
      ($.isArray(object) && object.length == 0) ||
      (typeof(object) == "string" && $.trim(object) === "") ||
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

  $.isLink = $.isURL = function(){

  }

  $.isPhone = $.isPhoneNumber = function(){

  }

  $.isAddress = function(){

  }

})(jQuery);