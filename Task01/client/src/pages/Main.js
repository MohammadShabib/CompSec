import { useState } from "react";
import Table from "../components/atoms/AtomTable";
import Button from "react-bootstrap/Button";
import TaskFormModal from "../components/organism/TaskFormModal";
import "./Main.css";
import TaskTableCols from "../components/constant/taskTableCols";
import Task from "../services/Task.service";

const Main = (props) => {
    const [showTask, setShowTask] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const [taskInfo, setTaskInfo] = useState("");
    const [selectedTasksId, setSelectedTasksId] = useState([]);
    const [tasks, setTasks] = useState([]);

    const handleCloseCreateModal = () => setShowCreateModal(!showCreateModal);
    const handleCloseUpdateModal = () => setShowUpdateModal(!showUpdateModal);
    const ShowtaskButtonHandler = async (e) => {
        if (showTask) {
            setShowTask(false);
            e.target.innerText = "Show Task";
        } else {
            const res = await Task.getAllTasks();
            setTasks(res);
            setShowTask(true);
            e.target.innerText = "Hide Task";
        }
    };

    const refreshTable = async () => {
        const res = await Task.getAllTasks();
        setTasks(res);
    };
    const deleteTaskHandler = async (e) => {
        for (const id of selectedTasksId) {
            const res = await Task.delete(id);
            refreshTable();
        }
        setShowDeleteButton(false);
    };

    const createTaskHandler = async (e, task) => {
        e.preventDefault();
        const createdTask = await Task.create(task);
        refreshTable();
        handleCloseCreateModal();
    };

    const updateTaskHandler = async (e, data) => {
        e.preventDefault();
        const task = await Task.update(data);
        setTasks(
            tasks.map((obj) =>
                obj._id == task.data._id ? { ...task.data, id: obj.id } : obj
            )
        );
        handleCloseUpdateModal();
    };
    const tableRowEvents = {
        onClick: (e, row) => {
            setTaskInfo(row);
            setShowUpdateModal(true);
        },
    };
    const tableSelectRow = {
        mode: "checkbox",
        onSelect: (row, isSelect, rowIndex, e) => {
            if (isSelect) {
                selectedTasksId.push(row._id); //updating selected rows
                setShowDeleteButton(true);
            } else {
                selectedTasksId.splice(
                    selectedTasksId.findIndex((val) => row._id == val),
                    1
                );
                if (selectedTasksId.length == 0) setShowDeleteButton(false);
            }
        },
        onSelectAll: (isSelect, rows, e) => {
            if (isSelect) {
                for (const obj of rows) selectedTasksId.push(obj._id);
                setShowDeleteButton(true);
            } else {
                setSelectedTasksId([]);
                setShowDeleteButton(false);
            }
        },
    };
    return (
        <div className="container" style={{ margin: "0px auto" }}>
            <div className="row">
                <Button className="col-2 m-3" onClick={ShowtaskButtonHandler}>
                    Show Tasks
                </Button>
                <Button
                    className="col-2 m-3"
                    onClick={(e) => {
                        setShowCreateModal(true);
                    }}
                >
                    Create Task
                </Button>

                {showDeleteButton && (
                    <Button
                        className="col-2 m-3"
                        variant="danger"
                        text=""
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
                            columns={TaskTableCols}
                            data={tasks}
                            selectRow={tableSelectRow}
                            rowEvents={tableRowEvents}
                        />
                    )}
                </div>
            </div>
            {showCreateModal && (
                <TaskFormModal
                    CRUD_Type="Create"
                    onSumbit={createTaskHandler}
                    handleClose={handleCloseCreateModal}
                />
            )}
            {showUpdateModal && (
                <TaskFormModal
                    CRUD_Type="Update"
                    taskInfo={taskInfo}
                    onSumbit={updateTaskHandler}
                    handleClose={handleCloseUpdateModal}
                />
            )}
        </div>
    );
};

export default Main;
