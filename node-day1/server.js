const http = require('http');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.txt');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        fs.readFile('webpage.html', (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (req.method === 'GET' && req.url === '/read') {
        fs.readFile(filePath,  (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data || 'File is empty');
        });
    } else if (req.method === 'POST' && req.url === '/append') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            const { text } = JSON.parse(body);
            fs.appendFile(filePath, text + '\n', () => {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Text appended');
            });
        });
    } else if (req.method === 'POST' && req.url === '/create') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            const { fileName } = JSON.parse(body);
            fs.writeFile(path.join(__dirname, fileName), '', () => {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('File created');
            });
        });
    } else if (req.method === 'POST' && req.url === '/delete') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            const { fileName } = JSON.parse(body);
            fs.unlink(path.join(__dirname, fileName), () => {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('File deleted');
            });
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
