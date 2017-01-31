describe('support for ES6 features', function() {
  describe('iterables', function() {
    it('supports the iterable interface', function() {
      var sequence = Lazy([1.1, 1.9, 2.5]).map(Math.round);

      var result = [];
      for (var x of sequence) {
        result.push(x);
      }

      expect(result).toEqual([1, 2, 3]);
    });

    it('preserves laziness', function() {
      var sideEffects = [];

      var sequence = Lazy([1, 2, 3]).map(function(x) {
        sideEffects.push('foo');
        return x;
      });

      var result = [];
      for (var e of sequence.take(2)) {
        result.push(e);
      }

      expect(result).toEqual([1, 2]);
      expect(sideEffects).toEqual(['foo', 'foo']);
    });
  });

  describe('generators', function() {
    var sequence = Lazy(function*() {
      yield 1;
      yield 2;
      yield 3;
    });

    it('can wrap generators as sequences', function() {
      expect(sequence).toBeInstanceOf(Lazy.Sequence);
    });

    it('can iterate over the generated output', function() {
      expect(sequence).toComprise([1, 2, 3]);
    });

    it('can map, etc. over the result, same as any other sequence', function() {
      sequence = sequence.map(increment);
      expect(sequence).toComprise([2, 3, 4]);
    });
  });

  describe('sets', function() {
    it('can wrap sets', function() {
      var sequence = Lazy(new Set([1, 2, 2, 3, 3, 3]));
      expect(sequence).toComprise([1, 2, 3]);
    });
  });
});
