#!/usr/bin/env node

var cli = require("ronin")(__dirname);

cli.autoupdate(function () {
  cli.run();
});
