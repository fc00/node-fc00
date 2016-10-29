var Readline = require("readline");

var Reader = module.exports = {};

Reader.open = function (In, Out) {
    return Readline.createInterface({
        input: In || process.stdin,
        //output: Out || process.stdout
    });
};

Reader.getPipeData = function (cb) {
    var stream = process.stdin;
    var data = '';
    stream.on('readable', function () {
        var chunk = this.read();
        if (chunk === null) {
            return void cb(void 0, data);
        }
        data += chunk.toString();
        stream.on('data', function (d) { data += d; })
        .on('end', function () { cb(void 0, data); });
    })
};

/* rl.question('What do you think of Node.js? ', (answer) => {
    // TODO: Log the answer in a database
    console.log('Thank you for your valuable feedback:', answer);
    rl.close();
});
*/
