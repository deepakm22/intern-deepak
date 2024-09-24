const pool = require('../config/db');


const createSchema = async (student_management_nodejs) => {
    const query = `CREATE SCHEMA IF NOT EXISTS ${student_management_nodejs}`;
    await pool.query(query);
};

const createTable = async (student_management_nodejs) => {
    const query = `
    CREATE TABLE IF NOT EXISTS ${student_management_nodejs}.students_registration (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100),
    phone_no VARCHAR(15),
    address TEXT,
    department VARCHAR(50),
    institution VARCHAR(100)
    )
    `;
    await pool.query(query);
};

const addStudent = async (student_management_nodejs, student) => {
    const query = `
    INSERT INTO ${student_management_nodejs}.students_registration (name, email, phone_no, address, department, institution)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `;
    const values = [student.name, student.email, student.phone_no, student.address, student.department, student.institution];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const getAllStudents = async (student_management_nodejs) => {
  const result = await pool.query(`SELECT * FROM ${student_management_nodejs}.students_registration`);
    return result.rows;
};

const updateStudent = async (student_management_nodejs, id, updatedData) => {
    const query = `
    UPDATE ${student_management_nodejs}.students_registration SET name = $1, email = $2, phone_no = $3, address = $4, department = $5, institution = $6
    WHERE id = $7 RETURNING *
    `;
    const values = [updatedData.name, updatedData.email, updatedData.phone_no, updatedData.address, updatedData.department, updatedData.institution, id];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const deleteStudent = async (student_management_nodejs,id) => {
  const query = `DELETE FROM ${student_management_nodejs}.students_registration WHERE id = $1 RETURNING *`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
};

module.exports = {
    createSchema,
    createTable,
    addStudent,
    getAllStudents,
    updateStudent,
    deleteStudent,
};
