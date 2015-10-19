var Command = require('ronin').Command;
var pkg = require('../package.json');

var fs = require('fs');
var spawn = require('child_process').spawn;
var crypto = require('crypto');
var net = require('net');

var fc00Path = process.env['FC00_PATH'] || process.env['HOME'] + '/.fc00';
var cjdnsPath = fs.realpathSync(__dirname + '/../cjdns');
var pipePrefix = '/tmp/cjdns_pipe_'

var bencode = require(cjdnsPath + '/contrib/nodejs/cjdnsadmin/bencode')

// XXX use node-kexec once it's compatible with node-v4
//     https://github.com/jprichardson/node-kexec/issues/20

var spawnCjdroute = function(pipeName) {
  var cjdroute = spawn(cjdnsPath + '/cjdroute', ['core', pipeName], {stdio: 'inherit'});
  cjdroute.on('close', function(code, signal) {
    console.error('cjdroute exited, code=' + code + ',signal=' + signal)
    process.exit(code);
  });
  cjdroute.on('error', function(err) {
    console.error(err);
    process.exit(1);
  });
  return cjdroute;
};

var sendPreconfig = function(conn) {
  var preconfig = {
    privateKey: fs.readFileSync(fc00Path + '/private_key').toString(),
    admin: {bind: '127.0.0.1:11235', pass: 'NONE'}
  }
  var msg = bencode.encode(preconfig);
  conn.write(msg);
}

module.exports = Command.extend({
  desc: 'Start the cjdns routing daemon',

  run: function() {
    var cjdroute;
    var pipeName = 'client-core-' + crypto.randomBytes(4).toString('hex');

    var corePipe = net.createServer();
    corePipe.listen(pipePrefix + pipeName);
    corePipe.on('listening', function() { cjdroute = spawnCjdroute(pipeName) });
    corePipe.on('connection', function(conn) {
      sendPreconfig(conn)
      conn.on('data', function(data) {
        var result = bencode.decode(data.toString());
        if (result.error !== 'none') {
          if (cjdroute) { cjdroute.kill(); }
          console.error(result);
          process.exit(1);
        }
      });
    });
    corePipe.on('error', function(err) {
      console.error(err);
      if (cjdroute) { cjdroute.kill(); }
      process.exit(1);
    });
  }
});
