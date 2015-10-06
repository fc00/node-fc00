var Command = require('ronin').Command;
var pkg = require('../package.json');

module.exports = Command.extend({
  desc: 'Download and compile cjdroute',

  run: function() {
    console.log('TODO: in $FC00_PATH, git clone && do');
  }
});
