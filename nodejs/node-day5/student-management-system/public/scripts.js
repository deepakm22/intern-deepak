document.addEventListener('DOMContentLoaded', () => {
    const studentsContainer = document.getElementById('students-container');
    const addStudentForm = document.getElementById('add-student-form');

    const fetchStudents = async () => {
        try {
            const response = await fetch('/students');
            const students = await response.json();
            studentsContainer.innerHTML = '';
            students.forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.email}</td>
                    <td>
                        <button class="btn btn-sm btn-danger" onclick="deleteStudent('${student.id}')">Delete</button>
                        <button class="btn btn-sm btn-warning" onclick="updateStudent('${student.id}')">Update</button>
                        <button class="btn btn-sm btn-success" onclick="downloadStudent('${student.id}')">Download</button>
                    </td>
                `;
                studentsContainer.appendChild(row);
            });
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    addStudentForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(addStudentForm);
        const student = Object.fromEntries(formData.entries());

        try {
            await fetch('/students', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(student),
            });
            addStudentForm.reset();
            fetchStudents();
        } catch (error) {
            console.error('Error adding student:', error);
        }
    });

    window.deleteStudent = async (id) => {
        try {
            await fetch(`/students/${id}`, { method: 'DELETE' });
            fetchStudents();
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    window.updateStudent = async (id) => {
        const name = prompt('Enter new name:');
        const email = prompt('Enter new email:');
        if (name && email) {
            try {
                await fetch(`/students/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id, name, email }),
                });
                fetchStudents();
            } catch (error) {
                console.error('Error updating student:', error);
            }
        }
    };

    window.downloadStudent = (id) => {
        const url = `/download/${id}`;
        window.location.href = url;
    };

    fetchStudents();
});
