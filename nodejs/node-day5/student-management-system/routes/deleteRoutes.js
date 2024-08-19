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

router.delete('/students/:id', (req, res) => {
    const studentId = req.params.id;
    const students = readStudents();
    const updatedStudents = students.filter(s => s.id !== studentId);
    if (students.length === updatedStudents.length) {
        res.status(404).send('Student not found');
    } else {
        writeStudents(updatedStudents);
        res.status(204).send();
    }
});

module.exports = router;
