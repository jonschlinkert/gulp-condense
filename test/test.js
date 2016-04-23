'use strict';

require('mocha');
var fs = require('fs');
var path = require('path');
var File = require('vinyl');
var assert = require('assert');
var condense = require('..');

function readExpected(filepath) {
  var cwd = path.resolve(__dirname, 'expected', path.basename(filepath));
  return fs.readFileSync(cwd, 'utf8');
}

describe('gulp-condense', function() {
  it('should export a function', function() {
    assert.equal(typeof condense, 'function');
  });
});

describe('plugin', function() {
  it('should return an object', function() {
    assert(condense());
    assert.equal(typeof condense(), 'object');
    assert.equal(typeof condense().pipe, 'function');
  });

  it('should not fail on non-existent files', function(cb) {
    var stream = condense();
    var buffer = [];

    stream.write(new File({
      base: __dirname,
      path: __dirname + '/fooooo.txt'
    }));

    stream.on('data', function(file) {
      buffer.push(file);
    });

    stream.on('end', function() {
      assert.equal(buffer.length, 1);
      assert.equal(buffer[0].relative, 'fooooo.txt');
      cb();
    });

    stream.end();
  });

  it('should remove extra newlines from a string', function(cb) {
    var stream = condense();
    var buffer = [];

    var filepath = __dirname + '/fixtures/excessive-newlines.md';
    var expected = readExpected(filepath);

    stream.write(new File({
      base: __dirname,
      path: filepath,
      contents: fs.readFileSync(filepath)
    }));

    stream.on('data', function(file) {
      buffer.push(file);
    });

    stream.on('end', function() {
      assert.equal(buffer.length, 1);
      assert.equal(buffer[0].contents.toString(), expected);
      assert.equal(buffer[0].relative, 'fixtures/excessive-newlines.md');
      cb();
    });

    stream.end();
  });
});
