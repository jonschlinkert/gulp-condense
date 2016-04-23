/*!
 * gulp-condense (https://github.com/jonschlinkert/gulp-condense)
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var condense = require('condense-newlines');
var through = require('through2');

module.exports = function(options) {
  return through.obj(function(file, enc, next) {
    if (file.isNull()) {
      next(null, file);
      return;
    }
    file.contents = new Buffer(condense(file.contents.toString(), options));
    next(null, file);
  });
};
