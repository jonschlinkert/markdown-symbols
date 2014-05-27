
// Examples of custom replacement patterns
var replacements = {
  {
    // Spoilers
    name: 'spoiler',
    pattern: symbols.makeDelims(['\\!{{', '}}'], {escape: true}),
    replacement: function (match, inner) {
      var arr = inner.split('|');
      var text = arr[0];
      var modifier = arr[1] ? ' spoiler-' + arr[1] : '';
      // Not that this it makes sense to do this, since an email
      // address could be anywhere, but just for the sake of example
      return '<div class="spoiler' + modifier + '">' + text + '</div>';
    }
  },
  {
    // Spoilers
    name: 'spoiler',
    pattern: symbols.makeDelims(['{{', '}}'], {escape: true}),
    replacement: function (match, inner) {
      var arr = inner.split('|');
      var text = arr[0];
      var modifier = arr[1] ? ' spoiler-' + arr[1] : '';
      return '<div class="spoiler' + modifier + '">' + text + '</div>';
    }
  },
  {
    // Headings
    pattern: /^(#{1,6})\s*(.*?)\s*#*\s*(?:\n|$)/gm,
    replacement: function (all, $1, $2, $3) {
      var lvl = symbols.headingLvl($1, '#');
      return '<h'+lvl+'>' + $2 + '</h'+lvl+'>\n\n';
    }
  },
  {
    // Blockquotes
    pattern: /^>\s*(.+)\n?/gm,
    replacement: function (all, $1, $2, $3) {
      return '<blockquote>' + $1 + '</blockquote>';
    }
  }
};

// and the tests
describe('blockquotes:', function () {
  it('should generate HTML for a blockquote', function () {
    var actual = symbols.process('> blockquote');
    expect(actual).to.eql('<blockquote>blockquote</blockquote>');
  });
});

