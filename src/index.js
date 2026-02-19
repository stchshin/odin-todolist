import "./styles.css";
import { Project } from "./project.js";
import { blur, showProject, projectAdd, todoAdd, projectList } from "./domcontrol.js";
import { save, load, addMethods } from "./save.js";

document.addEventListener('DOMContentLoaded', function() {
    // Check if user's data already exists
    let projectData;
    if (load()) {
        projectData = addMethods(load());
        showProject(projectData[projectData.length - 1], projectData);
    } else {
        projectData = [];
        const defaultProject = new Project('Default');
        projectData.push(defaultProject);
        projectAdd(defaultProject, projectData, "start");
    }
    projectList(projectData);
    
    // Try to add new project via button
    document.querySelector('#addProject').addEventListener('click', function() {
        document.querySelector('#addingProject').style.display = "block";
        document.querySelector('#addingTodo').style.display = "none";
        document.querySelector('#editTodo').style.display = "none";
        blur(true);
        document.querySelector('#projectTitle').value = '';
    })
    // Cancel adding
    document.querySelector('#closeAddProject').addEventListener('click', function() {
        document.querySelector('#addingProject').style.display = "none";
        blur(false);
    })
    // Add to DOM & projectData
    document.querySelector('#projectForm').addEventListener('submit', function(event) {
        event.preventDefault();
        blur(false);
        let newProject = new Project(document.querySelector('#projectTitle').value);
        projectAdd(newProject, projectData);
        projectData.push(newProject);
        save(projectData);
        document.querySelector('#addingProject').style.display = "none";
    })

    // Add new todo to project
    document.querySelector('#todoForm').addEventListener('submit', function(event) {
        event.preventDefault();
        blur(false);
        let myproject;
        for (let project of projectData) {
            if (document.querySelector('.addTodo').dataset.projectId == project.id) {
                myproject = project;
                break;
            }
        }
        todoAdd(myproject, projectData);
        save(projectData);
    })
})
