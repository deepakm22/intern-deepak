const sequelize = require('./db');
const Department = require('../student_management_orm/models/department');
const StudentEnrollment = require('../student_management_orm/models/studentEnrollment');

async function syncModels() {
    try {
    await sequelize.sync({ force: true }); 
    console.log('Tables have been created');
    } catch (error) {
    console.error('Unable to create tables:', error);
    }
}

async function addStudents() {
    const department = await Department.create({ name: 'Computer Science', institution: 'ABC University' });

    const students = await StudentEnrollment.bulkCreate([
    { name: 'John Doe', email: 'john@example.com', phone_no: '1234567890', address: '123 Main St', dept_id: department.id },
    ]);
    console.log('Students added:', students);
}

async function updateStudent(id, newDetails) {
    await StudentEnrollment.update(newDetails, {
    where: { id }
    });

    const updatedStudent = await StudentEnrollment.findOne({
    where: { id },
    include: { model: Department, attributes: ['name'] }
    });

    console.log('Updated student:', updatedStudent);
}


async function deleteStudent(id) {
    const student = await StudentEnrollment.findOne({ where: { id } });

    await StudentEnrollment.destroy({ where: { id } });

    const deletedData = JSON.stringify(student, null, 2);
    fs.writeFileSync('deleted_student.json', deletedData);
    console.log('Deleted student written to deleted_student.json');
}




syncModels();
addStudents();
updateStudent(1, { name: 'Vishnu', email: 'vishnu@gmail.com' });
deleteStudent(1);

