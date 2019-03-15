const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write(`
    <html>
    <head>
    <title>Hello</title>
    </head>
    <body>
    <h2>List of users:</h2>
    <ul>
        <li>User 1</li>
        <li>User 2</li>
        <li>User 3</li>
    </ul>
    </body>
    </html>
    `);
        return res.end();
    }
    if (url === '/users') {
        res.write(`
<html>
<head>
<title>Create user</title>
</head>
<body>
<form action="/create-user" method="POST">
<input type="text" name="username"><button type="submit">Send</button>
</form>
</body>
</html>
        `);
        return res.end();
    }
    if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const fileName = parsedBody.split('=')[0] + '.txt';
            const message = parsedBody.split('=')[1];
            fs.writeFile(fileName, message, (err) => {
                console.log(message);
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
    res.setHeader('Content-Type', 'text/html');
    /*

    */
    // console.log(url, method, req.headers);
    res.end();
// process.exit();
};

module.exports = {
    handler: requestHandler,
    someText: 'Some hard coded text'
};
