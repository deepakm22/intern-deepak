const http = require('http');
const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'data', 'data.json');

const readData = () => {
    return JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
};

const writeData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        fs.readFile('./public/index.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.method === 'GET' && req.url === '/api/data') {
        const data = readData();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
    } else if (req.method === 'POST' && req.url === '/api/data') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const newItem = JSON.parse(body);
            const data = readData();
            data.push(newItem);
            writeData(data);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newItem));
        });
    } else if (req.method === 'PUT' && req.url.startsWith('/api/data/')) {
        const id = req.url.split('/').pop();
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const updatedItem = JSON.parse(body);
            const data = readData();
            const index = data.findIndex(item => item.id === id);
            if (index !== -1) {
                data[index] = updatedItem;
                writeData(data);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(updatedItem));
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Item not found');
            }
        });
    } else if (req.method === 'DELETE' && req.url.startsWith('/api/data/')) {
        const id = req.url.split('/').pop();
        let data = readData();
        const filteredData = data.filter(item => item.id !== id);
        writeData(filteredData);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Item deleted' }));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
