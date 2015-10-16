var Command = require('ronin').Command;
var pkg = require('../package.json');

var fs = require('fs');
var spawnSync = require('child_process').spawnSync;

module.exports = Command.extend({
  desc: 'Generate the configuration',

  run: function() {
    var fc00Path = process.env['FC00_PATH'] || process.env['HOME'] + '/.fc00';
    var cjdnsPath = fs.realpathSync(__dirname + '/../cjdns');

    var genconf = spawnSync('sh', ['-c', cjdnsPath + '/cjdroute --genconf | ' + cjdnsPath + '/cjdroute --cleanconf']);
    if (genconf.error) {
      return console.error(genconf.error);
    }
    var conf = JSON.parse(genconf.stdout);

    var unlessPresent = function(path, cb) {
      try { fs.statSync(path); } catch (err) { cb(path); }
    }

    unlessPresent(fc00Path, function(path) {
      console.log('create ' + path);
      fs.mkdirSync(path);
    });

    unlessPresent(fc00Path + '/private_key', function(path) {
      console.log('create ' + path);
      fs.writeFileSync(path, conf.privateKey, {mode: 0400})
    });

    console.log('finished: your fc00::/8 address: ' + conf.ipv6);
  }
});
