var En = module.exports;

// default dialect is Canadian cause I'm Canadian
En.default = 'CA';
En.CA = require("./ca");
En.US = require("./us");
