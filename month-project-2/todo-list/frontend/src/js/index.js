document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username');
    if (username) {
        document.getElementById('profile').textContent = username;
    } else {
        document.getElementById('profile').textContent = "User";
    }

    if (!localStorage.getItem('userToken')) {
        window.location.href = 'login.html';
    }

    getTasks();

    document.getElementById('addTaskForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const taskData = {
            title: document.getElementById('taskTitle').value,
            description: document.getElementById('taskDescription').value,
            dueDate: document.getElementById('taskDueDate').value,
            priority: document.getElementById('taskPriority').value,
            status: document.getElementById('taskStatus').value,
            isPinned: document.getElementById('taskIsPinned').checked
        };

        if (isNaN(Date.parse(taskData.dueDate))) {
            alert('Invalid date format');
            return;
        }

        try {
            const token = localStorage.getItem('userToken');
            const response = await fetch('http://localhost:3000/api/tasks/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                body: JSON.stringify(taskData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Task added:', data);
                getTasks();
                document.getElementById('addTaskForm').reset();
                const addTaskModal = bootstrap.Modal.getInstance(document.getElementById('addTaskModal'));
                addTaskModal.hide();
            } else {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                alert('Error: Unable to add task');
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    });

    async function getTasks() {
        const token = localStorage.getItem('userToken');
        try {
            const response = await fetch('http://localhost:3000/api/tasks/get', {
                method: 'GET',
                headers: {
                    'authorization': token,
                    'Content-Type': 'application/json'
                }
            });
            const tasks = await response.json();
            const task_list = document.getElementById('task-list');
            task_list.innerHTML = tasks.map(task => `
                <div class="task-item">
                    <div class="task-body">
                        <h3 class="task-title">Title: <span>${task.title}</span></h3>
                        <p class="task-description">Description: ${task.description}</p>
                        <p class="task-dueDate">Due Date: ${new Date(task.dueDate).toLocaleDateString()}</p>
                        <p class="task-priority">Priority: ${task.priority}</p>
                        <p class="task-status">Status: ${task.status}</p>
                        <p class="task-pinned">Pinned: ${task.isPinned ? 'Yes' : 'No'}</p>
                        <button class="btn btn-warning" onclick="editTask(${task.id})">Edit</button>
                        <button class="btn btn-danger" onclick="deleteTask(${task.id})">Delete</button>
                    </div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }

    function editTask(taskId) {
        const token = localStorage.getItem('userToken');
        fetch(`http://localhost:3000/api/tasks/get/${taskId}`, {
            method: 'GET',
            headers: {
                'authorization': token,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(task => {
            document.getElementById('taskId').value = task.id;
            document.getElementById('taskTitle').value = task.title;
            document.getElementById('taskDescription').value = task.description;
            document.getElementById('taskDueDate').value = task.dueDate.split('T')[0];
            document.getElementById('taskPriority').value = task.priority;
            document.getElementById('taskStatus').value = task.status;
            document.getElementById('taskIsPinned').checked = task.isPinned;

            const editTaskModal = new bootstrap.Modal(document.getElementById('editTaskModal'));
            editTaskModal.show();
        });
    }

    document.getElementById('editTaskForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const taskData = {
            title: document.getElementById('taskTitle').value,
            description: document.getElementById('taskDescription').value,
            dueDate: document.getElementById('taskDueDate').value,
            priority: document.getElementById('taskPriority').value,
            status: document.getElementById('taskStatus').value,
            isPinned: document.getElementById('taskIsPinned').checked
        };

        if (isNaN(Date.parse(taskData.dueDate))) {
            alert('Invalid date format');
            return;
        }

        const taskId = document.getElementById('taskId').value;

        try {
            const token = localStorage.getItem('userToken');
            const response = await fetch(`http://localhost:3000/api/tasks/update/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                body: JSON.stringify(taskData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Task updated:', data);
                getTasks();
                document.getElementById('editTaskForm').reset();
                const editTaskModal = bootstrap.Modal.getInstance(document.getElementById('editTaskModal'));
                editTaskModal.hide();
            } else {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                alert('Error: Unable to update task');
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    });

    window.deleteTask = function(taskId) {
        const confirmModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
        confirmModal.show();
        
        document.getElementById('confirmDeleteButton').onclick = function() {
            fetch(`http://localhost:3000/api/tasks/delete/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'authorization': localStorage.getItem('userToken'),
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    console.log('Task deleted');
                    getTasks();
                } else {
                    document.getElementById('errorMessage').textContent = 'Unable to delete task. Please try again later.';
                    const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
                    errorModal.show();
                }
            })
            .catch(() => {
                document.getElementById('errorMessage').textContent = 'A network error occurred. Please check your connection.';
                const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
                errorModal.show();
            });
            
            confirmModal.hide();
        };
    };
    
    document.getElementById('logout-button').addEventListener('click', () => {
        localStorage.removeItem('userToken');
        window.location.href = 'login.html';
    });
});


