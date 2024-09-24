const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const studentsFilePath = path.join(__dirname, '../data/students.json');

const readStudents = () => {
    const data = fs.readFileSync(studentsFilePath);
    return JSON.parse(data);
};

router.get('/students', (req, res) => {
    const students = readStudents();
    res.json(students);
});

module.exports = router;
