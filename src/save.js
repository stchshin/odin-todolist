import { Project } from "./project.js";
import { Todo } from "./todo.js";

export function save(projectData) {
    localStorage.setItem("data", JSON.stringify(projectData));
}

export function addMethods(projectData) {
    projectData = projectData.map(project => new Project(project._title, project._id, project._todos));
    for (let project of projectData) {
        project.todos = project.todos.map(todo => new Todo(todo._title, todo._description, todo._dueDate,
            todo._priority, todo._id, todo._status));
    };
    return projectData;
}

export function load() {
    return JSON.parse(localStorage.getItem("data"));
}