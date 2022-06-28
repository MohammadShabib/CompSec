const TaskController = require("../controllers/task.controller");
//defing all the routes
module.exports = function (app) {
    app.get("/api/tasks", TaskController.getAllTasks);
    app.post("/api/tasks/create", TaskController.createTask);
    app.put("/api/tasks/:id", TaskController.updateTask);
    app.delete("/api/tasks/:id", TaskController.deleteTask);
};
