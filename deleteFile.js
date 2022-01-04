const fs = require('fs-extra');

fs.unlink('./resources/user-parsed.json', function (err) {
    if (err) throw err;
    console.log('File deleted!');
});