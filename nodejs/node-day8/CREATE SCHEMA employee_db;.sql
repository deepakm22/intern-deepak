CREATE SCHEMA employee_db;

CREATE TABLE employee_db.department (
    dept_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    organization VARCHAR(100) NOT NULL
);

CREATE TABLE employee_db.emp_info (
    emp_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    phone_no VARCHAR(15),
    department_id INT NOT NULL,
    designation VARCHAR(100),
    salary DECIMAL(10, 2),
    FOREIGN KEY (department_id) REFERENCES employee_db.department(dept_id)
);

DROP TABLE employee_db.department;

INSERT INTO employee_db.department (dept_id, name, organization) VALUES 
('101', 'HR', 'Org1'),
('102', 'IT', 'Org2'),
( '103',  'Finance', 'Org1'),
( '104', 'Marketing', 'Org3');

INSERT INTO employee_db.emp_info (name, address, phone_no, department_id, designation, salary)
VALUES ('John Doe', '123 Elm St', '1234567890', 101, 'Manager', 5000.00),
('Deepak', '123 Elm St', '1234567890', 102, 'Manager', 5000.00),
('Vijay', '123 Elm St', '1234567890', 103, 'Manager', 5000.00),
('Batcha', '123 Elm St', '1234567890', 101, 'Manager', 5000.00),
('Nithin', '123 Elm St', '1234567890', 101, 'Manager', 5000.00),
('Farook', '123 Elm St', '1234567890', 102, 'Manager', 5000.00),
('Dharanish', '123 Elm St', '1234567890', 103, 'Manager', 5000.00),
('Dhanan', '123 Elm St', '1234567890', 102, 'Manager', 5000.00),
('Novfal', '123 Elm St', '1234567890', 102, 'Manager', 5000.00);

INSERT INTO employee_db.emp_info (name, address, phone_no, department_id, designation, salary)
VALUES ('Arjun', '123 Elm St', '1234567890', 103, 'Manager', 7000.00),
('Aravund', '123 Elm St', '1234567890', 102, 'Manager', 6000.00);


UPDATE employee_db.emp_info
SET designation = 'emp'
WHERE emp_id = 10;

SELECT * FROM employee_db.emp_info;

SELECT employee_db.emp_info.name AS "Employee Name",
    employee_db.emp_info.designation AS "Designation",
    employee_db.department.name AS "Department Name",
    employee_db.emp_info.phone_no AS "Contact Number",
    employee_db.department.organization AS "Organization"
FROM employee_db.emp_info
JOIN employee_db.department 
ON employee_db.emp_info.department_id = employee_db.department.dept_id;

DELETE FROM employee_db.emp_info WHERE emp_id = 2;

DELETE FROM employee_db.department WHERE dept_id = 104;

UPDATE employee_db.emp_info SET salary = salary + 3000 WHERE department_id = 102;    

SELECT * FROM employee_db.emp_info ORDER BY emp_id DESC LIMIT 3;

SELECT name, phone_no, salary FROM employee_db.emp_info WHERE salary BETWEEN 5000 AND 7000;

SELECT name 
FROM employee_db.emp_info 
WHERE name ILIKE 'ar%';

SELECT * FROM employee_db.emp_info;