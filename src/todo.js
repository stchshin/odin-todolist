export class Todo {
    constructor(title, description, dueDate, priority, id, status) {
        if (id) {
            this._id = id;
        } else {
            this._id = crypto.randomUUID();
        }
        if (status) {
            this._status = status;
        } else {
            this._status = 'incomplete';
        }

        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
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

    get description() {
        return this._description;
    }

    set description(description) {
        this._description = description;
    }

    get dueDate() {
        return this._dueDate;
    }

    set dueDate(dueDate) {
        this._dueDate = dueDate;
    }

    get priority() {
        return this._priority;
    }

    set priority(priority) {
        this._priority = priority;
    }

    get status() {
        return this._status;
    }

    complete() {
        this._status = 'complete';
    }

    incomplete() {
        this._status = 'incomplete';
    }

}