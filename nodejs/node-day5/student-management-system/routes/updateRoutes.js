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

router.put('/students/:id', (req, res) => {
    const studentId = req.params.id;
    const updatedStudent = req.body;
    const students = readStudents();
    const studentIndex = students.findIndex(s => s.id === studentId);
    if (studentIndex !== -1) {
        students[studentIndex] = updatedStudent;
        writeStudents(students);
        res.json(updatedStudent);
    } else {
        res.status(404).send('Student not found');
    }
});

module.exports = router;
