import React, { useEffect, useState } from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Modal, Button } from "react-bootstrap";
import TaskForm from "./TaskForm";
import { darkScrollbar } from "@mui/material";

const Table = (props) => {
    const [tasks, setTasks] = useState([]); // array state of the tasks in the table
    const [showUpdateModal, setShowUpdateModal] = useState(false); // show update modal state
    const [taskInfo, setTaskInfo] = useState(""); // task info for the selected task when updating
    const [selectedTasksId, setSelectedTasksId] = useState([]); // id of the selected row/rows
    const { onSelectHandler, sendTasks, sendSelectedTasks } = props; // onSelectHandler state will effect the delete buttom on the main page
    sendTasks({ tasks, setTasks }); //sending the tasks to the parent
    sendSelectedTasks({ selectedTasksId, setSelectedTasksId }); //sending the selected tasks to the parent
    const columns = [
        // the cols which will we show from the tasks state
        {
            dataField: "_id",
            text: "objectId",
            hidden: true,
        },
        {
            dataField: "id",
            text: "Task Id",
            sort: true,
        },
        {
            dataField: "projectName",
            text: "Project Name",
        },
        {
            dataField: "taskName",
            text: "Task Name",
        },
        {
            dataField: "status",
            text: "Status",
        },
    ];

    const selectRow = {
        // enabling the ability to select row
        mode: "checkbox",
        onSelect: (row, isSelect, rowIndex, e) => {
            if (isSelect) {
                selectedTasksId.push(row._id); //updating selected rows
                onSelectHandler(true);
            } else {
                selectedTasksId.splice(
                    selectedTasksId.findIndex((val) => row._id == val),
                    1
                );
                if (selectedTasksId.length == 0) onSelectHandler(false);
            }
        },
        onSelectAll: (isSelect, rows, e) => {
            if (isSelect) {
                for (const obj of rows) selectedTasksId.push(obj._id);
                onSelectHandler(true);
            } else {
                setSelectedTasksId([]);
                onSelectHandler(false);
            }
        },
    };
    const rowEvents = {
        onClick: (e, row) => {
            setTaskInfo(row);
            setShowUpdateModal(true);
        },
    };

    useEffect(() => {
        //when rendering fetch the data from the server
        axios
            .get("http://localhost:8000/api/tasks")
            .then((res) => {
                res.data.forEach((obj, ind) => (obj.id = ind + 1));
                setTasks(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const updateTaskHandler = (data) => {
        //when updating, update the the data in the server then change the updated info in the DOM
        axios
            .put("http://localhost:8000/api/tasks/" + data._id, data)
            .then((task) => {
                setTasks(
                    tasks.map((obj) =>
                        obj._id == task.data._id
                            ? { ...task.data, id: obj.id }
                            : obj
                    )
                );
            });
    };
    return (
        <>
            <BootstrapTable
                classes="table-dark"
                keyField="id"
                data={tasks}
                columns={columns}
                striped
                hover
                condensed
                pagination={paginationFactory()}
                selectRow={selectRow}
                rowEvents={rowEvents}
            />
            {showUpdateModal && (
                <TaskForm
                    show={showUpdateModal}
                    setShow={setShowUpdateModal}
                    CRUD_Type="Update"
                    taskInfo={taskInfo}
                    submitTaskHandler={updateTaskHandler}
                />
            )}
        </>
    );
};

export default Table;
