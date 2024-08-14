const http = require('http')
const calculate = require('./calculate')
const url = require('url');
const fs = require('fs');
const path = require('path');
const log = require('./logger')

const server = http.createServer((req, res) =>{
    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === '/') {

    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error loading the page');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });

} else if (parsedUrl.pathname === '/calculate') {
    const x = parseFloat(parsedUrl.query.x);
    const y = parseFloat(parsedUrl.query.y);
    const operation = parsedUrl.query.operation;

    let result;
    if (operation === 'add') result = calculate.add(x, y);
    else if (operation === 'sub') result = calculate.sub(x, y);
    else if (operation === 'multiply') result = calculate.multiply(x, y);
    else if (operation === 'divide') result = calculate.divide(x, y);
    else result = 'Invalid operation';

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Result: ${x} ${operation} ${y} = ${result}`);
} else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
}
});

server.listen(3000, () => {
    log('server is listening on your port 3000')
    console.log('Server running at http://localhost:3000');

})