const operations = require('./operations/operatios');

const details = async () => {
    const student_management_nodejs = 'student_management_nodejs'

    await operations.createSchemaAndTable(student_management_nodejs);
    await operations.insertStudents(student_management_nodejs);
    await operations.getAllStudents(student_management_nodejs);

const updatedStudent = {
    name: 'Kamal',
    email: 'kamal@example.com',
    phone_no: '5555555555',
    address: '789 Chennai',
    department: 'Engineering',
    institution: 'SRM Institute'
};
    await operations.updateStudentRecord(student_management_nodejs, 1, updatedStudent);
    await operations.deleteStudentRecord(student_management_nodejs, 1);
}
details();
