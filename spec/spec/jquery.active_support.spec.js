
describe("$.isBlank", function() {
  it("binds to $", function() {
    expect($.isBlank).toBeDefined();
  });

  describe("#isBlank", function() {
    it("arrays", function() {
      expect($.isBlank([])).toBeTruthy();
      expect($.isBlank(['foo', 'bar'])).toBeFalsy();
    });

    it("strings", function() {
      expect($.isBlank('')).toBeTruthy();
      expect($.isBlank('foo bar')).toBeFalsy();
    });

    it("objects", function() {
      expect($.isBlank({})).toBeTruthy();
      expect($.isBlank({ foo: 'bar' })).toBeFalsy();
    });
  });

  describe("#isPresent", function() {
    it("arrays", function() {
      expect($.isPresent([])).toBeFalsy();
      expect($.isPresent(['foo', 'bar'])).toBeTruthy();
    });

    it("strings", function() {
      expect($.isPresent('')).toBeFalsy();
      expect($.isPresent('foo bar')).toBeTruthy();
    });

    it("objects", function() {
      expect($.isPresent({})).toBeFalsy();
      expect($.isPresent({ foo: 'bar' })).toBeTruthy();
    });
  });
});