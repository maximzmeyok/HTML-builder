const path = require('path');
const fs = require('fs');

fs.unlink(path.join(__dirname, 'project-dist', 'bundle.css'), (err) => {
    fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), '', (err) => {
        fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (err, files) => {
            let styles = [];
            files.forEach(file => {
                if (!file.isDirectory()) {
                    if (file.name.split('.')[1] == 'css') {
                        const stream = fs.createReadStream(path.join(__dirname, 'styles', `${file.name}`), 'utf-8');
                        stream.on('data', chunk => styles.push(chunk));
                        stream.on('end', () => fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), `${styles.join('')}`, (err) => {}));
                    }
                };
            });
        });
    });
});