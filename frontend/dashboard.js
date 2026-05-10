const token = localStorage.getItem('token');
const role = localStorage.getItem('role');

if (!token) {
    window.location = 'index.html';
}

const API_URL = 'https://team-task-manager-4-qcu4.onrender.com';

async function createProject() {

    const title = document.getElementById('projectTitle').value;
    const description = document.getElementById('projectDescription').value;

    await fetch(`${API_URL}/api/projects`, {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json',
            authorization: token
        },

        body: JSON.stringify({
            title,
            description
        })
    });

    loadProjects();
}

async function loadProjects() {

    const response = await fetch(`${API_URL}/api/projects`, {

        headers: {
            authorization: token
        }
    });

    const projects = await response.json();

    document.getElementById('projects').innerHTML = projects
        .map(p => `<li>${p.title}</li>`)
        .join('');
}

async function createTask() {

    const title = document.getElementById('taskTitle').value;
    const dueDate = document.getElementById('dueDate').value;

    await fetch(`${API_URL}/api/tasks`, {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json',
            authorization: token
        },

        body: JSON.stringify({
            title,
            status: 'Pending',
            dueDate,
            assignedTo: 1,
            projectId: 1
        })
    });

    loadTasks();
}

async function updateTaskStatus(id, status) {

    await fetch(`${API_URL}/api/tasks/${id}/status`, {

        method: 'PATCH',

        headers: {
            'Content-Type': 'application/json',
            authorization: token
        },

        body: JSON.stringify({
            status
        })
    });

    loadTasks();
}

async function loadTasks() {

    const response = await fetch(`${API_URL}/api/tasks`, {

        headers: {
            authorization: token
        }
    });

    const tasks = await response.json();

    const isAdmin = role === 'Admin';

    document.getElementById('tasks').innerHTML = tasks
        .map(t => {

            if (isAdmin) {

                return `
                    <li>
                        ${t.title} -

                        <select onchange="updateTaskStatus(${t.id}, this.value)">

                            <option value="Pending"
                                ${t.status === 'Pending' ? 'selected' : ''}>
                                Pending
                            </option>

                            <option value="In Progress"
                                ${t.status === 'In Progress' ? 'selected' : ''}>
                                In Progress
                            </option>

                            <option value="Completed"
                                ${t.status === 'Completed' ? 'selected' : ''}>
                                Completed
                            </option>

                        </select>
                    </li>
                `;
            }

            return `<li>${t.title} - ${t.status}</li>`;
        })
        .join('');
}

// Initial Loading
loadProjects();
loadTasks();