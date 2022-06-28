const mongoose = require("mongoose");

//connecting to the DB
mongoose
    .connect("mongodb://localhost/tasksProject")
    .then(() => console.log("Database connection has been established"))
    .catch((err) => console.log("there was an error", err));
