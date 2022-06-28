const { Task } = require("../models/task.model");
//implementation of the controllers
module.exports.getAllTasks = (req, res) => {
    Task.find({})
        .then((tasks) => res.json(tasks))
        .catch((err) => res.json(err));
};

module.exports.createTask = (req, res) => {
    const { projectName, taskName, status } = req.body;

    Task.create({ projectName, taskName, status })
        .then((tasks) => res.json(tasks))
        .catch((err) => res.json(err));
};

module.exports.updateTask = (req, res) => {
    const { projectName, taskName, status } = req.body;
    Task.findOneAndUpdate(
        { _id: req.params.id },
        { projectName, taskName, status },
        {
            new: true,
        }
    )
        .then((updatedTask) => res.json(updatedTask))
        .catch((err) => res.json(err));
};

module.exports.deleteTask = (request, response) => {
    Task.deleteOne({ _id: request.params.id })
        .then((deleteConfirmation) => response.json(deleteConfirmation))
        .catch((err) => response.json(err));
};
