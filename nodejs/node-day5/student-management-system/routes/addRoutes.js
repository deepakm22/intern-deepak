const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const studentsFilePath = path.join(__dirname, '../data/students.json');

const readStudents = () => {
    const data = fs.readFileSync(studentsFilePath);
    return JSON.parse(data);
};

const writeStudents = (students) => {
    fs.writeFileSync(studentsFilePath, JSON.stringify(students, null, 2));
};

router.post('/students', (req, res) => {
    const newStudent = req.body;
    const students = readStudents();
    students.push(newStudent);
    writeStudents(students);
    res.status(201).json(newStudent);
});

module.exports = router;
