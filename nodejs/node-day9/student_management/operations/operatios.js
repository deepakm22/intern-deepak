const fs = require('fs');
const path = require('path');
const studentModel = require('../models/studentModel');

const createSchemaAndTable = async (student_management_nodejs) => {
    await studentModel.createSchema(student_management_nodejs);
    console.log(`Table ${student_management_nodejs} created successfully`);


await studentModel.createTable(student_management_nodejs);
console.log(`Table students_registration created successfully in schema ${student_management_nodejs}`);
};

const insertStudents = async (student_management_nodejs) => {
const students = [
    { name: 'Arun Kumar', email: 'arunkumar@example.com', phone_no: '9876543210', address: '12 South Street', department: 'CSE', institution: 'Anna University' },
    { name: 'Deepak', email: 'deepak@example.com', phone_no: '8765432109', address: '34 North Street', department: 'ECE', institution: 'PSG College of Technology' },
    { name: 'Ravi Chandran', email: 'ravichandran@example.com', phone_no: '7654321098', address: '56 East Street', department: 'IT', institution: 'Madras Institute of Technology' },
    { name: 'Meena ', email: 'meena@example.com', phone_no: '6543210987', address: '78 West Street', department: 'EEE', institution: 'Coimbatore Institute of Technology' },
    { name: 'Vijay Kumar', email: 'vijaykumar@example.com', phone_no: '5432109876', address: '90 Central Avenue', department: 'Mechanical', institution: 'SRM University' },
    { name: 'Batcha', email: 'batcha@example.com', phone_no: '4321098765', address: '23 Park Road', department: 'Civil', institution: 'Thiagarajar College of Engineering' },
    { name: 'Suresh Reddy', email: 'sureshreddy@example.com', phone_no: '3210987654', address: '45 Temple Street', department: 'Biotech', institution: 'Kumaraguru College of Technology' },
    { name: 'vijay', email: 'vijay@example.com', phone_no: '3210987654', address: '45 Temple Street', department: 'Biotech', institution: 'Kumaraguru College of Technology' },
    { name: 'Suresh', email: 'suresh@example.com', phone_no: '3210987654', address: '45 Temple Street', department: 'Biotech', institution: 'Kumaraguru College of Technology' }

];

for (const student of students) {
    const newStudent = await studentModel.addStudent(student_management_nodejs, student);
    console.log('Student added:', newStudent);
    }
};

const getAllStudents = async (student_management_nodejs) => {
    const students = await studentModel.getAllStudents(student_management_nodejs);
    console.table(students);

    const filePath = path.join(__dirname, '../data/students.json');
    fs.writeFileSync(filePath, JSON.stringify(students, null, 2));
    console.log(`Student data written to students.json ${student_management_nodejs}`);
};

const updateStudentRecord = async (student_management_nodejs, id, updatedData) => {
    const updatedStudent = await studentModel.updateStudent(student_management_nodejs, id, updatedData);
    console.log('Updated Student:', updatedStudent);
    return updatedStudent;
};

const deleteStudentRecord = async (student_management_nodejs, id) => {
    const deletedStudent = await studentModel.deleteStudent(student_management_nodejs, id);
    console.log('Deleted Student:', deletedStudent);

    const filePath = path.join(__dirname, '../data/updated_student.json');
    fs.writeFileSync(filePath, JSON.stringify(deletedStudent, null, 2));
    console.log(`Deleted student data written to updated_student.json ${student_management_nodejs}`);
};

module.exports = {
    createSchemaAndTable,
    insertStudents,
    getAllStudents,
    updateStudentRecord,
    deleteStudentRecord,
};
