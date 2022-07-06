const taskTableCols = [
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

export default taskTableCols;
