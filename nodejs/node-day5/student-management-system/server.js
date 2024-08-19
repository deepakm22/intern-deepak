const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const listRoutes = require('./routes/listRoutes');
const addRoutes = require('./routes/addRoutes');
const updateRoutes = require('./routes/updateRoutes');
const deleteRoutes = require('./routes/deleteRoutes');

app.use(listRoutes);
app.use(addRoutes);
app.use(updateRoutes);
app.use(deleteRoutes);

app.get('/download/all', (req, res) => {
    const studentsFilePath = path.join(__dirname, 'data', 'students.json');
    res.download(studentsFilePath, 'students.json', (err) => {
        if (err) {
            console.error('Error downloading file:', err);
            res.status(500).send('Server error');
        }
    });
});

app.get('/download/:id', async (req, res) => {
    const studentId = req.params.id;
    const studentsFilePath = path.join(__dirname, 'data', 'students.json');

    try {
        const students = JSON.parse(await promisify(fs.readFile)(studentsFilePath, 'utf8'));
        const student = students.find(s => s.id === studentId);

        if (student) {
            const jsonContent = JSON.stringify(student, null, 2);
            res.setHeader('Content-Disposition', `attachment; filename=${studentId}.json`);
            res.setHeader('Content-Type', 'application/json');
            res.send(jsonContent);
        } else {
            res.status(404).send('Student not found');
        }
    } catch (error) {
        console.error('Error reading or sending student data:', error);
        res.status(500).send('Server error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
