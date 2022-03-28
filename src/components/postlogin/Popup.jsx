import React from 'react'
import { useState } from 'react';

import { TASKERROR, DESCERROR } from "../../Constants";

function Popup(props) {
    const [tasks, setTasks] = useState("");
    const [description, setDescription] = useState("");
    const [taskError, setTaskError] = useState("");
    const [descError, setDescError] = useState("");
    let valid = true;
    function validateTask(task) {
        let error;
        if (!task) {
            valid = false;
            error = TASKERROR;
        }
        else if (task.trim().length === 0) {
            valid = false;
            error = TASKERROR;
        }
        return error;
    }

    function validateDesc(description) {
        let error;
        if (!description) {
            valid = false;
            error = DESCERROR;
        }
        else if (description.trim().length === 0) {
            valid = false;
            error = DESCERROR;
        }
        return error;
    }

    function addTask() {
        valid = true;
        setTaskError(validateTask(tasks));
        setDescError(validateDesc(description));
        let user = localStorage.getItem("loggeduser");
        let task = props.currentTask;
        let initial = JSON.parse(localStorage.getItem("addedDetails")) || [];
        if (valid) {
            let todo =
            {
                task: tasks.trim(),
                description: description.trim()
            }
            initial[user][task].push(todo);
            localStorage.setItem("addedDetails", JSON.stringify(initial));
            props.close();
        }
    }

    return (
        <div className="dialog-base">
            <div className="window">
                <div className="task">
                    <h1>ADD TASK</h1>
                    <div>
                        <label>Task</label>
                        <input type="text"
                            placeholder="Task"
                            onChange={(e) => setTasks(e.target.value)}>
                        </input>
                    </div>
                    <div className="error">
                        {taskError}
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea type="text"
                            placeholder="Description"
                            onChange={(e) => setDescription(e.target.value)}>
                        </textarea>
                    </div>
                    <div className="error">
                        {descError}
                    </div>
                    <div>
                        <button onClick={() => addTask()}>ADD</button>
                        <button onClick={() => props.close()}>CANCEL</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Popup;