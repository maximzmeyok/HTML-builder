const path = require('path');
const fs = require('fs');
const way = path.join(__dirname, 'secret-folder');

fs.readdir(way, { withFileTypes: true }, (err, files) => {
    files.forEach(file => {
        if (!file.isDirectory()) {
            fs.stat(path.join(way, file.name), (err, stats) => {
                console.log(`${file.name.split('.')[0]} - ${file.name.split('.')[1]} - ${stats.size} Bytes`);
            });
        };
    });
});