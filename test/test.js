var util = require('util');
var file = require('fs-utils');
var expect = require('chai').expect;
var symbols = require('../');


describe('symbols', function () {

  describe('labels:', function () {
    it('should generate HTML for a label with no modifier class', function () {
      var actual = symbols.process('||This is a label!||');
      expect(actual).to.eql('<span class="label">This is a label!</span>');
    });
    it('should generate HTML for a label with the "label-warning" modifier class', function () {
      var actual = symbols.process('||This is a label!|warning||');
      expect(actual).to.eql('<span class="label label-warning">This is a label!</span>');
    });
    it('should generate HTML for a label with the "label-success" modifier class', function () {
      var actual = symbols.process('||This is a label!|success||');
      expect(actual).to.eql('<span class="label label-success">This is a label!</span>');
    });
  });


  describe('blockquotes:', function () {
    it('should generate HTML for a blockquote', function () {
      var actual = symbols.process('> blockquote');
      expect(actual).to.eql('<blockquote>blockquote</blockquote>');
    });
  });


  describe('spoilers:', function () {
    it('should generate HTML for a spoiler with the "spoiler-info" modifier class', function () {
      var actual = symbols.process('{{Simple spoiler|info}}');
      expect(actual).to.eql('<div class="spoiler spoiler-info">Simple spoiler</div>');
    });
    it('should generate HTML for a spoiler with the "spoiler-info" modifier class', function () {
      var actual = symbols.process('{{Write me at <john.doe@example.com>|info}}');
      expect(actual).to.eql('<div class="spoiler spoiler-info">Write me at  <a href="mailto:john.doe@example.com">john.doe</a></div>');
    });
  });


  describe('progress bars:', function () {
    it('should generate HTML for a progress bar', function () {
      var actual = symbols.process('=====0%=====');
      expect(actual).to.eql('<span class="progress" data-progress="0%">0%</span>');
    });
    it('should generate HTML for a progress bar with the "progress-error" modifier class', function () {
      var actual = symbols.process('=====10%|error=====');
      expect(actual).to.eql('<span class="progress progress-error" data-progress="10%">10%</span>');
    });
    it('should generate HTML for a progress bar with the "progress-warning" modifier class', function () {
      var actual = symbols.process('=====40%|warning=====');
      expect(actual).to.eql('<span class="progress progress-warning" data-progress="40%">40%</span>');
    });
    it('should generate HTML for a progress bar with the "progress-success" modifier class', function () {
      var actual = symbols.process('=====80%|success=====');
      expect(actual).to.eql('<span class="progress progress-success" data-progress="80%">80%</span>');
    });
  });


  describe('alerts:', function () {
    it('should generate HTML for a alert', function () {
      var actual = symbols.process('!!New update released! !!');
      expect(actual).to.eql('<span class="alert">New update released! </span>');
    });

    it('should generate HTML for a alert', function () {
      var actual = symbols.process('!!New update released!|info!!');
      expect(actual).to.eql('<span class="alert alert-info">New update released!</span>');
    });
  });


  describe('glyphicons:', function () {
    it('should generate HTML for a glyphicon', function () {
      var actual = symbols.process('::|search::');
      expect(actual).to.eql('<span class="glyphicon glyphicon-search"></span>');
    });

    it('should generate HTML for a glyphicon', function () {
      var actual = symbols.process('::|group::');
      expect(actual).to.eql('<span class="glyphicon glyphicon-group"></span>');
    });
  });


  describe('badges:', function () {
    it('should generate HTML for a badge', function () {
      var actual = symbols.process('[[42]]');
      expect(actual).to.eql('<span class="badge">42</span>');
    });

    it('should generate HTML for a badge', function () {
      var actual = symbols.process('[[42|danger]]');
      expect(actual).to.eql('<span class="badge badge-danger">42</span>');
    });
  });


  describe('jumbotrons:', function () {
    it('should generate HTML for a jumbotron', function () {
      var actual = symbols.process('////\nHello, world|small\n////');
      expect(actual).to.eql('<div class="jumbotron jumbotron-small">Hello, world</div>');
    });
  });
});

