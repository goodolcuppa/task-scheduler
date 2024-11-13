import React from "react";

function Task({task, onDelete}) {
    const formattedStartDate = new Date(task.startTime).toString();
    const formattedEndDate = new Date(task.endTime).toString();

    return (
        <div className="task-container">
            <p className="task-title">{task.title}</p>
            <p className="task-start">{formattedStartDate}</p>
            <p className="task-end">{formattedEndDate}</p>
            <button className="delete-button" onClick={() => onDelete(task.id)}>
                Delete
            </button>
        </div>
    );
}

export default Task
