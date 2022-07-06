import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";

import AtomFormSelection from "../atoms/AtomFormSelection";
import taskStatus from "../constant/taskStatus";

import "./TaskFormModal.css";

const TaskForm = ({ CRUD_Type, taskInfo, onSumbit, handleClose }) => {
    const [projectName, setProjectName] = useState(taskInfo.projectName);
    const [taskName, setTaskName] = useState(taskInfo.taskName);
    const [status, setStatus] = useState(taskInfo.status);
    const disabledStatus = CRUD_Type == "Create" ? true : false;

    return (
        <Modal className="modal-dark-theme" show={true} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{CRUD_Type} Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form
                    id="taskForm"
                    onSubmit={(e) => {
                        onSumbit(e, {
                            _id: taskInfo._id,
                            projectName,
                            taskName,
                            status,
                        });
                    }}
                >
                    <Form.Group className="mb-3" controlId="id">
                        <Form.Label>ID#: </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter ID"
                            defaultValue={
                                CRUD_Type == "Create" ? "" : taskInfo.id
                            }
                            disabled
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Project Name:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Project Name"
                            defaultValue={projectName}
                            onBlur={(e) => setProjectName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Task Name:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Task Name"
                            defaultValue={taskName}
                            onBlur={(e) => setTaskName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{"Status:"}</Form.Label>
                        <AtomFormSelection
                            onBlur={(e) => setStatus(e.target.value)}
                            disabled={disabledStatus}
                            defaultValue={status}
                            options={taskStatus}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" type="submit" form="taskForm">
                    {CRUD_Type}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

TaskForm.defaultProps = {
    taskInfo: {
        _id: undefined,
        projectName: "",
        taskName: "",
        status: "In Progress",
    },
};

TaskForm.propTypes = {
    CRUD_Type: PropTypes.string,
    taskInfo: PropTypes.object,
    onSumbit: PropTypes.func,
    handleClose: PropTypes.func,
};
export default TaskForm;
