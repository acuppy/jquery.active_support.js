describe("$.isBlank", function() {
  describe("arrays", function() {
    it("should be blank", function(){
      expect($.isBlank([])).toBeTruthy();
    });

    it("should be blank", function(){
      expect($.isBlank(['foo', 'bar'])).toBeFalsy();
    });
  });

  describe("strings", function() {
    it("should be blank", function(){
      expect($.isBlank('')).toBeTruthy();
    });

    it("should be blank", function(){
      expect($.isBlank('foo bar')).toBeFalsy();
    });
  });

  describe("objects", function() {
    it("should be blank", function(){
      expect($.isBlank({})).toBeTruthy();
    });

    it("should be blank", function(){
      expect($.isBlank({ foo: 'bar' })).toBeFalsy();
    });

    it("should be blank", function() {
      expect( $.isBlank( $('div.foo_bar') ) ).toBeTruthy();
    });
  });
});

describe("$.isPresent", function() {
  describe("arrays", function() {
    it("should be present", function(){
      expect($.isPresent([])).toBeFalsy();
    });

    it("should be present", function(){
      expect($.isPresent(['foo', 'bar'])).toBeTruthy();
    });
  });

  describe("strings", function() {
    it("should be present", function(){
      expect($.isPresent('')).toBeFalsy();
    });

    it("should be present", function(){
      expect($.isPresent('foo bar')).toBeTruthy();
    });
  });

  describe("objects", function() {
    it("should be present", function(){
      expect($.isPresent({})).toBeFalsy();
    });

    it("should be present", function(){
      expect($.isPresent({ foo: 'bar' })).toBeTruthy();
    });

    it("should be present", function() {
      expect( $.isPresent( $('div.foo_bar') ) ).toBeFalsy();
    });
  });
});