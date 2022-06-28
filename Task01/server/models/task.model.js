const mongoose = require("mongoose");
// CREATING A COLLECTION IN THE DB
const TaskScheme = new mongoose.Schema(
    {
        projectName: {
            type: String,
        },
        taskName: {
            type: String,
        },
        status: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports.Task = mongoose.model("Task", TaskScheme);
