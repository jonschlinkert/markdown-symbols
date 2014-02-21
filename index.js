var frep = require('frep');
var file = require('fs-utils');
var delims = require('delims');
var _ = require('lodash');


var symbols = module.exports = {}

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
 * Crude utility for calculating heading levels
 * @param   {String}  str   The string to search, e.g. `## Heading`
 * @param   {String}  char  The character to split (e.g. `#`)
 * @return  {Number}        The heading level, e.g. `2`
 */

symbols.headingLvl = function (str, char) {
  return str.split(char).length - 1;
};


/**
 * Create symbols
 *
 * @return {String}
 */

symbols.patterns = [
  {
    // Jumbotrons ("block" template)
    pattern: symbols.makeDelims(['/{4}\n', '\n/{4}']),
    replacement: function (match, inner) {
      var arr = inner.split('|');
      var text = arr[0];
      var modifier = arr[1];
      return '<div class="jumbotron jumbotron-' + modifier + '">' + text + '</div>';
    }
  },
  {
    // Spoilers
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
    pattern: symbols.makeDelims(['{{', '}}'], {escape: true}),
    replacement: function (match, inner) {
      var arr = inner.split('|');
      var text = arr[0];
      var modifier = arr[1] ? ' spoiler-' + arr[1] : '';
      return '<div class="spoiler' + modifier + '">' + text + '</div>';
    }
  },
  {
    // Labels
    pattern: symbols.makeDelims(['\\|\\|', '\\|\\|']),
    replacement: function (match, inner) {
      var arr = inner.split('|');
      var text = arr[0];
      var modifier = arr[1] ? ' label-' + arr[1] : '';
      return '<span class="label' + modifier + '">' + text + '</span>';
    }
  },
  {
    // Progress bars
    pattern: symbols.makeDelims(['\\={4,}', '\\={4,}']),
    replacement: function (match, inner) {
      var arr = inner.split('|');
      var text = arr[0];
      var modifier = arr[1] ? ' progress-' + arr[1] : '';
      return '<span class="progress' + modifier + '" data-progress="' + text + '">' + text + '</span>';
    }
  },
  {
    // Glyphicons
    pattern: symbols.makeDelims(['\\:{2}', '\\:{2}']),
    replacement: function (match, inner) {
      var arr = inner.split('|');
      var modifier = arr[1] ? ' glyphicon-' + arr[1] : '';
      return '<span class="glyphicon' + modifier + '"></span>';
    }
  },
  {
    // Badges
    pattern: symbols.makeDelims(['\\[\\[', '\\]\\]']),
    replacement: function (match, inner) {
      var arr = inner.split('|');
      var text = arr[0];
      var modifier = arr[1] ? ' badge-' + arr[1] : '';
      return '<span class="badge' + modifier + '">' + text + '</span>';
    }
  },
  {
    // Alerts
    pattern: symbols.makeDelims(['!!', '!!']),
    replacement: function (match, inner) {
      var arr = inner.split('|');
      var text = arr[0];
      var modifier = arr[1] ? ' alert-' + arr[1] : '';
      return '<span class="alert' + modifier + '">' + text + '</span>';
    }
  },
  {
    // Normalize newlines
    pattern: /\r\n/g,
    replacement: '\n'
  },
  {
    // Email (very rough)
    pattern: /(.+)<([^ >]+)((@|:\/)[^ >]+)>/,
    replacement: function (all, $1, $2, $3) {
      return $1 + ' <a href="mailto:' + $2 + $3 + '">' + $2 + '</a>';
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
  },
];


// Process replacement patterns
symbols.process = function (str, patterns) {
  patterns = _.union([], symbols.patterns, patterns);
  return frep.strWithArr(str, patterns);
};