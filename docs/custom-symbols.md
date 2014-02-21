> An array of replacement patterns for custom symbols can be passed as a second parameter

```js
symbols.process( String, patterns );
```

Replacement patterns follow this format:

```js
var patterns = [
  {
    pattern: /foo/, // the pattern to replace
    replacement: 'bar' // the replacement. can be a string or a function.
  }
];
```

## Example

This is the pattern and replacement used to for alerts:

```js
var patterns = [
  {
    pattern: symbols.makeDelims(['!!', '!!']),
    replacement: function (match, inner) {
      var arr = inner.split('|');
      var text = arr[0];
      var modifier = arr[1] ? ' alert-' + arr[1] : '';
      return '<span class="alert' + modifier + '">' + text + '</span>';
    }
  }
];
```
Take a look at [index.js](./index.js) to see how the others are created.

## .makeDelims()

For patterns, the `makeDelims` utility method is a convenience for more easily creating custom symbols:

```js
symbols.makeDelims(['!!', '!!'])
```

The [delims](https://github.com/jonschlinkert/delims) library is used to create delimiters, visit that project to learn about usage and available options.

