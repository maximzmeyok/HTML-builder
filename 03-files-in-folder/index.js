const path = require('path');
const fs = require('fs');
const way = path.join(__dirname, 'secret-folder');

fs.readdir(way, { withFileTypes: true }, (err, files) => {
    files.forEach(file => {
        if (!file.isDirectory()) {
            /* let name = file.name.split('.')[0];
            let ext = path.extname(`${file.name}`).split('.')[1];
            let wayToFile = path.join(way, file.name);

            fs.stat(wayToFile, (err, stats) => {
                console.log(`${name} - ${ext} - ${stats.size} Bytes`);
            }); */
            fs.stat(path.join(way, file.name), (err, stats) => {
                console.log(`${file.name.split('.')[0]} - ${file.name.split('.')[1]} - ${stats.size} Bytes`);
            });
        };
    });
});