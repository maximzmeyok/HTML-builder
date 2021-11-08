const path = require('path');
const fs = require('fs');

fs.rm(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
  fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, (err) => {
      fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'fonts'), { recursive: true }, (err) => {
        fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'img'), { recursive: true }, (err) => {
          fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'svg'), { recursive: true }, (err) => {
            fs.readdir(path.join(__dirname, 'assets', 'fonts'), { withFileTypes: true }, (err, files) => {
              files.forEach(file => {
                fs.copyFile(path.join(__dirname, 'assets', 'fonts', file.name), path.join(__dirname, 'project-dist', 'assets', 'fonts', file.name), (err) => {})
              });
            });

            fs.readdir(path.join(__dirname, 'assets', 'img'), { withFileTypes: true }, (err, files) => {
              files.forEach(file => {
                fs.copyFile(path.join(__dirname, 'assets', 'img', file.name), path.join(__dirname, 'project-dist', 'assets', 'img', file.name), (err) => {})
              });
            });

            fs.readdir(path.join(__dirname, 'assets', 'svg'), { withFileTypes: true }, (err, files) => {
              files.forEach(file => {
                fs.copyFile(path.join(__dirname, 'assets', 'svg', file.name), path.join(__dirname, 'project-dist', 'assets', 'svg', file.name), (err) => {})
              });
            });
          });
        });
      });
    });
  });
});

fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '', (err) => {
  fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (err, files) => {
      let styles = [];
      files.forEach(file => {
          if (!file.isDirectory()) {
              if (file.name.split('.')[1] == 'css') {
                  const stream = fs.createReadStream(path.join(__dirname, 'styles', `${file.name}`), 'utf-8');
                  stream.on('data', chunk => styles.push(chunk));
                  stream.on('end', () => fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), `${styles.join('')}`, (err) => {}));
              }
          };
      });
  });
});

fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), '', (err) => {
  let arrIndex = [];
  let arrHeader = [];
  let arrArticles = [];
  let arrFooter = [];
  let arrAbout = [];
  const stream = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');
  stream.on('data', chunk => arrIndex.push(chunk));
  arrIndex.join('');
  if (arrIndex.includes('{{header}}')) {
    const streamHeader = fs.createReadStream(path.join(__dirname, 'components', 'header.html'), 'utf-8');
    streamHeader.on('data', chunk => arrHeader.push(chunk));
    arrIndex.split('{{header}}');
  }
  stream.on('end', () => fs.appendFile(path.join(__dirname, 'project-dist', 'index.html'), `${arrIndex.join('')}`, (err) => {}));
});
