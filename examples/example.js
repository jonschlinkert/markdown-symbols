/**
 * Read in the test fixture
 */
var file = require('fs-utils');
var symbols = require('../');


/**
 * Test fixture
 */

var fixture = file.readFileSync('examples/examples.md');

/**
 * Write example file
 */

file.writeFileSync('examples/examples.html', symbols.process(fixture));