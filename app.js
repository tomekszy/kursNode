const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    res.setHeader('Content-Type', 'text/html');
    if (url === '/') {
        res.write(`
<html>
<head>
<title>Enter message</title>
</head>
<body>
<form action="/message" method="POST">
<input type="text" name="message"><button type="submit">Send</button>
</form>
</body>
</html>
        `);
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const fileName = parsedBody.split('=')[0] + '.txt';
            const message = parsedBody.split('=')[1];
            fs.writeFile(fileName, message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location','/');
                return res.end();
            });
        });
    }
    console.log(url, method, req.headers);
    /*
    res.write(`
<html>
<head>
<title>Test</title>
</head>
<body>
<h2>Test</h2>
</body>
</html>
    `);
    */
    res.end();
    // process.exit();
});

server.listen(3000, 'localhost');
