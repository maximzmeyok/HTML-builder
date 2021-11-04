const path = require('path');
const fs = require('fs');

const way = path.join(__dirname, 'text.txt');
let data = '';

const stream = fs.createReadStream(way, 'utf-8');
stream.on('data', chunk => data += chunk);
stream.on('end', () => console.log(data));