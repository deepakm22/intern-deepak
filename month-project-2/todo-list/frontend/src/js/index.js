document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username');
    document.getElementById('profile').textContent = username || "User";

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
                let successModal = new bootstrap.Modal(document.getElementById('successModal'));
                successModal.show();
                setTimeout(function() {
                    successModal.hide();
                }, 3000);
            } else {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                alert('Error: Unable to add task');
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    });

        const priorityFilter = document.getElementById('priorityFilter');
        // console.log(priorityFilter);
        const dueDateInput = document.getElementById('taskDueDate');
        const today = new Date().toISOString().split('T')[0];
        dueDateInput.setAttribute('min', today);
        
        priorityFilter.addEventListener('change', () => {
            const selectedPriority = priorityFilter.value;
            console.log(selectedPriority);
            
            getTasks(selectedPriority); 
        });



    async function getTasks(priority = '') {
        const token = localStorage.getItem('userToken');
        let url = 'http://localhost:3000/api/tasks/get';
    if (priority) {
        url += `?priority=${encodeURIComponent(priority)}`;
    }

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'authorization':`Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const tasks = await response.json();
            
            tasks.sort((a, b) => b.isPinned - a.isPinned);
    
            const task_list = document.getElementById('task-list');
            task_list.innerHTML = tasks.map(task => `
                <div class="task-item ">
                    <div class="task-body">
                        <div class="pin-container"> ${task.isPinned ? '<i class="pin-icon">📌</i>' : ''}</div>                        <h3 class="task-title">Title: <span>${task.title}</span></h3>
                        <p class="task-description">Description: ${task.description}</p>
                        <p class="task-dueDate">Due Date: ${new Date(task.dueDate).toLocaleDateString()}</p>
                        <p class="task-priority" data-priority="${task.priority}">Priority: ${task.priority}</p>
                        <p class="task-status" data-status="${task.status}">Status: ${task.status}</p>
                        <p class="task-pinned" style="display: none;">Pinned: ${task.isPinned ? 'Yes' : 'No'}</p><br>
                        <button class="btn btn-warning" id="edit" onclick="editTask(${task.id}, '${task.title}', '${task.description}', '${new Date(task.dueDate).toISOString().split('T')[0]}', '${task.priority}', '${task.status}', ${task.isPinned})">Edit</button>
                        <button class="btn btn-danger" id="delete" onclick="deleteTask(${task.id})">Delete</button>
                    </div>
                </div>
            `).join('');
            
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }


    window.editTask = function(taskId, title, description, dueDate, priority, status, isPinned) {
        document.getElementById('taskId').value = taskId;
        document.getElementById('editTaskTitle').value = title;
        document.getElementById('editTaskDescription').value = description;
        document.getElementById('editTaskDueDate').value = dueDate;
        document.getElementById('editTaskPriority').value = priority;
        document.getElementById('editTaskStatus').value = status;
        document.getElementById('editTaskIsPinned').checked = isPinned;
    
        const editTaskModal = new bootstrap.Modal(document.getElementById('editTaskModal'));
        editTaskModal.show();
    };

    document.getElementById('Save').addEventListener('click', () => {
        const taskId = document.getElementById('taskId').value;
        const title = document.getElementById('editTaskTitle').value;
        const description = document.getElementById('editTaskDescription').value;
        const priority = document.getElementById('editTaskPriority').value;
        const status = document.getElementById('editTaskStatus').value;
        const dueDate = new Date(document.getElementById('editTaskDueDate').value).toISOString();
        const isPinned = document.getElementById('editTaskIsPinned').checked;

        const task = {
            title,
            description,
            priority,
            status,
            dueDate,
            isPinned
        };

        loadTask(taskId, task);
    });

    function loadTask(taskId, updatedTask) {
        const token = localStorage.getItem('userToken');
        
        fetch(`http://localhost:3000/api/tasks/update/${taskId}`, {
            method: 'PUT',
            headers: {
                'authorization':`Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTask),
        })
        .then(response => response.json())
        .then(() => {
            const editTaskModal = bootstrap.Modal.getInstance(document.getElementById('editTaskModal'));
            editTaskModal.hide();
            getTasks();

            let successModal = new bootstrap.Modal(document.getElementById('successModal'));
            successModal.show();
            setTimeout(() => {
                successModal.hide();
            }, 3000);
        })
        .catch(error => console.error('Error editing task:', error));
    }    

    window.deleteTask = function(taskId) {
        const confirmModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
        confirmModal.show();
        
        document.getElementById('confirmDeleteButton').onclick = function() {
            fetch(`http://localhost:3000/api/tasks/delete/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('userToken')}`,
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

document.addEventListener('DOMContentLoaded', function() {
    flatpickr("#calendar", {
        inline: true,
    });

    document.getElementById('todayButton').addEventListener('click', function() {
        const calendarModal = new bootstrap.Modal(document.getElementById('calendarModal'));
        calendarModal.show();
    });
});


document.getElementById('search-button').addEventListener('click', async function() {
    const title = document.getElementById('searchInput').value;

    if (!title) {
        showModal('error', 'Please enter a task title to search!');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/tasks/search?title=${encodeURIComponent(title)}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`, 
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const searchResults = await response.json();
            displaySearchResults(searchResults);
        } else {
            showModal('error', 'Failed to search tasks.');
        }
    } catch (error) {
        console.error("Error occurred during search:", error);
        showModal('error', 'An error occurred while searching for tasks.');
    }
});

function showModal(type, message) {
    const modalId = type === 'error' ? 'errorModal' : 'successModal';
    const modalMessageId = type === 'error' ? 'errorMessage' : 'successMessage';
    
    document.getElementById(modalMessageId).innerText = message;
    new bootstrap.Modal(document.getElementById(modalId)).show();
}

function displaySearchResults(searchResults) {
    const taskListElement = document.getElementById('task-list');
    taskListElement.innerHTML = ''; 

    if (searchResults.exactMatch) {
        const exactMatchTask = searchResults.exactMatch;
        taskListElement.innerHTML += `<h4>Exact Match <button onclick="location.reload()" id="back">Back</button></h4>  
`;
        taskListElement.innerHTML += createTaskItem(exactMatchTask);
    }

    if (searchResults.relatedTasks && searchResults.relatedTasks.length > 0) {
        taskListElement.innerHTML += `<h4>Related Tasks  <button onclick="location.reload()" id="back">Back</button></h4> 
`;
        searchResults.relatedTasks.forEach(task => {
            taskListElement.innerHTML += createTaskItem(task);
        });
    } else {
        taskListElement.innerHTML += `<p>No related tasks found.</p>`;
    }
}

function createTaskItem(task) {
    return `
            <div class="task-item">
                <div class="task-body">
                    <h3 class="task-title">Title: <span>${task.title}</span></h3>
                    <p class="task-description">Description: ${task.description}</p>
                    <p class="task-dueDate">Due Date: ${new Date(task.dueDate).toLocaleDateString()}</p>
                    <p class="task-priority" data-priority="${task.priority}">Priority: ${task.priority}</p>
                    <p class="task-status" data-status="${task.status}">Status: ${task.status}</p>
                    <p class="task-pinned">Pinned: ${task.isPinned ? 'Yes' : 'No'}</p><br>
                    <button class="btn btn-warning" id="edit" onclick="editTask(${task.id}, '${task.title}', '${task.description}', '${new Date(task.dueDate).toISOString().split('T')[0]}', '${task.priority}', '${task.status}', ${task.isPinned})">Edit</button>
                    <button class="btn btn-danger" id="delete" onclick="deleteTask(${task.id})">Delete</button>
                </div>
            </div>
    `;
}