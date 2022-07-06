import axios from "axios";

class Task {
    /**
     *  the function fetchs all the tasks from the backend DB
     * @returns {Array} - Array of all tasks, in case of an error it will return the error without throwing an error
     */
    static getAllTasks() {
        return axios
            .get("http://localhost:8000/api/tasks")
            .then((res) => {
                res.data.forEach((obj, ind) => (obj.id = ind + 1));
                return res.data;
            })
            .catch((err) => console.log(err));
    }
    /**
     * the function creates a new tasks in the backend DB
     * @param {Object} task - the task that will be created
     * @returns {Object} - Object of the newly created task, in case of an error it will return the error without throwing an error
     */
    static create(task) {
        return axios
            .post("http://localhost:8000/api/tasks/create", task)
            .then((task) => task.data)
            .catch((err) => console.log(err));
    }
    /**
     * the function update the task in the backend DB
     * @param {Object} task - the task that will be updated
     * @returns {Object} - object of the updated task, in case of an error it will return the error without throwing an error
     */
    static update(task) {
        return axios
            .put("http://localhost:8000/api/tasks/" + task._id, task)
            .then((task) => task)
            .catch((err) => console.log(err));
    }
    /**
     *  the function delets the task from the backend DB
     *
     * @param {string} - id of the object to delete
     * @returns {string} it will return the id of the deleted object, in case of an error it will return the error without throwing an error
     */
    static delete(id) {
        return axios
            .delete("http://localhost:8000/api/tasks/" + id)
            .then((res) => id)
            .catch((err) => console.log(err));
    }
}

export default Task;
