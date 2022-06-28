import { useState } from "react";
import Table from "../components/Table";
import Button from "react-bootstrap/Button";
import TaskForm from "../components/TaskForm";
import "./Main.css";
import axios from "axios";

//Main view, this view will represent the home page of the website
const Main = (props) => {
    const [showTask, setShowTask] = useState(false); // show table state
    const [showCreate, setShowCreate] = useState(false); // show create modal state
    const [showDelete, setShowDelete] = useState(false); // show delete Button state

    const taskButtonHandler = (e) => {
        if (showTask) {
            setShowTask(false);
            e.target.innerText = "Show Task";
        } else {
            setShowTask(true);
            e.target.innerText = "Hide Task";
        }
    };
    const onSelectHandler = (isSelect) => {
        // sending delete button state to the child table
        setShowDelete(isSelect);
    };

    let tasks, setTasks;
    const getTasks = (data) => {
        // sending the tasks in the table from child table to the parent
        ({ tasks, setTasks } = data);
    };
    let selectedTasksId, setSelectedTasksId;
    const getSelectedTasks = (data) => {
        // sending the selected tasks in the table from child table to the parent
        ({ selectedTasksId, setSelectedTasksId } = data);
    };

    const changeDom = (task, CRUD_Type) => {
        //updating or deleting the DOM without need to refresh
        if (CRUD_Type == "Create") {
            setTasks([...tasks, { ...task, id: tasks.length + 1 }]);
        } else if (CRUD_Type == "Delete") {
            setTasks(tasks.filter((obj) => (task == obj._id ? false : true)));
        }
    };
    const createTaskHandler = (data) => {
        // SERVER API for creating a new task
        axios
            .post("http://localhost:8000/api/tasks/create", data)
            .then((task) => changeDom(task.data, "Create"))
            .catch((err) => console.log(err));
    };
    const deleteTaskHandler = (e) => {
        // SERVER API for deleteing the selected task/s
        for (const id of selectedTasksId) {
            axios
                .delete("http://localhost:8000/api/tasks/" + id)
                .then((res) => changeDom(id, "Delete"))
                .catch((err) => console.log(err));
        }
    };
    return (
        <div className="container" style={{ margin: "0px auto" }}>
            <div className="row">
                <Button
                    className="col-2 m-3"
                    variant="primary"
                    onClick={taskButtonHandler}
                >
                    Show Tasks
                </Button>
                <Button
                    className="col-2 m-3"
                    variant="primary"
                    onClick={(e) => {
                        setShowCreate(true);
                    }}
                >
                    Create Task
                </Button>
                {showDelete && (
                    <Button
                        className="col-2 m-3"
                        variant="danger"
                        onClick={(e) => {
                            deleteTaskHandler();
                        }}
                    >
                        Delete Task
                    </Button>
                )}
            </div>
            <div className="row">
                <div className="col-8">
                    {showTask && (
                        <Table
                            onSelectHandler={onSelectHandler}
                            sendTasks={getTasks}
                            sendSelectedTasks={getSelectedTasks}
                        />
                    )}
                </div>
            </div>
            {showCreate && (
                <TaskForm
                    show={showCreate}
                    setShow={setShowCreate}
                    CRUD_Type="Create"
                    submitTaskHandler={createTaskHandler}
                />
            )}
        </div>
    );
};

export default Main;
