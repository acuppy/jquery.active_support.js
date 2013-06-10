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

describe("$.redirect", function() {
  beforeEach(function() {
    spyOn($.redirect, 'runner').andReturn($.noop);
  });

  describe("without options", function() {
    beforeEach(function() {
      $.redirect('http://example.com');
    });

    it("should redirect", function() {
      expect($.redirect.runner).toHaveBeenCalled();
    });
  });

  describe("with options", function() {
    describe("confirm", function() {
      describe("when returning true", function() {
        beforeEach(function() {
          spyOn(window, 'confirm').andReturn(true)
        });

        afterEach(function() {
          expect($.redirect.runner).toHaveBeenCalled();
        });

        it("should confirm from second argument as a hash", function() {
          $.redirect('http://example.com', { confirm: "Are you sure?" })
          expect(window.confirm).toHaveBeenCalledWith("Are you sure?");
        });

        it("should confirm from second argument as a string", function() {
          $.redirect('http://example.com', "Are you sure?")
          expect(window.confirm).toHaveBeenCalledWith("Are you sure?");
        });
      });

      describe("when returning false", function() {
        beforeEach(function() {
          spyOn(window, 'confirm').andReturn(false)
          $.redirect('http://example.com', "Are you sure?")
        });

        it("should confirm", function() {
          expect(window.confirm).toHaveBeenCalledWith("Are you sure?");
        });

        it("should not redirect", function() {
          expect($.redirect.runner).not.toHaveBeenCalled();
        });
      });

    });

    describe("whitelisting", function() {
      beforeEach(function() {
        spyOn(window, 'confirm').andReturn(true)
      });

      describe("only", function() {
        describe("strings", function() {
          it("should redirect with a matching string", function() {
            $.redirect('http://example.com', { only: ['http://example.com'] } );
            expect($.redirect.runner).toHaveBeenCalledWith('http://example.com');
          });

          it("should NOT redirect with a mismatched string", function() {
            $.redirect('http://example.com', { only: ['http://example_invalid.com'] } );
            expect($.redirect.runner).not.toHaveBeenCalledWith('http://example.com');
          });
        });

        describe("regexp", function() {
          it("should redirect with a matching string", function() {
            $.redirect('http://example.com', { only: [/example\.com$/] } );
            expect($.redirect.runner).toHaveBeenCalledWith('http://example.com');
          });

          it("should NOT redirect with a mismatched string", function() {
            $.redirect('http://example.com', { only: [/example\_invalid\.com$/] } );
            expect($.redirect.runner).not.toHaveBeenCalledWith('http://example.com');
          });
        });
      });
    });
  });

});