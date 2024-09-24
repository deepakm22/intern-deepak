import React from 'react';

function StudentList() {
    const students = [
    { name: 'Alice', major: 'Math' },
    { name: 'Bob', major: 'Physics' },
    { name: 'Charlie', major: 'Chemistry' }
    ];

return (
    <div>
    <h3>Student List:</h3>
    <ul>
        {students.map((student, index) => (
        <li key={index}>
            {student.name} -- Major: {student.major}
        </li>
        ))}
    </ul>
    </div>
);
}

export default StudentList;
