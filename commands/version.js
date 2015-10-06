var Command = require('ronin').Command;
var pkg = require('../package.json');

module.exports = Command.extend({
  desc: 'Show fc00 version',

  run: function() {
    console.log(pkg.version)
  }
});
