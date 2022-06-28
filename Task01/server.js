const express = require("express");
const cors = require("cors");

const app = express();

require("./server/config/mongoose.config");
app.use(cors());
app.use(express.json(), express.urlencoded({ extended: true }));

require("./server/routes/task.route")(app);

app.listen(8000, () => {
    console.log("Server is running..");
});
