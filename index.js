var Strings = require('strings');
var delims = require('delims');
var _ = require('lodash');


var symbols = new Strings();

/**
 * Generate regex for delimiters
 * @return {RegExp}
 */

symbols.makeDelims = function(delimiters, options) {
  var defaults = {body: '', beginning: '', end: '', flags: 'g'};
  var opts = _.extend(defaults, options);
  return delims(delimiters, opts).evaluate;
};

/**
 * Create symbols
 * @return {String}
 */

// block templates
symbols.parser('jumbotron', {
  pattern: symbols.makeDelims(['/{4}\\n', '\\n/{4}']),
  replacement: function (match, inner) {
    var arr = inner.split('|');
    var text = arr[0];
    var modifier = arr[1];
    return '<div class="jumbotron jumbotron-' + modifier + '">' + text + '</div>';
  }
});

symbols.parser('labels', {
  pattern: symbols.makeDelims(['\\|\\|', '\\|\\|']),
  replacement: function (match, inner) {
    var arr = inner.split('|');
    var text = arr[0];
    var modifier = arr[1] ? ' label-' + arr[1] : '';
    return '<span class="label' + modifier + '">' + text + '</span>';
  }
});

// Progress bars
symbols.parser('progress', {
  pattern: symbols.makeDelims(['\\={4,}', '\\={4,}']),
  replacement: function (match, inner) {
    var arr = inner.split('|');
    var text = arr[0];
    var modifier = arr[1] ? ' progress-' + arr[1] : '';
    return '<span class="progress' + modifier + '" data-progress="' + text + '">' + text + '</span>';
  }
});

symbols.parser('glyphicons', {
  pattern: symbols.makeDelims(['\\:{2}', '\\:{2}']),
  replacement: function (match, inner) {
    var arr = inner.split('|');
    var modifier = arr[1] ? ' glyphicon-' + arr[1] : '';
    return '<span class="glyphicon' + modifier + '"></span>';
  }
});

symbols.parser('badges', {
  pattern: symbols.makeDelims(['\\[\\[', '\\]\\]']),
  replacement: function (match, inner) {
    var arr = inner.split('|');
    var text = arr[0];
    var modifier = arr[1] ? ' badge-' + arr[1] : '';
    return '<span class="badge' + modifier + '">' + text + '</span>';
  }
});

symbols.parser('alerts', {
  pattern: symbols.makeDelims(['!!', '!!']),
  replacement: function (match, inner) {
    var arr = inner.split('|');
    var text = arr[0];
    var modifier = arr[1] ? ' alert-' + arr[1] : '';
    return '<span class="alert' + modifier + '">' + text + '</span>';
  }
});

symbols.parser('spoiler1', {
  pattern: symbols.makeDelims(['\\!@{', '}'], {escape: true}),
  replacement: function (match, inner) {
    var arr = inner.split('|');
    var text = arr[0];
    var modifier = arr[1] ? ' spoiler-' + arr[1] : '';
    // Not that this it makes sense to do this, since an email
    // address could be anywhere, but just for the sake of example
    return '<div class="spoiler' + modifier + '">' + text + '</div>';
  }
});

symbols.parser('spoiler2', {
  pattern: symbols.makeDelims(['@{', '}'], {escape: true}),
  replacement: function (match, inner) {
    var arr = inner.split('|');
    var text = arr[0];
    var modifier = arr[1] ? ' spoiler-' + arr[1] : '';
    return '<div class="spoiler' + modifier + '">' + text + '</div>';
  }
});

symbols.parser('newlines', {
  pattern: /\r\n/g,
  replacement: '\n'
});

// very rough
symbols.parser('email', {
  pattern: /(.+)<([^ >]+)((@|:\/)[^ >]+)>/,
  replacement: function (all, $1, $2, $3) {
    return $1 + ' <a href="mailto:' + $2 + $3 + '">' + $2 + '</a>';
  }
});


var parsers = symbols.parsers([
  'jumbotron',
  'labels',
  'progress',
  'glyphicons',
  'badges',
  'alerts',
  'spoiler1',
  'spoiler2',
  'newlines',
  'email'
]);


// Process replacement patterns
symbols.process = function (str, patterns) {
  patterns = _.union([], parsers, patterns);
  return symbols.template(str, patterns);
};


module.exports = symbols;