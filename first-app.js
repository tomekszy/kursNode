const fs = require('fs');
var data = 'Hello from Node.js';
var file = 'hello.txt';
console.log(data);
fs.writeFileSync(file, data);
