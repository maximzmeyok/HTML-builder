const { stdin, stdout } = process;
const path = require('path');
const fs = require('fs');

fs.writeFile(
    path.join(__dirname, '02-write-file.txt'),
    '',
    (err) => {
        if (err) throw err;
    }
);

stdout.write('Введите ваш текст: ');

stdin.on('data', data => {
    let text = data.toString();
    if (text == 'exit\r\n') {
        process.exit();
    } else {
        fs.appendFile(
            path.join(__dirname, '02-write-file.txt'),
            `${data}`,
            err => {
                if (err) throw err;
            }
        );
    }
});

process.on('exit', () => stdout.write('Удачи в изучении Node.js!'));
process.on('SIGINT', () => process.exit());