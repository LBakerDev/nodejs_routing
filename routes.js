const fs = require('fs');

const requestHandler = (req, res) => {
    // console.log(req);
    const url = req.url;
    const method = req.method;
    if(url === '/') {
        res.write('<html>')
        res.write('<h1>Hey you reached the default</h1>')
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="msg"><button type="submit">Send</button></body></html>')
        return res.end();
    }
    if(url === '/users') {
        res.write('<html><body><ul><li>User1</li></ul></body></html>')
    }

    if(url === '/create-user' && method === "POST") {
        const body = [];
        req.on('data', (chunk) => {
        body.push(chunk)
        })
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log(message);
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
            
        })
    }
}

 module.exports = requestHandler;