import http from 'http';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = http.createServer((req, res) => {

if (req.method === 'GET') {
    if (req.url === '/') {
        console.log('Serving index.html');
        fs.readFile(path.join(__dirname, 'public/index.html'), (err, data) => {
        if (err) {
        console.error('Error loading index.html:', err);
        res.writeHead(500);
        res.end('Error loading index.html');
        return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
    } else if (req.url.startsWith('/compressed/')) {
    console.log(`Serving compressed image: ${req.url}`);
    fs.readFile(path.join(__dirname, req.url), (err, data) => {
        if (err) {
        console.error('Error serving compressed image:', err);
        res.writeHead(404);
        res.end('File not found');
        return;
        }
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.end(data);
    });
    } else {
    console.log('404 Not Found');
    res.writeHead(404);
    res.end('Not found');
    }
} else if (req.method === 'POST' && req.url === '/upload') {
    console.log('Handling file upload');
    const filePath = path.join('uploads', 'uploaded_image.jpg');


    req.on('end', () => {
    console.log('File upload complete, starting compression');
    exec('gulp compress', (err) => {
        if (err) {
        console.error('Error compressing image:', err);
        res.writeHead(500);
        res.end('Error compressing image');
        return;
        }

        const oldPath = filePath;
        const newPath = path.join('compressed', 'uploaded_image.jpg');

        console.log('Checking file sizes');
        fs.stat(oldPath, (err, statsOld) => {
        if (err) {
            console.error('Error getting old file stats:', err);
            res.writeHead(500);
            res.end('Error processing old file');
            return;
        }

        fs.stat(newPath, (err, statsNew) => {
            if (err) {
            console.error('Error getting new file stats:', err);
            res.writeHead(500);
            res.end('Error processing new file');
            return;
            }

            console.log('File compression successful');
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
            <h1>Image Compressed</h1>
            <p><strong>Image Name:</strong> uploaded_image.jpg</p>
            <p><strong>Old Size:</strong> ${(statsOld.size / 1024).toFixed(2)} KB</p>
            <p><strong>New Size:</strong> ${(statsNew.size / 1024).toFixed(2)} KB</p>
            <a href="/compressed/uploaded_image.jpg" download>Download Compressed Image</a>
            `);
        });
        });
    });
    });

} else {
    console.log('404 Not Found');
    res.writeHead(404);
    res.end('Not found');
}
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});


// import http from 'http';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import sharp from 'sharp';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const supportedFormats = ['jpg', 'jpeg', 'png', 'webp', 'tiff', 'gif'];

// const server = http.createServer((req, res) => {
//   if (req.method === 'GET') {
//     if (req.url === '/') {
//       console.log('Serving index.html');
//       fs.readFile(path.join(__dirname, 'public/index.html'), (err, data) => {
//         if (err) {
//           console.error('Error loading index.html:', err);
//           res.writeHead(500);
//           res.end('Error loading index.html');
//           return;
//         }
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.end(data);
//       });
//     } else if (req.url.startsWith('/compressed/')) {
//       console.log(`Serving compressed image: ${req.url}`);
//       fs.readFile(path.join(__dirname, req.url), (err, data) => {
//         if (err) {
//           console.error('Error serving compressed image:', err);
//           res.writeHead(404);
//           res.end('File not found');
//           return;
//         }
//         res.writeHead(200, { 'Content-Type': 'image/jpeg' });
//         res.end(data);
//       });
//     } else {
//       console.log('404 Not Found');
//       res.writeHead(404);
//       res.end('Not found');
//     }
//   } else if (req.method === 'POST' && req.url === '/upload') {
//     console.log('Handling file upload');

//     const filePath = path.join('uploads', 'uploaded_image.jpg');
//     const fileStream = fs.createWriteStream(filePath);

//     req.pipe(fileStream);

//     req.on('end', () => {
//       console.log('File upload complete, starting compression');

//       const ext = path.extname(filePath).slice(1).toLowerCase(); // Get file extension

//       if (!supportedFormats.includes(ext)) {
//         console.error('Unsupported image format:', ext);
//         res.writeHead(400, { 'Content-Type': 'text/html' });
//         res.end(`
//           <h1>Error</h1>
//           <p>Unsupported image format: ${ext}</p>
//         `);
//         return;
//       }

//       const outputFilePath = path.join('compressed', 'uploaded_image.jpg');

//       sharp(filePath)
//         .resize(800) // Resize the image to 800px width, maintaining aspect ratio
//         .toFile(outputFilePath, (err, info) => {
//           if (err) {
//             console.error('Error compressing image:', err);
//             res.writeHead(500);
//             res.end('Error compressing image');
//             return;
//           }

//           console.log('File compression successful');
//           fs.stat(filePath, (err, statsOld) => {
//             if (err) {
//               console.error('Error getting old file stats:', err);
//               res.writeHead(500);
//               res.end('Error processing old file');
//               return;
//             }

//             fs.stat(outputFilePath, (err, statsNew) => {
//               if (err) {
//                 console.error('Error getting new file stats:', err);
//                 res.writeHead(500);
//                 res.end('Error processing new file');
//                 return;
//               }

//               res.writeHead(200, { 'Content-Type': 'text/html' });
//               res.end(`
//                 <h1>Image Compressed</h1>
//                 <p><strong>Image Name:</strong> uploaded_image.jpg</p>
//                 <p><strong>Old Size:</strong> ${(statsOld.size / 1024).toFixed(2)} KB</p>
//                 <p><strong>New Size:</strong> ${(statsNew.size / 1024).toFixed(2)} KB</p>
//                 <a href="/compressed/uploaded_image.jpg" download>Download Compressed Image</a>
//               `);
//             });
//           });
//         });
//     });

//     req.on('error', (err) => {
//       console.error('Error handling upload:', err);
//       res.writeHead(500);
//       res.end('Error handling upload');
//     });
//   } else {
//     console.log('404 Not Found');
//     res.writeHead(404);
//     res.end('Not found');
//   }
// });

// server.listen(3000, () => {
//   console.log('Server running at http://localhost:3000');
// });
