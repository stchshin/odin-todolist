export class Project {
    constructor(title, id, todos) {
        if (id) {
            this._id = id;
        } else {
            this._id = crypto.randomUUID();
        }
        if (todos) {
            this._todos = todos;
        } else {
            this._todos = [];
        }  
        this._title = title;
    }

    get id() {
        return this._id;
    }

    get title() {
        return this._title;
    }

    set title(title) {
        this._title = title;
    }

    get todos() {
        return this._todos;
    }

    set todos(todos) {
        this._todos = todos;
    }
    
    addTodo(todo) {
        this._todos.push(todo);
    }

    removeTodo(todo) {
        this._todos.splice(todo);
    }
}
