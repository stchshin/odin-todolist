import { Todo } from "./todo.js";
import { save } from "./save.js";

export function blur(status) {
    if (status == true) {
        document.querySelector('#sidebar').setAttribute("style", "filter: blur(5px)");
        document.querySelector('#main').setAttribute("style", "filter: blur(5px)");
    } else {
        document.querySelector('#sidebar').setAttribute("style", "filter: 0");
        document.querySelector('#main').setAttribute("style", "filter: 0");
    }
}

function showTodo(todo, project, projectData) {
    document.querySelector('#addingProject').style.display = 'None';
    document.querySelector('#addingTodo').style.display = 'None';
    blur(true);

    // Edit todo
    document.querySelector('#editTodo').style.display = "block";
    document.querySelector('#editForm').querySelector('#editTitle').value = todo.title;
    document.querySelector('#editForm').querySelector('#editDescription').value = todo.description;
    document.querySelector('#editForm').querySelector('#editDueDate').value = todo.dueDate;
    document.querySelector('#editForm').querySelector('#editPriority').value = todo.priority;
    // Cancel editing
    document.querySelector('#closeEditTodo').addEventListener('click', function() {
        document.querySelector('#editTodo').style.display = "none";
        blur(false);
    })

    document.querySelector('#editForm').addEventListener('submit', function(event) {
        event.preventDefault();
        save(projectData);
        todo.title = document.querySelector('#editForm').querySelector('#editTitle').value;
        todo.description = document.querySelector('#editForm').querySelector('#editDescription').value;
        todo.dueDate = document.querySelector('#editForm').querySelector('#editDueDate').value ;
        todo.priority = document.querySelector('#editForm').querySelector('#editPriority').value;

        document.querySelector('#editTodo').style.display = "none";
        blur(false);
        showProject(project, projectData);
    })
}

function todoLoad(project, projectData) {
    // Load todos of a project
    const content = document.querySelector('#content');
    content.textContent = '';

    // Load each todo on page, recently added first
    for (let i = project.todos.length - 1; i >= 0; i--) {
        let todo = project.todos[i]
        const todoContainer = document.createElement('div');
        todoContainer.classList.add("todo");

        const frontInfo = document.createElement("div");
        frontInfo.classList.add("frontInfo");
        const priority = document.createElement("div");
        priority.classList.add("priority");
        priority.textContent = todo.priority;
        if (todo.priority >= 1 && todo.priority <= 3) {
            priority.style.backgroundColor = '#c7f0d2';
        } else if (todo.priority >= 4 && todo.priority <= 6) {
            priority.style.backgroundColor = '#f0efc7';
        } else {
            priority.style.backgroundColor = '#f0cdc7';
        }
        
        const title = document.createElement("div");
        title.textContent = todo.title;
        title.style.fontWeight = 'bold';
        const description = document.createElement("div");
        description.textContent = todo.description;
        frontInfo.append(priority, title, description);

        const backInfo = document.createElement("div");
        backInfo.classList.add("backInfo");
        const dueDate = document.createElement("div");
        dueDate.textContent = `By ${todo.dueDate}`;
        const status = document.createElement("input");
        status.classList.add("status");
        status.setAttribute("type", "checkbox");
        if (todo.status == 'complete') {
            status.checked = true;
            frontInfo.setAttribute('style', 'text-decoration: line-through');
            dueDate.setAttribute('style', 'text-decoration: line-through');
        }
        const deleteIcon = document.createElement("div");
        deleteIcon.textContent = '✕';
        backInfo.append(dueDate, status, deleteIcon);

        todoContainer.append(frontInfo, backInfo);
        content.append(todoContainer);

        // Load individual todo's information
        frontInfo.addEventListener('click', function() {
            showTodo(todo, project, projectData);
        })

        // Complete or incomplete todo
        status.addEventListener('click', function() {
            if (status.checked) {
                todo.complete();
                save(projectData);
                frontInfo.setAttribute('style', 'text-decoration: line-through');
                dueDate.setAttribute('style', 'text-decoration: line-through');
            } else {
                todo.incomplete();
                save(projectData);
                frontInfo.setAttribute('style', 'text-decoration: none');
                dueDate.setAttribute('style', 'text-decoration: none');
            }
        })

        // Delete a todo
        deleteIcon.addEventListener('click', function() {
            project.removeTodo(todo);
            save(projectData);
            todoLoad(project, projectData);
        })
    }
}

export function todoAdd(project, projectData) {
    // Add todo
    let newTodo = new Todo(document.querySelector('#title').value, document.querySelector('#description').value,
        document.querySelector('#dueDate').value, document.querySelector('#priority').value);
    project.addTodo(newTodo);
    todoLoad(project, projectData);
    document.querySelector('#addingTodo').style.display = 'None';
}

export function showProject(project, projectData) {
    const projectContainer = document.querySelector('#project');
    projectContainer.textContent = '';

    // Set project title & add todo button + project delete button on main content
    const title = document.createElement("p");
    title.textContent = project.title;
    title.setAttribute("style", "font-size: 32px");

    const buttons = document.createElement("div");
    buttons.classList.add("buttons");
    const addTodo = document.createElement("button");
    addTodo.textContent = 'Add Todo';
    addTodo.classList.add("addTodo");
    addTodo.setAttribute("data-project-id", project.id)

    const deleteProject = document.createElement("button");
    deleteProject.textContent = 'Delete Project';
    deleteProject.classList.add("deleteProject");
    deleteProject.setAttribute("data-project-id", project.id);

    buttons.append(addTodo);
    const projectIndex = projectData.findIndex(projectFromData => projectFromData.id == project.id);
    if (projectIndex != 0) {
        buttons.append(deleteProject);
    }
    projectContainer.append(title, buttons);
    todoLoad(project, projectData);

    // Try adding todo to a project via button
    document.querySelector('.addTodo').addEventListener('click', function() {
        document.querySelector('#addingProject').style.display = 'None';
        document.querySelector('#editTodo').style.display = 'None';
        blur(true);

        const window = document.querySelector('#addingTodo');
        window.style.display = 'block';
        window.querySelectorAll('input').forEach(input => input.value = '');

        // Cancel adding
        document.querySelector('#closeAddTodo').addEventListener('click', function() {
            document.querySelector('#addingTodo').style.display = "none";
            blur(false);
        })
    })

    // Delete project
    if (projectIndex != 0) {
        document.querySelector('.deleteProject').addEventListener('click', function() {
            const deleteProjectIndex = projectData.findIndex(project => project.id == document.querySelector('.deleteProject').dataset.projectId);
            projectData.splice(deleteProjectIndex, 1);
            save(projectData);
            location.reload();
        })
    }
}

export function projectAdd(project, projectData, flag) {
    // Load list & show the most recently added project
    projectList(projectData);
    if (flag) {
        showProject(project, projectData);
    } else {
        location.reload();
    }
}

export function projectList(projectData) {
    // Create list of projects on sidebar
    document.querySelector('#projects').textContent = '';
    for (let project of projectData) {
        let li = document.createElement('li');
        li.textContent = project.title;
        document.querySelector('#projects').append(li)
        li.addEventListener('click', function() {
            showProject(project, projectData);
        })
    }
}