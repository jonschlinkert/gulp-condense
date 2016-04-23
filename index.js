/*!
 * gulp-condense (https://github.com/jonschlinkert/gulp-condense)
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var debug = require('debug')('gulp-condense');

module.exports = function(config) {
  return function(app) {
    if (this.isRegistered('gulp-condense')) return;

    this.define('gulp-condense', function() {
      debug('running gulp-condense');
      
    });
  };
};
