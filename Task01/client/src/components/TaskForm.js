import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./TaskForm.css";

//task form, which used for both updating and creating
const TaskForm = (props) => {
    const { show, setShow, submitTaskHandler, CRUD_Type, taskInfo } = props;
    const handleClose = () => setShow(false);

    const [projectName, setProjectName] = useState(
        CRUD_Type == "Create" ? "" : taskInfo.projectName
    );
    const [taskName, setTaskName] = useState(
        CRUD_Type == "Create" ? "" : taskInfo.taskName
    );
    const [status, setStatus] = useState(
        CRUD_Type == "Create" ? "In Progress" : taskInfo.status
    );
    const disabledStatus = CRUD_Type == "Create" ? true : false;

    return (
        <Modal className="modal-dark-theme" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{CRUD_Type} Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form
                    id="taskForm"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleClose();
                        const _id = taskInfo ? taskInfo._id : undefined;
                        submitTaskHandler({
                            _id,
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
                        <Form.Label>Status:</Form.Label>
                        <Form.Select
                            onBlur={(e) => setStatus(e.target.value)}
                            disabled={disabledStatus}
                            defaultValue={status}
                        >
                            <option value="In Progress">In Progress</option>
                            <option value={"Not Started"}>Not Started</option>
                            <option value="Overdue">Overdue</option>
                        </Form.Select>
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

export default TaskForm;
