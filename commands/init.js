var Command = require('ronin').Command;
var pkg = require('../package.json');

module.exports = Command.extend({
  desc: 'Generate the configuration',

  run: function() {
    console.log('TODO: generate $FC00_PATH/private_key');
    console.log('TODO: generate $FC00_PATH/peering.json');
  }
});
